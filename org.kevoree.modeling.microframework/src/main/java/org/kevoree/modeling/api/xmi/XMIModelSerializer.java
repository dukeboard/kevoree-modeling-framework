package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.CallBackChain;
import org.kevoree.modeling.api.util.Helper;

/*
* Author : Gregory Nain
* Date : 02/09/13
*/

public class XMIModelSerializer {

    public static void save(KObject model, final ThrowableCallback<String> callback) {
        final SerializationContext context = new SerializationContext();
        context.model = model;
        context.finishCallback = callback;
        context.attributesVisitor = new ModelAttributeVisitor() {
            @Override
            public void visit(MetaAttribute metaAttribute, Object value) {
                if (value != null) {
                    if (context.ignoreGeneratedID && metaAttribute.metaName().equals("generated_KMF_ID")) {
                        return;
                    }
                    context.printer.append(" " + metaAttribute.metaName() + "=\"");
                    XMIModelSerializer.escapeXml(context.printer, value.toString());
                    context.printer.append("\"");
                }
            }
        };

        context.printer = new StringBuilder();
        //First Pass for building address table
        context.addressTable.put(model.uuid(), "/");


        KTask addressCreationTask = context.model.taskVisit(new ModelVisitor() {
            @Override
            public VisitResult visit(KObject elem) {
                String parentXmiAddress = context.addressTable.get(elem.parentUuid());
                String key = parentXmiAddress + "/@" + elem.referenceInParent().metaName();
                Integer i = context.elementsCount.get(key);
                if (i == null) {
                    i = 0;
                    context.elementsCount.put(key, i);
                }
                context.addressTable.put(elem.uuid(), parentXmiAddress + "/@" + elem.referenceInParent().metaName() + "." + i);
                context.elementsCount.put(parentXmiAddress + "/@" + elem.referenceInParent().metaName(), i + 1);
                String pack = elem.metaClass().metaName().substring(0, elem.metaClass().metaName().lastIndexOf('.'));
                if (!context.packageList.contains(pack)) {
                    context.packageList.add(pack);
                }
                return VisitResult.CONTINUE;
            }
        }, VisitRequest.CONTAINED);

        KTask serializationTask = context.model.universe().model().task();
        serializationTask.wait(addressCreationTask);
        serializationTask.setJob(new KJob() {
            @Override
            public void run(KCurrentTask currentTask) {
                context.printer.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
                context.printer.append("<" + XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_"));
                context.printer.append(" xmlns:xsi=\"http://wwww.w3.org/2001/XMLSchema-instance\"");
                context.printer.append(" xmi:version=\"2.0\"");
                context.printer.append(" xmlns:xmi=\"http://www.omg.org/XMI\"");

                int index = 0;
                while (index < context.packageList.size()) {
                    context.printer.append(" xmlns:" + context.packageList.get(index).replace(".", "_") + "=\"http://" + context.packageList.get(index) + "\"");
                    index++;
                }
                context.model.visitAttributes(context.attributesVisitor);

                KTask nonContainedRefsTasks = context.model.universe().model().task();
                for (int i = 0; i < context.model.metaClass().metaReferences().length; i++) {
                    if (!context.model.metaClass().metaReferences()[i].contained()) {
                        nonContainedRefsTasks.wait(nonContainedReferenceTaskMaker(context.model.metaClass().metaReferences()[i], context, context.model));
                    }
                }
                nonContainedRefsTasks.setJob(new KJob() {
                    @Override
                    public void run(KCurrentTask currentTask) {
                        context.printer.append(">\n");

                        KTask containedRefsTasks = context.model.universe().model().task();
                        for (int i = 0; i < context.model.metaClass().metaReferences().length; i++) {
                            if (context.model.metaClass().metaReferences()[i].contained()) {
                                containedRefsTasks.wait(containedReferenceTaskMaker(context.model.metaClass().metaReferences()[i], context, context.model));
                            }
                        }
                        containedRefsTasks.setJob(new KJob() {
                            @Override
                            public void run(KCurrentTask currentTask) {
                                context.printer.append("</" + XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_") + ">\n");
                                context.finishCallback.on(context.printer.toString(), null);
                            }
                        });
                        containedRefsTasks.ready();
                    }
                });
                nonContainedRefsTasks.ready();
            }
        });
        serializationTask.ready();
    }


    public static void escapeXml(StringBuilder ostream, String chain) {
        if (chain == null) {
            return;
        }
        int i = 0;
        int max = chain.length();
        while (i < max) {
            char c = chain.charAt(i);
            if (c == '"') {
                ostream.append("&quot;");
            } else if (c == '&') {
                ostream.append("&amp;");
            } else if (c == '\'') {
                ostream.append("&apos;");
            } else if (c == '<') {
                ostream.append("&lt;");
            } else if (c == '>') {
                ostream.append("&gt;");
            } else {
                ostream.append(c);
            }
            i = i + 1;
        }
    }

    public static String formatMetaClassName(String metaClassName) {
        int lastPoint = metaClassName.lastIndexOf('.');
        String pack = metaClassName.substring(0, lastPoint);
        String cls = metaClassName.substring(lastPoint + 1);
        return pack + ":" + cls;
    }

    private static KTask nonContainedReferenceTaskMaker(final MetaReference ref, SerializationContext p_context, KObject p_currentElement) {
        KTask allTask = p_currentElement.taskAll(ref);

        KTask thisTask = p_context.model.universe().model().task();
        thisTask.wait(allTask);

        thisTask.setJob(new KJob() {
            @Override
            public void run(KCurrentTask currentTask) {
                try {
                    KObject[] objects = ((KObject[]) currentTask.results().get(allTask));
                    for (int i = 0; i < objects.length; i++) {
                        String adjustedAddress = p_context.addressTable.get(objects[i].uuid());
                        p_context.printer.append(" " + ref.metaName() + "=\"" + adjustedAddress + "\"");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        thisTask.ready();
        return thisTask;
    }

    private static KTask containedReferenceTaskMaker(final MetaReference ref, SerializationContext context, KObject currentElement) {
        KTask allTask = currentElement.taskAll(ref);

        KTask thisTask = context.model.universe().model().task();
        thisTask.wait(allTask);
        thisTask.setJob(new KJob() {
            @Override
            public void run(KCurrentTask currentTask) {
                try {
                    if (currentTask.results().get(allTask) != null) {
                        KObject[] objs =  ((KObject[]) currentTask.results().get(allTask));
                        for (int i = 0; i < objs.length; i++) {
                            final KObject elem = objs[i];
                            context.printer.append("<");
                            context.printer.append(ref.metaName());
                            context.printer.append(" xsi:type=\"" + XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
                            elem.visitAttributes(context.attributesVisitor);

                            KTask nonContainedRefsTasks = context.model.universe().model().task();
                            for (int j = 0; j < elem.metaClass().metaReferences().length; j++) {
                                if (!elem.metaClass().metaReferences()[i].contained()) {
                                    nonContainedRefsTasks.wait(nonContainedReferenceTaskMaker(elem.metaClass().metaReferences()[i], context, elem));
                                }
                            }
                            nonContainedRefsTasks.setJob(new KJob() {
                                @Override
                                public void run(KCurrentTask currentTask) {
                                    context.printer.append(">\n");


                                    KTask containedRefsTasks = context.model.universe().model().task();
                                    for (int i = 0; i < elem.metaClass().metaReferences().length; i++) {
                                        if (elem.metaClass().metaReferences()[i].contained()) {
                                            containedRefsTasks.wait(containedReferenceTaskMaker(elem.metaClass().metaReferences()[i], context, elem));
                                        }
                                    }
                                    containedRefsTasks.setJob(new KJob() {
                                        @Override
                                        public void run(KCurrentTask currentTask) {
                                            context.printer.append("</");
                                            context.printer.append(ref.metaName());
                                            context.printer.append('>');
                                            context.printer.append("\n");
                                        }
                                    });
                                    containedRefsTasks.ready();
                                }
                            });
                            nonContainedRefsTasks.ready();
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        thisTask.ready();
        return thisTask;
    }
}
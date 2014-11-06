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
        model.treeVisit(new ModelVisitor() {
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
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    context.finishCallback.on(null, throwable);
                } else {
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
                    Helper.forall(context.model.metaReferences(), new CallBackChain<MetaReference>(){
                        @Override
                        public void on(MetaReference metaReference, Callback<Throwable> next) {
                            nonContainedReferencesCallbackChain(metaReference, next, context, context.model);
                        }
                    }, new Callback<Throwable>() {
                        @Override
                        public void on(Throwable err) {
                            if (err == null) {
                                context.printer.append(">\n");
                                Helper.forall(context.model.metaReferences(), new CallBackChain<MetaReference>(){
                                    @Override
                                    public void on(MetaReference metaReference, Callback<Throwable> next) {
                                        containedReferencesCallbackChain(metaReference, next, context, context.model);
                                    }
                                }, new Callback<Throwable>() {
                                    @Override
                                    public void on(Throwable containedRefsEnd) {
                                        if (containedRefsEnd == null) {
                                            context.printer.append("</" + XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_") + ">\n");
                                            context.finishCallback.on(context.printer.toString(), null);
                                        } else {
                                            context.finishCallback.on(null, containedRefsEnd);
                                        }
                                    }
                                });
                            } else {
                                context.finishCallback.on(null, err);
                            }
                        }
                    });
                }
            }
        });
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

    private static void nonContainedReferencesCallbackChain(final MetaReference ref, final Callback<Throwable> next, SerializationContext p_context, KObject p_currentElement) {
        if (!ref.contained()) {
            final String[] value = new String[1];
            value[0] = "";
            p_currentElement.each(ref, new Callback() {
                @Override
                public void on(Object o) {
                    String adjustedAddress = p_context.addressTable.get(((KObject) o).uuid());
                    value[0] = (value[0].equals("") ? adjustedAddress : value[0] + " " + adjustedAddress);
                }
            }, new Callback<Throwable>() {
                @Override
                public void on(Throwable end) {
                    if (end == null) {
                        if (value[0] != null) {
                            p_context.printer.append(" " + ref.metaName() + "=\"" + value[0] + "\"");
                        }
                    }
                    next.on(end);
                }
            });
        } else {
            next.on(null);
        }
    }

    private static void containedReferencesCallbackChain(final MetaReference ref, final Callback<Throwable> nextReference, SerializationContext context, KObject currentElement) {
        if (ref.contained()) {
            currentElement.each(ref, new Callback() {
                @Override
                public void on(Object o) {
                    final KObject elem = (KObject) o;
                    context.printer.append("<");
                    context.printer.append(ref.metaName());
                    context.printer.append(" xsi:type=\"" + XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
                    elem.visitAttributes(context.attributesVisitor);
                    Helper.forall(elem.metaReferences(), new CallBackChain<MetaReference>(){
                        @Override
                        public void on(MetaReference metaReference, Callback<Throwable> next) {
                            nonContainedReferencesCallbackChain(metaReference, next, context, elem);
                        }
                    }, new Callback<Throwable>() {
                        @Override
                        public void on(Throwable err) {
                            if (err == null) {
                                context.printer.append(">\n");
                                Helper.forall(elem.metaReferences(), new CallBackChain<MetaReference>(){
                                    @Override
                                    public void on(MetaReference metaReference, Callback<Throwable> next) {
                                        containedReferencesCallbackChain(metaReference, next, context, elem);
                                    }
                                }, new Callback<Throwable>() {
                                    @Override
                                    public void on(Throwable containedRefsEnd) {
                                        if (containedRefsEnd == null) {
                                            context.printer.append("</");
                                            context.printer.append(ref.metaName());
                                            context.printer.append('>');
                                            context.printer.append("\n");
                                        }
                                    }
                                });
                            } else {
                                context.finishCallback.on(null,err);
                            }
                        }
                    });
                }
            }, new Callback<Throwable>() {
                @Override
                public void on(Throwable throwable) {
                    nextReference.on(null);
                }
            });
        } else {
            nextReference.on(null);
        }
    }

}
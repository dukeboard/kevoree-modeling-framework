package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.util.Helper;

public class PrettyPrinter implements Callback<Throwable> {
        private SerializationContext context;

        public PrettyPrinter(SerializationContext context) {
            this.context = context;
        }

        @Override
        public void on(Throwable throwable) {
            if (throwable != null) {
                context.finishCallback.on(null,throwable);
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
                Helper.forall(context.model.metaReferences(), new NonContainedReferencesCallbackChain(context, context.model), new Callback<Throwable>() {
                    @Override
                    public void on(Throwable err) {
                        if (err == null) {
                            context.printer.append(">\n");
                            Helper.forall(context.model.metaReferences(), new ContainedReferencesCallbackChain(context, context.model), new Callback<Throwable>() {
                                @Override
                                public void on(Throwable containedRefsEnd) {
                                    if (containedRefsEnd == null) {
                                        context.printer.append("</" + XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_") + ">\n");
                                        context.finishCallback.on(context.printer.toString(),null);
                                    } else {
                                        context.finishCallback.on(null,containedRefsEnd);
                                    }
                                }
                            });
                        } else {
                            context.finishCallback.on(null,err);
                        }
                    }
                });
            }
        }
    }
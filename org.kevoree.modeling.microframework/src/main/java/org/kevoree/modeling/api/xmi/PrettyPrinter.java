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
                context.finishCallback.on(throwable);
            } else {
                context.printStream.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
                context.printStream.print("<" + XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_"));
                context.printStream.print(" xmlns:xsi=\"http://wwww.w3.org/2001/XMLSchema-instance\"");
                context.printStream.print(" xmi:version=\"2.0\"");
                context.printStream.print(" xmlns:xmi=\"http://www.omg.org/XMI\"");

                int index = 0;
                while (index < context.packageList.size()) {
                    context.printStream.print(" xmlns:" + context.packageList.get(index).replace(".", "_") + "=\"http://" + context.packageList.get(index) + "\"");
                    index++;
                }
                context.model.visitAttributes(context.attributesVisitor);
                Helper.forall(context.model.metaReferences(), new NonContainedReferencesCallbackChain(context, context.model), new Callback<Throwable>() {
                    @Override
                    public void on(Throwable err) {
                        if (err == null) {
                            context.printStream.println('>');
                            Helper.forall(context.model.metaReferences(), new ContainedReferencesCallbackChain(context, context.model), new Callback<Throwable>() {
                                @Override
                                public void on(Throwable containedRefsEnd) {
                                    if (containedRefsEnd == null) {
                                        context.printStream.println("</" + XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_") + ">");
                                        context.printStream.flush();
                                        context.finishCallback.on(null);
                                    } else {
                                        context.finishCallback.on(containedRefsEnd);
                                    }
                                }
                            });
                        } else {
                            context.finishCallback.on(err);
                        }
                    }
                });
            }
        }
    }
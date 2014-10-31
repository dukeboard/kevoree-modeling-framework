package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.CallBackChain;
import org.kevoree.modeling.api.util.Helper;

class ContainedReferencesCallbackChain implements CallBackChain<MetaReference> {

    private SerializationContext context;
    private KObject currentElement;

    ContainedReferencesCallbackChain(SerializationContext context, KObject currentElement) {
        this.context = context;
        this.currentElement = currentElement;
    }

    @Override
    public void on(final MetaReference ref, final Callback<Throwable> nextReference) {
        if (ref.contained()) {
            currentElement.each(ref, new Callback() {
                @Override
                public void on(Object o) {
                    final KObject elem = (KObject) o;
                    context.printer.append("<");
                    context.printer.append(ref.metaName());
                    context.printer.append(" xsi:type=\"" + XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
                    elem.visitAttributes(context.attributesVisitor);
                    Helper.forall(elem.metaReferences(), new NonContainedReferencesCallbackChain(context, elem), new Callback<Throwable>() {
                        @Override
                        public void on(Throwable err) {
                            if (err == null) {
                                context.printer.append(">\n");
                                Helper.forall(elem.metaReferences(), new ContainedReferencesCallbackChain(context, elem), new Callback<Throwable>() {
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
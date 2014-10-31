package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.CallBackChain;

class NonContainedReferencesCallbackChain implements CallBackChain<MetaReference> {

    private SerializationContext context;
    private KObject currentElement;

    public NonContainedReferencesCallbackChain(SerializationContext context, KObject currentElement) {
        this.context = context;
        this.currentElement = currentElement;
    }

    @Override
    public void on(final MetaReference ref, final Callback<Throwable> next) {
        if (!ref.contained()) {
            final String[] value = {""};
            currentElement.each(ref, new Callback() {
                @Override
                public void on(Object o) {
                    String adjustedAddress = context.addressTable.get(((KObject) o).uuid());
                    value[0] = (value[0].equals("") ? adjustedAddress : value[0] + " " + adjustedAddress);
                }
            }, new Callback<Throwable>() {
                @Override
                public void on(Throwable end) {
                    if (end == null) {
                        if (value[0] != null) {
                            context.printer.append(" " + ref.metaName() + "=\"" + value[0] + "\"");
                        }
                    }
                    next.on(end);
                }
            });
        } else {
            next.on(null);
        }
    }
}
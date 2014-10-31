package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.CallBackChain;

class NonContainedReferencesCallbackChain implements CallBackChain<MetaReference> {

    private SerializationContext _context;
    private KObject _currentElement;

    public NonContainedReferencesCallbackChain(SerializationContext p_context, KObject p_currentElement) {
        this._context = p_context;
        this._currentElement = p_currentElement;
    }

    @Override
    public void on(final MetaReference ref, final Callback<Throwable> next) {
        if (!ref.contained()) {
            final String[] value = new String[1];
            value[0] = "";
            _currentElement.each(ref, new Callback() {
                @Override
                public void on(Object o) {
                    String adjustedAddress = _context.addressTable.get(((KObject) o).uuid());
                    value[0] = (value[0].equals("") ? adjustedAddress : value[0] + " " + adjustedAddress);
                }
            }, new Callback<Throwable>() {
                @Override
                public void on(Throwable end) {
                    if (end == null) {
                        if (value[0] != null) {
                            _context.printer.append(" " + ref.metaName() + "=\"" + value[0] + "\"");
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
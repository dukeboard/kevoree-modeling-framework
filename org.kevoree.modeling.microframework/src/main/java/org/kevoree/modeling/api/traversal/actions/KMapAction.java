package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.traversal.KTraversalAction;

/**
 * Created by duke on 19/12/14.
 */
public class KMapAction implements KTraversalAction {

    private Callback<Object[]> _finalCallback;

    private MetaAttribute _attribute;

    public KMapAction(MetaAttribute p_attribute, Callback<Object[]> p_callback) {
        this._finalCallback = p_callback;
        this._attribute = p_attribute;
    }

    @Override
    public void chain(KTraversalAction next) {
        //terminal leaf action
    }

    @Override
    public void execute(KObject[] inputs) {
        Object[] selected = new Object[inputs.length];
        int nbElem = 0;
        for (int i = 0; i < inputs.length; i++) {
            if (inputs[i] != null) {
                Object resolved = inputs[i].get(_attribute);
                if (resolved != null) {
                    selected[i] = resolved;
                    nbElem++;
                }
            }
        }
        //trim the array
        Object[] trimmed = new Object[nbElem];
        int nbInserted = 0;
        for (int i = 0; i < inputs.length; i++) {
            if (selected[i] != null) {
                trimmed[nbInserted] = selected[i];
                nbInserted++;
            }
        }
        _finalCallback.on(trimmed);
    }
}

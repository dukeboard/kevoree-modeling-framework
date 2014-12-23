package org.kevoree.modeling.api.promise.actions;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.promise.KTraversalAction;

import java.util.ArrayList;
import java.util.List;

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
        List<Object> collected = new ArrayList<Object>();
        for (int i = 0; i < inputs.length; i++) {
            if (inputs[i] != null) {
                Object resolved = inputs[i].get(_attribute);
                if (resolved != null) {
                    collected.add(resolved);
                }
            }
        }
        _finalCallback.on(collected.toArray(new Object[inputs.length]));
    }
}

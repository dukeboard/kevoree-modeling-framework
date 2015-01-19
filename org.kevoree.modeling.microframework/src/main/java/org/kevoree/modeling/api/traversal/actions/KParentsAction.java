package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.data.Index;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversalAction;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by duke on 18/12/14.
 */
public class KParentsAction implements KTraversalAction {

    private KTraversalAction _next;

    public KParentsAction() {
    }

    @Override
    public void chain(KTraversalAction p_next) {
        _next = p_next;
    }

    @Override
    public void execute(KObject[] p_inputs) {
        if (p_inputs == null || p_inputs.length == 0) {
            _next.execute(p_inputs);
            return;
        } else {
            KView currentView = p_inputs[0].view();
            List<Long> nextIds = new ArrayList<Long>();
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    Object[] raw = currentView.universe().model().storage().raw(loopObj, AccessMode.READ);
                    Object resolved = raw[Index.PARENT_INDEX];
                    if (resolved != null) {
                        try {
                            nextIds.add((Long) resolved);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            //call
            currentView.lookupAll(nextIds.toArray(new Long[nextIds.size()]), new Callback<KObject[]>() {
                @Override
                public void on(KObject[] kObjects) {
                    _next.execute(kObjects);
                }
            });
        }
    }

}

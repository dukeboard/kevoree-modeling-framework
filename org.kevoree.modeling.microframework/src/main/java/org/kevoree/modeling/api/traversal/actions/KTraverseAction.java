package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.util.ArrayUtils;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by duke on 18/12/14.
 */
public class KTraverseAction implements KTraversalAction {

    private KTraversalAction _next;

    private MetaReference _reference;

    public KTraverseAction(MetaReference p_reference) {
        this._reference = p_reference;
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
            AbstractKView currentView = (AbstractKView) p_inputs[0].view();
            Set<Long> nextIds = new HashSet<Long>();
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    KCacheEntry raw = currentView.universe().model().manager().entry(loopObj, AccessMode.READ);
                    if (raw != null) {
                        if (_reference == null) {
                            for (int j = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                MetaReference ref = loopObj.metaClass().metaReferences()[j];
                                long[] resolved = raw.getRef(ref.index());
                                if (resolved != null) {
                                    for (int k = 0; k < resolved.length; k++) {
                                        nextIds.add(resolved[k]);

                                    }
                                }
                            }
                        } else {
                            MetaReference translatedRef = loopObj.internal_transpose_ref(_reference);
                            if (translatedRef != null) {
                                long[] resolved = raw.getRef(translatedRef.index());
                                if (resolved != null) {
                                    for (int j = 0; j < resolved.length; j++) {
                                        nextIds.add(resolved[j]);
                                    }
                                }
                            }
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            //call
            currentView.internalLookupAll(ArrayUtils.flatSet(nextIds), new Callback<KObject[]>() {
                @Override
                public void on(KObject[] kObjects) {
                    _next.execute(kObjects);
                }
            });
        }
    }

}

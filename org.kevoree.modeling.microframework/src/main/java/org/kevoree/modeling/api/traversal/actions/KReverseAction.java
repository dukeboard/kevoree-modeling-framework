package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.util.ArrayUtils;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 18/12/14.
 */
public class KReverseAction implements KTraversalAction {

    private KTraversalAction _next;

    private MetaReference _reference;

    public KReverseAction(MetaReference p_reference) {
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
            Map<Long, KObject> toFilter = new HashMap<Long, KObject>();
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    KCacheEntry raw = currentView.universe().model().manager().entry(loopObj, AccessMode.READ);
                    if (raw != null) {
                        long[] elementsKeys = raw.getRef(Index.INBOUNDS_INDEX);
                        if (elementsKeys != null) {
                            if (_reference == null) {
                                for (int j = 0; j < elementsKeys.length; j++) {
                                    nextIds.add(elementsKeys[j]);
                                }
                            } else {
                                for (int j = 0; j < elementsKeys.length; j++) {
                                    toFilter.put(elementsKeys[j], p_inputs[i]);
                                }
                            }
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (toFilter.keySet().size() == 0) {
                currentView.internalLookupAll(ArrayUtils.flatSet(nextIds), new Callback<KObject[]>() {
                    @Override
                    public void on(KObject[] kObjects) {
                        _next.execute(kObjects);
                    }
                });
            } else {
                Long[] toFilterKeys = toFilter.keySet().toArray(new Long[toFilter.keySet().size()]);
                currentView.internalLookupAll(ArrayUtils.flatSet(toFilter.keySet()), new Callback<KObject[]>() {
                    @Override
                    public void on(KObject[] kObjects) {
                        for (int i = 0; i < toFilterKeys.length; i++) {
                            if (kObjects[i] != null) {
                                MetaReference[] references = kObjects[i].referencesWith(toFilter.get(toFilterKeys[i]));
                                for (int h = 0; h < references.length; h++) {
                                    if (references[h].metaName().equals(_reference.metaName())) {
                                        nextIds.add(kObjects[i].uuid());
                                    }
                                }
                            }
                        }
                        currentView.internalLookupAll(ArrayUtils.flatSet(nextIds), new Callback<KObject[]>() {
                            @Override
                            public void on(KObject[] kObjects) {
                                _next.execute(kObjects);
                            }
                        });
                    }
                });
            }
        }
    }

}

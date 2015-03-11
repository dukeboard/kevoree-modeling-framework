package org.kevoree.modeling.api.traversal;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.map.LongHashMap;

/**
 * Created by duke on 11/03/15.
 */
public class KTraversalHistory {

    private LongHashMap<KObject> _valuesHistory;

    public KTraversalHistory() {
        _valuesHistory = new LongHashMap<KObject>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
    }

    public void addResult(KObject[] resolved) {
        if (resolved != null) {
            for (int i = 0; i < resolved.length; i++) {
                _valuesHistory.put(resolved[i].uuid(), resolved[i]);
            }
        }
    }

    public void remove(long toDrop) {
        _valuesHistory.remove(toDrop);
    }

    public KObject get(long uuid) {
        return _valuesHistory.get(uuid);
    }

    public int historySize() {
        return _valuesHistory.size();
    }

}

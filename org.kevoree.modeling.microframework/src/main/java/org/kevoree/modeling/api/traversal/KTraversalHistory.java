package org.kevoree.modeling.api.traversal;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.map.LongHashMap;

/**
 * Created by duke on 11/03/15.
 */
public class KTraversalHistory {

    private LongHashMap<KObject[]> _valuesHistory;

    public KTraversalHistory() {
        _valuesHistory = new LongHashMap<KObject[]>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
    }

    public void addResult(KObject[] resolved) {
        _valuesHistory.put(_valuesHistory.size(), resolved);
    }

    public void popResult() {
        if (_valuesHistory.size() > 0) {
            _valuesHistory.remove(_valuesHistory.size() - 1);
        }
    }

    public KObject[] getPastResult(long historyDeep) {
        return _valuesHistory.get(historyDeep);
    }

    public int historySize() {
        return _valuesHistory.size();
    }

}

package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KContentKey;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 05/02/15.
 */
public class LookupAllRunnable implements Runnable {

    private KView _originView;
    private Long[] _keys;
    private Callback<KObject[]> _callback;
    private DefaultKDataManager _store;

    public LookupAllRunnable(KView p_originView, Long[] p_keys, Callback<KObject[]> p_callback, DefaultKDataManager p_store) {
        this._originView = p_originView;
        this._keys = p_keys;
        this._callback = p_callback;
        this._store = p_store;
    }

    @Override
    public void run() {
        _store.internal_resolve_universe_time(_originView, _keys, new Callback<ResolutionResult[]>() {
            @Override
            public void on(ResolutionResult[] objects) {
                KObject[] resolved = new KObject[_keys.length];
                List<Integer> toLoadIndexes = new ArrayList<Integer>();
                for (int i = 0; i < objects.length; i++) {
                    if (objects[i] != null && objects[i].resolvedQuanta != null && objects[i].resolvedUniverse != null) {
                        KContentKey contentKey = KContentKey.createObject(objects[i].resolvedUniverse, objects[i].resolvedQuanta, _keys[i]);
                        KCacheEntry entry = (KCacheEntry) _store.cache().get(contentKey);
                        if (entry == null) {
                            toLoadIndexes.add(i);
                        } else {
                            resolved[i] = ((AbstractKView) _originView).createProxy(entry.metaClass, entry.universeTree, _keys[i]);
                        }
                    }
                }
                if (toLoadIndexes.isEmpty()) {
                    _callback.on(resolved);
                } else {
                    KContentKey[] toLoadKeys = new KContentKey[toLoadIndexes.size()];
                    for (int i = 0; i < toLoadIndexes.size(); i++) {
                        int toLoadIndex = toLoadIndexes.get(i);
                        toLoadKeys[i] = KContentKey.createObject(objects[toLoadIndex].resolvedUniverse, objects[toLoadIndex].resolvedQuanta, _keys[i]);
                    }
                    _store.cdn().get(toLoadKeys, new ThrowableCallback<String[]>() {
                        @Override
                        public void on(String[] strings, Throwable error) {
                            if (error != null) {
                                error.printStackTrace();
                                _callback.on(null);
                            } else {
                                for (int i = 0; i < strings.length; i++) {
                                    if (strings[i] != null) {
                                        int index = toLoadIndexes.get(i);
                                        //Create the raw CacheEntry
                                        KCacheEntry entry = new KCacheEntry();
                                        JsonRaw.decode(strings[i], objects[i].resolvedQuanta, _originView.universe().model().metaModel(), entry);
                                        if (entry.raw != null) {
                                            entry.universeTree = objects[i].universeTree;
                                            //Create and Add the proxy
                                            resolved[index] = ((AbstractKView) _originView).createProxy(entry.metaClass, entry.universeTree, _keys[i]);
                                            //Save the cache value
                                            _store.cache().put(KContentKey.createObject(objects[i].resolvedUniverse, (Long) objects[i].resolvedQuanta, _keys[i]), entry);
                                        }
                                    }
                                }
                                _callback.on(resolved);
                            }
                        }
                    });
                }
            }
        });
    }
}

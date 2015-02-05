package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.time.TimeTree;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 05/02/15.
 */
public class LookupAllRunnable implements Runnable {

    private KView _originView;
    private Long[] _keys;
    private Callback<KObject[]> _callback;
    private DefaultKStore _store;

    public LookupAllRunnable(KView p_originView, Long[] p_keys, Callback<KObject[]> p_callback, DefaultKStore p_store) {
        this._originView = p_originView;
        this._keys = p_keys;
        this._callback = p_callback;
        this._store = p_store;
    }

    @Override
    public void run() {
        _store.internal_resolve_dim_time(_originView, _keys, new Callback<Object[][]>() {
            @Override
            public void on(Object[][] objects) {
                KObject[] resolved = new KObject[_keys.length];
                List<Integer> toLoadIndexes = new ArrayList<Integer>();
                for (int i = 0; i < objects.length; i++) {
                    if (objects[i][DefaultKStore.INDEX_RESOLVED_TIME] != null) {
                        CacheEntry entry = _store.read_cache((Long) objects[i][DefaultKStore.INDEX_RESOLVED_DIM], (Long) objects[i][DefaultKStore.INDEX_RESOLVED_TIME], _keys[i]);
                        if (entry == null) {
                            toLoadIndexes.add(i);
                        } else {
                            resolved[i] = ((AbstractKView) _originView).createProxy(entry.metaClass, entry.timeTree, _keys[i]);
                        }
                    }
                }
                if (toLoadIndexes.isEmpty()) {
                    _callback.on(resolved);
                } else {
                    String[] toLoadKeys = new String[toLoadIndexes.size()];
                    for (int i = 0; i < toLoadIndexes.size(); i++) {
                        int toLoadIndex = toLoadIndexes.get(i);
                        toLoadKeys[i] = _store.keyPayload((Long) objects[toLoadIndex][DefaultKStore.INDEX_RESOLVED_DIM], (Long) objects[toLoadIndex][DefaultKStore.INDEX_RESOLVED_TIME], _keys[i]);
                    }
                    _store.dataBase().get(toLoadKeys, new ThrowableCallback<String[]>() {
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
                                        CacheEntry entry = JsonRaw.decode(strings[i], _originView, (Long) objects[i][DefaultKStore.INDEX_RESOLVED_TIME]);
                                        if (entry != null) {
                                            entry.timeTree = (TimeTree) objects[i][DefaultKStore.INDEX_RESOLVED_TIMETREE];
                                            //Create and Add the proxy
                                            resolved[index] = ((AbstractKView) _originView).createProxy(entry.metaClass, entry.timeTree, _keys[i]);
                                            //Save the cache value
                                            _store.write_cache((Long) objects[i][DefaultKStore.INDEX_RESOLVED_DIM], (Long) objects[i][DefaultKStore.INDEX_RESOLVED_TIME], _keys[i], entry);
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

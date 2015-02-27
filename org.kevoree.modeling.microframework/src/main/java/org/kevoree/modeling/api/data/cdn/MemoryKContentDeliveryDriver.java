package org.kevoree.modeling.api.data.cdn;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.*;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.msg.KEventMessage;
import org.kevoree.modeling.api.msg.KMessage;
import org.kevoree.modeling.api.util.LocalEventListeners;

import java.util.ArrayList;
import java.util.HashMap;

public class MemoryKContentDeliveryDriver implements KContentDeliveryDriver {

    private final HashMap<String, String> backend = new HashMap<String, String>();
    private LocalEventListeners _localEventListeners = new LocalEventListeners();
    private KDataManager _manager;
    public static boolean DEBUG = false;

    //TODO implement a lock
    @Override
    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback) {
        String result = backend.get(key.toString());
        String mutated = operation.mutate(result);
        if (DEBUG) {
            System.out.println("ATOMIC GET " + key + "->" + result);
            System.out.println("ATOMIC PUT " + key + "->" + mutated);
        }
        backend.put(key.toString(), mutated);
        callback.on(result, null);
    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        String[] values = new String[keys.length];
        for (int i = 0; i < keys.length; i++) {
            values[i] = backend.get(keys[i].toString());
            if (DEBUG) {
                System.out.println("GET " + keys[i] + "->" + values[i]);
            }
        }
        if (callback != null) {
            callback.on(values, null);
        }
    }

    @Override
    public synchronized void put(KContentPutRequest p_request, Callback<Throwable> p_callback) {
        for (int i = 0; i < p_request.size(); i++) {
            backend.put(p_request.getKey(i).toString(), p_request.getContent(i));
            if (DEBUG) {
                System.out.println("PUT " + p_request.getKey(i).toString() + "->" + p_request.getContent(i));
            }
        }
        if (p_callback != null) {
            p_callback.on(null);
        }
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> callback) {
        for (int i = 0; i < keys.length; i++) {
            backend.remove(keys[i]);
        }
        if (callback != null) {
            callback.on(null);
        }
    }

    @Override
    public void connect(Callback<Throwable> callback) {
        if (callback != null) {
            callback.on(null);
        }
    }

    @Override
    public void close(Callback<Throwable> callback) {
        _localEventListeners.clear();
        backend.clear();
    }


    @Override
    public void registerListener(Object p_origin, KEventListener p_listener, Object p_scope) {
        _localEventListeners.registerListener(p_origin, p_listener, p_scope);
    }

    @Override
    public void unregister(KEventListener p_listener) {
        _localEventListeners.unregister(p_listener);
    }

    @Override
    public void send(KEventMessage[] msgs) {
        //NO REMOVE MANAGEMENT
        fireLocalMessages(msgs);
    }

    @Override
    public void setManager(KDataManager manager) {
        this._manager = manager;
    }

    private void fireLocalMessages(KEventMessage[] msgs) {
        HashMap<Long, KUniverse> universe = new HashMap<Long, KUniverse>();
        HashMap<String, KView> views = new HashMap<String, KView>();
        for (int i = 0; i < msgs.length; i++) {
            KContentKey key = msgs[i].key;
            if (key.part1() != null && key.part2() != null && key.part3() != null) {
                //this is a KObject key...
                KCacheObject relevantEntry = _manager.cache().get(key);
                if (relevantEntry instanceof KCacheEntry) {
                    KCacheEntry entry = (KCacheEntry) relevantEntry;
                    //Ok we have to create the corresponding proxy...
                    KUniverse universeSelected = null;
                    universeSelected = universe.get(key.part1());
                    if (universeSelected == null) {
                        universeSelected = _manager.model().universe(key.part1());
                        universe.put(key.part1(), universeSelected);
                    }
                    KView tempView = views.get(key.part1() + "/" + key.part2());
                    if (tempView == null) {
                        tempView = universeSelected.time(key.part2());
                        views.put(key.part1() + "/" + key.part2(), tempView);
                    }
                    KObject resolved = ((AbstractKView) tempView).createProxy(entry.metaClass, entry.universeTree, key.part3());
                    Meta[] metas = new Meta[msgs[i].meta.length];
                    for (int j = 0; j < msgs[i].meta.length; j++) {
                        if (msgs[i].meta[j] >= Index.RESERVED_INDEXES) {
                            metas[j] = resolved.metaClass().meta(msgs[i].meta[j]);
                        }
                    }
                    _localEventListeners.dispatch(resolved, metas);
                }
            }
        }
    }

}
package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.msg.KEventMessage;
import org.kevoree.modeling.api.rbtree.LongRBTree;

import java.util.HashMap;

/**
 * Created by gregory.nain on 11/11/14.
 */
public class LocalEventListeners {

    private static int DIM_INDEX = 0;
    private static int TIME_INDEX = 1;
    private static int UUID_INDEX = 2;
    private static int TUPLE_SIZE = 3;

    private HashMap<KEventListener, Long[]> listeners = new HashMap<KEventListener, Long[]>();
    private KDataManager _manager;

    public void registerListener(Object origin, KEventListener listener, Object scope) {
        Long[] tuple = new Long[TUPLE_SIZE];
        if (origin instanceof AbstractKUniverse) {
            tuple[DIM_INDEX] = ((AbstractKUniverse) origin).key();
        } else if (origin instanceof AbstractKView) {
            tuple[DIM_INDEX] = ((AbstractKView) origin).universe().key();
            tuple[TIME_INDEX] = ((AbstractKView) origin).now();
        } else if (origin instanceof AbstractKObject) {
            AbstractKObject casted = (AbstractKObject) origin;
            if (scope == null) {
                tuple[DIM_INDEX] = casted.universe().key();
                tuple[TIME_INDEX] = casted.now();
                tuple[UUID_INDEX] = casted.uuid();
            } else {
                tuple[UUID_INDEX] = casted.uuid();
                if (scope instanceof AbstractKUniverse) {
                    tuple[DIM_INDEX] = ((AbstractKUniverse) scope).key();
                }
            }
        }
        listeners.put(listener, tuple);
    }

    public void setManager(KDataManager manager) {
        this._manager = manager;
    }


    public void dispatch(KEventMessage[] messages){
        HashMap<Long, KUniverse> universeCache = new HashMap<Long, KUniverse>();
        HashMap<String, KView> viewsCache = new HashMap<String, KView>();

        for(int k = 0; k < messages.length; k++) {
            KEventMessage msg = messages[k];
            KContentKey sourceKey = msg.key;
            final KEventListener[] keys = listeners.keySet().toArray(new KEventListener[listeners.size()]);
            for (int i = 0; i < keys.length; i++) {
                Object[] tuple = listeners.get(keys[i]);
                boolean match = true;
                if (tuple[DIM_INDEX] != null) {
                    if (!tuple[DIM_INDEX].equals(sourceKey.universe())) {
                        match = false;
                    }
                }
                if (tuple[TIME_INDEX] != null) {
                    if (!tuple[TIME_INDEX].equals(sourceKey.time())) {
                        match = false;
                    }
                }
                if (tuple[UUID_INDEX] != null) {
                    if (!tuple[UUID_INDEX].equals(sourceKey.obj())) {
                        match = false;
                    }
                }
                if (match) {
                    final int finalI = i;
                    resolveKObject(sourceKey, universeCache, viewsCache, new Callback<KObject>() {
                        @Override
                        public void on(KObject src) {
                            Meta[] metas = new Meta[msg.meta.length];
                            for (int j = 0; j < msg.meta.length; j++) {
                                if (msg.meta[j] >= Index.RESERVED_INDEXES) {
                                    metas[j] = src.metaClass().meta(msg.meta[j]);
                                }
                            }
                            keys[finalI].on(src, metas);
                        }
                    });
                }
            }
        }

    }

    private void resolveKObject(KContentKey key, HashMap<Long, KUniverse> universeCache, HashMap<String, KView> viewsCache, Callback<KObject> callback) {
        LongRBTree universeTree = (LongRBTree) _manager.cache().get(KContentKey.createUniverseTree(key.obj()));
        KUniverse universeSelected = universeCache.get(key.universe());
        if (universeSelected == null) {
            universeSelected = _manager.model().universe(key.universe());
            universeCache.put(key.universe(), universeSelected);
        }
        KView tempView = viewsCache.get(key.universe() + "/" + key.time());
        if (tempView == null) {
            tempView = universeSelected.time(key.time());
            viewsCache.put(key.universe() + "/" + key.time(), tempView);
        }
        KCacheEntry entry = (KCacheEntry)_manager.cache().get(key);
        if(entry == null) {
            _manager.lookup(tempView, key.obj(), callback);
        } else {
            callback.on(((AbstractKView) tempView).createProxy(entry.metaClass, universeTree, key.obj()));
        }
    }


    public void unregister(KEventListener listener) {
        listeners.remove(listener);
    }

    public void clear() {
        listeners.clear();
    }


}

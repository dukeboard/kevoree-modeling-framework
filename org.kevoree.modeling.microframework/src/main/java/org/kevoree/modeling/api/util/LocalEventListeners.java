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

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

/**
 * Created by gregory.nain on 11/11/14.
 */
public class LocalEventListeners {

    private KDataManager _manager;

    private HashMap<Long, HashMap<Long, ArrayList<KEventListener>>> listenersMap = new HashMap<Long, HashMap<Long, ArrayList<KEventListener>>>();

    //Registers a listener for the Origin. In its universe only.
    //Register also on any sub-element if scope == null
    public void registerListener(KObject origin, KEventListener listener, boolean subTree) {
        HashMap<Long, ArrayList<KEventListener>> universeMap = listenersMap.get(origin.universe().key());
        if(universeMap == null) {
            universeMap = new HashMap<Long, ArrayList<KEventListener>>();
            listenersMap.put(origin.universe().key(), universeMap);
        }
        ArrayList<KEventListener> objectListeners = universeMap.get(origin.uuid());
        if(objectListeners == null) {
            objectListeners = new ArrayList<KEventListener>();
            universeMap.put(origin.uuid(), objectListeners);
        }
        if(subTree == false) {
            objectListeners.add(listener);
        } else {
            System.out.println("Registration of listener for sub-tree not implemented yet.");
        }
    }

    public void setManager(KDataManager manager) {
        this._manager = manager;
    }


    public void dispatch(KEventMessage[] messages){
        HashMap<Long, KUniverse> universeCache = new HashMap<Long, KUniverse>();
        HashMap<String, KView> viewsCache = new HashMap<String, KView>();

        for(int k = 0; k < messages.length; k++) {
            final KEventMessage msg = messages[k];
            KContentKey sourceKey = msg.key;

            HashMap<Long, ArrayList<KEventListener>> universeListeners = listenersMap.get(sourceKey.universe());
            if(universeListeners != null) {
                final ArrayList<KEventListener> objectListeners = universeListeners.get(sourceKey.obj());
                if(objectListeners != null) {
                    for(int i = 0; i < objectListeners.size(); i++) {
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
                                KEventListener lst = objectListeners.get(finalI);
                                lst.on(src, metas);
                            }
                        });
                    }
                }
            }
        }
    }

    private void resolveKObject(KContentKey key, HashMap<Long, KUniverse> universeCache, HashMap<String, KView> viewsCache, Callback<KObject> callback) {
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
            callback.on(((AbstractKView) tempView).createProxy(entry.metaClass, key.obj()));
        }
    }


    public void unregister(KObject origin, KEventListener listener, boolean subTree) {
        HashMap<Long, ArrayList<KEventListener>> universeListeners = listenersMap.get(origin.universe().key());
        if(universeListeners != null) {
            ArrayList<KEventListener> objectListeners = universeListeners.get(origin.uuid());
            if(objectListeners != null) {
                if(subTree == false) {
                    objectListeners.remove(listener);
                } else {
                    System.out.println("Registration of listener for sub-tree not implemented yet.");
                }
            }
        }
    }

    public void clear() {
        listenersMap.clear();
    }


}

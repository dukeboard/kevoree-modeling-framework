package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.manager.DefaultKDataManager;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.data.manager.KeyCalculator;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.map.LongHashMapCallBack;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.map.LongLongHashMapCallBack;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.msg.KEvents;
import org.kevoree.modeling.api.msg.KMessage;

public class LocalEventListeners {

    private KDataManager _manager;

    private KeyCalculator _internalListenerKeyGen;

    private LongHashMap<KEventListener> _simpleListener;

    private LongHashMap<KEventMultiListener> _multiListener;

    private LongLongHashMap _listener2Object;

    private LongHashMap<long[]> _listener2Objects;

    private LongHashMap<LongLongHashMap> _obj2Listener;

    private LongHashMap<LongLongHashMap> _group2Listener;

    public LocalEventListeners() {
        _internalListenerKeyGen = new KeyCalculator((short) 0, 0);
        _simpleListener = new LongHashMap<KEventListener>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        _multiListener = new LongHashMap<KEventMultiListener>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        _obj2Listener = new LongHashMap<LongLongHashMap>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        _listener2Object = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        _listener2Objects = new LongHashMap<long[]>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        _group2Listener = new LongHashMap<LongLongHashMap>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
    }

    public synchronized void registerListener(long groupId, KObject origin, KEventListener listener) {
        long generateNewID = _internalListenerKeyGen.nextKey();
        _simpleListener.put(generateNewID, listener);
        _listener2Object.put(generateNewID, origin.universe().key());
        LongLongHashMap subLayer = _obj2Listener.get(origin.uuid());
        if (subLayer == null) {
            subLayer = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            _obj2Listener.put(origin.uuid(), subLayer);
        }
        subLayer.put(generateNewID, origin.universe().key());
        subLayer = _group2Listener.get(groupId);
        if (subLayer == null) {
            subLayer = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            _group2Listener.put(groupId, subLayer);
        }
        subLayer.put(generateNewID, 1);
    }

    public synchronized void registerListenerAll(long groupId, KUniverse origin, long[] objects, KEventMultiListener listener) {
        long generateNewID = _internalListenerKeyGen.nextKey();
        _multiListener.put(generateNewID, listener);
        _listener2Objects.put(generateNewID, objects);
        LongLongHashMap subLayer;
        for (int i = 0; i < objects.length; i++) {
            subLayer = _obj2Listener.get(objects[i]);
            if (subLayer == null) {
                subLayer = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
                _obj2Listener.put(objects[i], subLayer);
            }
            subLayer.put(generateNewID, origin.key());
        }
        subLayer = _group2Listener.get(groupId);
        if (subLayer == null) {
            subLayer = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            _group2Listener.put(groupId, subLayer);
        }
        subLayer.put(generateNewID, 2);
    }

    public synchronized void unregister(long groupId) {
        LongLongHashMap groupLayer = _group2Listener.get(groupId);
        if (groupLayer != null) {
            groupLayer.each(new LongLongHashMapCallBack() {
                @Override
                public void on(long listenerID, long value) {
                    if (value == 1) {
                        _simpleListener.remove(listenerID);
                        long previousObject = _listener2Object.get(listenerID);
                        _listener2Object.remove(listenerID);
                        LongLongHashMap _obj2ListenerLayer = _obj2Listener.get(previousObject);
                        if (_obj2ListenerLayer != null) {
                            _obj2ListenerLayer.remove(listenerID);
                        }
                    } else {
                        _multiListener.remove(listenerID);
                        long[] previousObjects = _listener2Objects.get(listenerID);
                        for (int i = 0; i < previousObjects.length; i++) {
                            LongLongHashMap _obj2ListenerLayer = _obj2Listener.get(previousObjects[i]);
                            if (_obj2ListenerLayer != null) {
                                _obj2ListenerLayer.remove(listenerID);
                            }
                        }
                        _listener2Objects.remove(listenerID);
                    }
                }
            });
            _group2Listener.remove(groupId);
        }
    }

    public void clear() {
        _simpleListener.clear();
        _multiListener.clear();
        _obj2Listener.clear();
        _group2Listener.clear();
        _listener2Object.clear();
        _listener2Objects.clear();
    }

    public void setManager(KDataManager manager) {
        this._manager = manager;
    }

    public void dispatch(final KMessage param) {
        if (_manager != null) {
            LongHashMap<KUniverse> _cacheUniverse = new LongHashMap<KUniverse>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            if (param instanceof KEvents) {
                KEvents messages = (KEvents) param;
                KContentKey[] toLoad = new KContentKey[messages.size()];
                final LongLongHashMap[] multiCounters = new LongLongHashMap[1];
                //first step, we filter and select relevant keys
                for (int i = 0; i < messages.size(); i++) {
                    KContentKey loopKey = messages.getKey(i);
                    LongLongHashMap listeners = _obj2Listener.get(loopKey.obj());

                    final boolean[] isSelect = {false};
                    if (listeners != null) {
                        listeners.each(new LongLongHashMapCallBack() {
                            @Override
                            public void on(long listenerKey, long universeKey) {
                                if (universeKey == loopKey.universe()) {
                                    isSelect[0] = true;
                                    if (_multiListener.containsKey(listenerKey)) {
                                        if (multiCounters[0] == null) {
                                            multiCounters[0] = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
                                        }
                                        long previous = 0;
                                        if (multiCounters[0].containsKey(listenerKey)) {
                                            previous = multiCounters[0].get(listenerKey);
                                        }
                                        previous++;
                                        multiCounters[0].put(listenerKey, previous);
                                    }
                                }
                            }
                        });
                    }
                    if (isSelect[0]) {
                        toLoad[i] = loopKey;
                    }
                }
                ((DefaultKDataManager) _manager).bumpKeysToCache(toLoad, new Callback<KCacheObject[]>() {
                    @Override
                    public void on(KCacheObject[] kCacheObjects) {
                        final LongHashMap<KObject[]>[] multiObjectSets = new LongHashMap[1];
                        final LongLongHashMap[] multiObjectIndexes = new LongLongHashMap[1];
                        if (multiCounters[0] != null) {
                            multiObjectSets[0] = new LongHashMap<KObject[]>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
                            multiObjectIndexes[0] = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
                            //init next result
                            multiCounters[0].each(new LongLongHashMapCallBack() {
                                @Override
                                public void on(long listenerKey, long value) {
                                    multiObjectSets[0].put(listenerKey, new KObject[(int) value]);
                                    multiObjectIndexes[0].put(listenerKey, 0);
                                }
                            });
                        }
                        //first we try to select unary listener
                        LongLongHashMap listeners;
                        for (int i = 0; i < messages.size(); i++) {
                            if (kCacheObjects[i] != null && kCacheObjects[i] instanceof KCacheEntry) {
                                KContentKey correspondingKey = toLoad[i];
                                listeners = _obj2Listener.get(correspondingKey.obj());
                                if (listeners != null) {
                                    KUniverse cachedUniverse = _cacheUniverse.get(correspondingKey.universe());
                                    if (cachedUniverse == null) {
                                        cachedUniverse = _manager.model().universe(correspondingKey.universe());
                                        _cacheUniverse.put(correspondingKey.universe(), cachedUniverse);
                                    }
                                    KObject toDispatch = ((AbstractKView) cachedUniverse.time(correspondingKey.time())).createProxy(((KCacheEntry) kCacheObjects[i]).metaClass, correspondingKey.obj());
                                    if(toDispatch != null){
                                        kCacheObjects[i].inc();
                                    }
                                    Meta[] meta = new Meta[messages.getIndexes(i).length];
                                    for (int j = 0; j < messages.getIndexes(i).length; j++) {
                                        if (messages.getIndexes(i)[j] >= Index.RESERVED_INDEXES) {
                                            meta[j] = toDispatch.metaClass().meta(messages.getIndexes(i)[j]);
                                        }
                                    }
                                    listeners.each(new LongLongHashMapCallBack() {
                                        @Override
                                        public void on(long listenerKey, long value) {
                                            KEventListener listener = _simpleListener.get(listenerKey);
                                            if (listener != null) {
                                                listener.on(toDispatch, meta);
                                            } else {
                                                KEventMultiListener multiListener = _multiListener.get(listenerKey);
                                                if (multiListener != null) {
                                                    if (multiObjectSets[0] != null && multiObjectIndexes[0] != null) {
                                                        long index = multiObjectIndexes[0].get(listenerKey);
                                                        multiObjectSets[0].get(listenerKey)[(int) index] = toDispatch;
                                                        index = index + 1;
                                                        multiObjectIndexes[0].put(listenerKey, index);
                                                    }
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        }
                        if (multiObjectSets[0] != null) {
                            multiObjectSets[0].each(new LongHashMapCallBack<KObject[]>() {
                                @Override
                                public void on(long key, KObject[] value) {
                                    KEventMultiListener multiListener = _multiListener.get(key);
                                    if (multiListener != null) {
                                        multiListener.on(value);
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    }

}

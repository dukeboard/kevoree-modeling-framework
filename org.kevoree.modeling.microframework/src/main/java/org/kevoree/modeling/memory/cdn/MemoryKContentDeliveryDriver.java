package org.kevoree.modeling.memory.cdn;

import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.KEventListener;
import org.kevoree.modeling.KEventMultiListener;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.KUniverse;
import org.kevoree.modeling.ThrowableCallback;
import org.kevoree.modeling.memory.KContentDeliveryDriver;
import org.kevoree.modeling.memory.KContentKey;
import org.kevoree.modeling.memory.KDataManager;
import org.kevoree.modeling.util.LocalEventListeners;
import org.kevoree.modeling.memory.struct.map.StringHashMap;
import org.kevoree.modeling.msg.KMessage;

public class MemoryKContentDeliveryDriver implements KContentDeliveryDriver {

    private final StringHashMap<String> backend = new StringHashMap<String>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
    private LocalEventListeners _localEventListeners = new LocalEventListeners();

    public static boolean DEBUG = false;

    @Override
    public void atomicGetIncrement(KContentKey key, ThrowableCallback<Short> cb) {
        String result = backend.get(key.toString());
        short nextV;
        short previousV;
        if (result != null) {
            try {
                previousV = Short.parseShort(result);
            } catch (Exception e) {
                e.printStackTrace();
                previousV = Short.MIN_VALUE;
            }
        } else {
            previousV = 0;
        }
        if (previousV == Short.MAX_VALUE) {
            nextV = Short.MIN_VALUE;
        } else {
            nextV = (short) (previousV + 1);
        }
        backend.put(key.toString(), "" + nextV);
        cb.on(previousV, null);
    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        String[] values = new String[keys.length];
        for (int i = 0; i < keys.length; i++) {
            if (keys[i] != null) {
                values[i] = backend.get(keys[i].toString());
            }
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
        callback.on(null);
    }


    @Override
    public void registerListener(long groupId, KObject p_origin, KEventListener p_listener) {
        _localEventListeners.registerListener(groupId, p_origin, p_listener);
    }

    @Override
    public void unregisterGroup(long groupId) {
        _localEventListeners.unregister(groupId);
    }

    @Override
    public void registerMultiListener(long groupId, KUniverse origin, long[] objects, KEventMultiListener listener) {
        _localEventListeners.registerListenerAll(groupId, origin.key(), objects, listener);
    }

    @Override
    public void send(KMessage msgs) {
        //NO REMOTE MANAGEMENT
        _localEventListeners.dispatch(msgs);
    }

    @Override
    public void setManager(KDataManager manager) {
        _localEventListeners.setManager(manager);
    }


}
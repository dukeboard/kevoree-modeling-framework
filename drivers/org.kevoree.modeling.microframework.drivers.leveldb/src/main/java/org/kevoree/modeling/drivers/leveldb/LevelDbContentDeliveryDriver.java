package org.kevoree.modeling.drivers.leveldb;

import org.fusesource.leveldbjni.JniDBFactory;
import org.iq80.leveldb.DB;
import org.iq80.leveldb.Options;
import org.iq80.leveldb.WriteBatch;
import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.event.LocalEventListeners;
import org.kevoree.modeling.api.msg.KMessage;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by duke on 11/4/14.
 */
public class LevelDbContentDeliveryDriver implements KContentDeliveryDriver {

    private Options options = new Options().createIfMissing(true);

    private DB db;

    private final Lock lock = new ReentrantLock();

    private String _storagePath = null;

    private boolean _isConnected = false;

    @Override
    public void connect(Callback<Throwable> callback) {
        File location = new File(_storagePath);
        if (!location.exists()) {
            location.mkdirs();
        }
        File targetDB = new File(location, "data");
        Exception exception = null;
        try {
            db = JniDBFactory.factory.open(targetDB, options);
            _isConnected = true;
        } catch (Exception e) {
            exception = e;
        }
        //noop
        if (callback != null) {
            callback.on(exception);
        }
    }

    public LevelDbContentDeliveryDriver(String p_storagePath) throws IOException {
        this._storagePath = p_storagePath;
    }

    private String _connectedError = "PLEASE CONNECT YOUR DATABASE FIRST";

    @Override
    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback) {
        if (!_isConnected) {
            throw new RuntimeException(_connectedError);
        }
        String result = JniDBFactory.asString(db.get(JniDBFactory.bytes(key.toString())));
        String mutated = operation.mutate(result);
        WriteBatch batch = db.createWriteBatch();
        batch.put(JniDBFactory.bytes(key.toString()), JniDBFactory.bytes(mutated));
        db.write(batch);
        callback.on(result, null);
    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        if (!_isConnected) {
            throw new RuntimeException(_connectedError);
        }
        String[] result = new String[keys.length];
        for (int i = 0; i < keys.length; i++) {
            result[i] = JniDBFactory.asString(db.get(JniDBFactory.bytes(keys[i].toString())));
        }
        if (callback != null) {
            callback.on(result, null);
        }
    }

    @Override
    public void put(KContentPutRequest request, Callback<Throwable> error) {
        if (!_isConnected) {
            throw new RuntimeException(_connectedError);
        }
        WriteBatch batch = db.createWriteBatch();
        for (int i = 0; i < request.size(); i++) {
            batch.put(JniDBFactory.bytes(request.getKey(i).toString()), JniDBFactory.bytes(request.getContent(i)));
        }
        db.write(batch);
        if (error != null) {
            error.on(null);
        }
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {
        if (!_isConnected) {
            throw new RuntimeException(_connectedError);
        }
        try {
            for (int i = 0; i < keys.length; i++) {
                db.delete(JniDBFactory.bytes(keys[i]));
            }
            if (error != null) {
                error.on(null);
            }
        } catch (Exception e) {
            if (error != null) {
                error.on(e);
            }
        }
    }

    @Override
    public void close(Callback<Throwable> error) {
        db.write(db.createWriteBatch());
        try {
            db.close();
            _isConnected = false;
            if (error != null) {
                error.on(null);
            }
        } catch (IOException e) {
            if (error != null) {
                error.on(e);
            }
        }
    }

    private LocalEventListeners localEventListeners = new LocalEventListeners();

    @Override
    public void registerListener(long p_groupId, KObject p_origin, KEventListener p_listener) {
        localEventListeners.registerListener(p_groupId, p_origin, p_listener);
    }

    @Override
    public void registerMultiListener(long p_groupId, KUniverse p_origin, long[] p_objects, KEventMultiListener p_listener) {
        localEventListeners.registerListenerAll(p_groupId, p_origin.key(), p_objects, p_listener);
    }

    @Override
    public void unregisterGroup(long p_groupId) {
        localEventListeners.unregister(p_groupId);
    }

    @Override
    public void send(KMessage msgs) {
        //No Remote send since LevelDB do not provide message brokering
        localEventListeners.dispatch(msgs);
    }

    @Override
    public void setManager(KDataManager manager) {
        localEventListeners.setManager(manager);
    }

}

package org.kevoree.modeling.databases.rocksdb;

import org.kevoree.modeling.*;
import org.kevoree.modeling.api.*;
import org.kevoree.modeling.memory.KContentKey;
import org.kevoree.modeling.memory.cdn.AtomicOperation;
import org.kevoree.modeling.memory.KContentDeliveryDriver;
import org.kevoree.modeling.memory.cdn.KContentPutRequest;
import org.kevoree.modeling.memory.KDataManager;
import org.kevoree.modeling.util.LocalEventListeners;
import org.kevoree.modeling.msg.KMessage;
import org.rocksdb.Options;
import org.rocksdb.RocksDB;
import org.rocksdb.RocksDBException;
import org.rocksdb.WriteBatch;
import org.rocksdb.WriteOptions;

import java.io.File;
import java.io.IOException;

/**
 * Created by duke on 11/4/14.
 */
public class RocksDbContentDeliveryDriver implements KContentDeliveryDriver {

    private Options options;

    private RocksDB db;

    public RocksDbContentDeliveryDriver(String storagePath) throws IOException, RocksDBException {
        options = new Options();
        options.setCreateIfMissing(true);
        File location = new File(storagePath);
        if (!location.exists()) {
            location.mkdirs();
        }
        File targetDB = new File(location, "data");
        targetDB.mkdirs();
        db = RocksDB.open(options, targetDB.getAbsolutePath());
    }

    @Override
    public void put(KContentPutRequest request, Callback<Throwable> error) {
        WriteBatch batch = new WriteBatch();
        for (int i = 0; i < request.size(); i++) {
            batch.put(request.getKey(i).toString().getBytes(), request.getContent(i).getBytes());
        }
        WriteOptions options = new WriteOptions();
        options.setSync(true);
        try {
            db.write(options, batch);
        } catch (RocksDBException e) {
            e.printStackTrace();
        }
        if (error != null) {
            error.on(null);
        }
    }

    @Override
    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback) {
        try {
            String result = new String(db.get(key.toString().getBytes()));
            String mutated = operation.mutate(result);
            WriteBatch batch = new WriteBatch();
            batch.put(key.toString().getBytes(), mutated.getBytes());
            db.write(new WriteOptions().setSync(true), batch);
            callback.on(result, null);
        } catch (RocksDBException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        String[] result = new String[keys.length];
        for (int i = 0; i < keys.length; i++) {
            try {
                result[i] = new String(db.get(keys[i].toString().getBytes()));

            } catch (Exception e) {
                e.printStackTrace();
            }
            if (callback != null) {
                callback.on(result, null);
            }
        }
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {
        try {
            for (int i = 0; i < keys.length; i++) {
                db.remove(keys[i].getBytes());
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
        try {
            WriteOptions options = new WriteOptions();
            options.sync();
            db.write(options, new WriteBatch());
            db.close();
            if (error != null) {
                error.on(null);
            }
        } catch (Exception e) {
            if (error != null) {
                error.on(e);
            }
        }
    }

    private LocalEventListeners _localEventListeners = new LocalEventListeners();

    @Override
    public void registerListener(long p_groupId, KObject p_origin, KEventListener p_listener) {
        _localEventListeners.registerListener(p_groupId, p_origin, p_listener);
    }

    @Override
    public void registerMultiListener(long p_groupId, KUniverse p_origin, long[] p_objects, KEventMultiListener p_listener) {
        _localEventListeners.registerListenerAll(p_groupId, p_origin.key(), p_objects, p_listener);
    }

    @Override
    public void unregisterGroup(long p_groupId) {
        _localEventListeners.unregister(p_groupId);
    }

    @Override
    public void send(KMessage msg) {
        //NO Remote op
        _localEventListeners.dispatch(msg);
    }

    @Override
    public void setManager(KDataManager manager) {
        _localEventListeners.setManager(manager);
    }

    @Override
    public void connect(Callback<Throwable> callback) {
        //noop
        if (callback != null) {
            callback.on(null);
        }
    }

}

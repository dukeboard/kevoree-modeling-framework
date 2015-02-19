package org.kevoree.modeling.databases.rocksdb;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.rocksdb.*;

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
    public void get(String[] keys, ThrowableCallback<String[]> callback) {
        String[] result = new String[keys.length];
        try {
            for (int i = 0; i < keys.length; i++) {

                result[i] = new String(db.get(keys[i].getBytes()));

            }
            if (callback != null) {
                callback.on(result, null);
            }
        } catch (RocksDBException e) {
            if (callback != null) {
                callback.on(result, e);
            }
        }
    }

    @Override
    public void put(String[][] payloads, Callback<Throwable> error) {
        try {
            for (int i = 0; i < payloads.length; i++) {
                db.put(payloads[i][0].getBytes(), payloads[i][1].getBytes());
            }
            if (error != null) {
                error.on(null);
            }
        } catch (RocksDBException e) {
            if (error != null) {
                error.on(e);
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
    public void commit(Callback<Throwable> error) {
        try {
            WriteOptions options = new WriteOptions();
            options.sync();
            db.write(options, new WriteBatch());
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

    @Override
    public void connect(Callback<Throwable> callback) {
        //noop
        if(callback != null){
            callback.on(null);
        }
    }

}

package org.kevoree.modeling.databases.leveldb;

import org.fusesource.leveldbjni.JniDBFactory;
import org.iq80.leveldb.DB;
import org.iq80.leveldb.Options;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.KDataBase;

import java.io.File;
import java.io.IOException;

/**
 * Created by duke on 11/4/14.
 */
public class LevelDbDataBase implements KDataBase {

    private Options options = new Options().createIfMissing(true);

    private DB db;

    public LevelDbDataBase(String storagePath) throws IOException {
        File location = new File(storagePath);
        if (!location.exists()) {
            location.mkdirs();
        }
        File targetDB = new File(location, "data");
        db = JniDBFactory.factory.open(targetDB, options);
    }

    @Override
    public void get(String[] keys, ThrowableCallback<String[]> callback) {
        String[] result = new String[keys.length];
        for (int i = 0; i < keys.length; i++) {
            result[i] = JniDBFactory.asString(db.get(JniDBFactory.bytes(keys[i])));
        }
        if(callback!= null){
            callback.on(result, null);
        }
    }

    @Override
    public void put(String[][] payloads, Callback<Throwable> error) {
        for (int i = 0; i < payloads.length; i++) {
            db.put(JniDBFactory.bytes(payloads[i][0]), JniDBFactory.bytes(payloads[i][1]));
        }
        if(error!= null){
            error.on(null);
        }
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {
        try {
            for (int i = 0; i < keys.length; i++) {
                db.delete(JniDBFactory.bytes(keys[i]));
            }
            if(error!= null){
                error.on(null);
            }
        } catch (Exception e) {
            if(error!=null){
                error.on(e);
            }
        }
    }

    @Override
    public void commit(Callback<Throwable> error) {
        try {
            db.write(db.createWriteBatch());
            if(error!=null){
                error.on(null);
            }
        } catch (Exception e) {
            if(error!= null){
                error.on(e);
            }
        }
    }

    @Override
    public void close(Callback<Throwable> error) {
        db.write(db.createWriteBatch());
        try {
            db.close();
            if(error!=null){
                error.on(null);
            }
        } catch (IOException e) {
            if(error!=null){
                error.on(e);
            }
        }
    }
}

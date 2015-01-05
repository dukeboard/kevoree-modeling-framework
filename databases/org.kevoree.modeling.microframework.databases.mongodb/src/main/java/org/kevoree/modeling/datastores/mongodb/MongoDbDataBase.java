package org.kevoree.modeling.datastores.mongodb;

import com.mongodb.*;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.KDataBase;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

public class MongoDbDataBase implements KDataBase {

    private DB db = null;
    private MongoClient mongoClient = null;


    public MongoDbDataBase(String host, Integer port, String dbName) throws UnknownHostException {
        mongoClient = new MongoClient(host, port);
        db = mongoClient.getDB(dbName);
    }

    private static final String KMF_COL = "kmfall";

    private static final String KMF_KEY = "@key";

    private static final String KMF_VAL = "@val";

    @Override
    public void get(String[] keys, ThrowableCallback<String[]> callback) {
        String[] result = new String[keys.length];
        DBCollection table = db.getCollection(KMF_COL);
        for (int i = 0; i < result.length; i++) {
            BasicDBObject searchQuery = new BasicDBObject();
            searchQuery.put(KMF_KEY, keys[i]);
            DBCursor cursor = table.find(searchQuery);
            if (cursor.count() == 1) {
                result[i] = cursor.next().toString();
            }
        }
        if (callback != null) {
            callback.on(result, null);
        }
    }

    @Override
    public void put(String[][] payloads, Callback<Throwable> error) {
        DBCollection table = db.getCollection(KMF_COL);
        List<DBObject> objs = new ArrayList<DBObject>();
        for (int i = 0; i < payloads.length; i++) {
            BasicDBObject obj = new BasicDBObject();
            obj.put(KMF_KEY, payloads[i][0]);
            obj.put(KMF_VAL, payloads[i][1]);
            objs.add(obj);
        }
        table.aggregate(objs);
        if (error != null) {
            error.on(null);
        }
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {
        if (error != null) {
            error.on(null);
        }
    }

    @Override
    public void commit(Callback<Throwable> error) {
        if (error != null) {
            error.on(null);
        }
    }

    @Override
    public void close(Callback<Throwable> error) {
        if (mongoClient != null) {
            mongoClient.close();
        }
        if (error != null) {
            error.on(null);
        }
    }

    @Override
    public void connect(Callback<Throwable> callback) {
        //noop
        if (callback != null) {
            callback.on(null);
        }
    }

}

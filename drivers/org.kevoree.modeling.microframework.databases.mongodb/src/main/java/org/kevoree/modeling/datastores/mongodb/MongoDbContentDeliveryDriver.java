package org.kevoree.modeling.datastores.mongodb;

import com.mongodb.*;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;

import java.net.UnknownHostException;

public class MongoDbContentDeliveryDriver implements KContentDeliveryDriver {

    private DB db = null;
    private MongoClient mongoClient = null;


    public MongoDbContentDeliveryDriver(String host, Integer port, String dbName) throws UnknownHostException {
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
                DBObject objectResult = cursor.next();
                result[i] = objectResult.get(KMF_VAL).toString();
            }
        }
        if (callback != null) {
            callback.on(result, null);
        }
    }

    @Override
    public void put(String[][] payloads, Callback<Throwable> error) {
        DBCollection table = db.getCollection(KMF_COL);

        for (int i = 0; i < payloads.length; i++) {

            BasicDBObject originalObjectQuery = new BasicDBObject();
            originalObjectQuery.put(KMF_KEY, payloads[i][0]);

            BasicDBObject newValue = new BasicDBObject();
            newValue.append(KMF_KEY, payloads[i][0]);
            newValue.append(KMF_VAL, payloads[i][1]);
            
            table.update(originalObjectQuery, newValue, true, false);
        }
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

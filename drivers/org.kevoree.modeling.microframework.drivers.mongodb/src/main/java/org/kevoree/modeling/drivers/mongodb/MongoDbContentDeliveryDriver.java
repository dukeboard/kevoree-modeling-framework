package org.kevoree.modeling.drivers.mongodb;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import org.kevoree.modeling.*;
import org.kevoree.modeling.memory.KContentDeliveryDriver;
import org.kevoree.modeling.memory.KContentKey;
import org.kevoree.modeling.memory.KDataManager;
import org.kevoree.modeling.memory.cdn.AtomicOperation;
import org.kevoree.modeling.memory.cdn.KContentPutRequest;
import org.kevoree.modeling.msg.KMessage;
import org.kevoree.modeling.util.LocalEventListeners;

import java.net.UnknownHostException;

public class MongoDbContentDeliveryDriver implements KContentDeliveryDriver {

    private DB db = null;
    private MongoClient mongoClient = null;
    private DBCollection table = null;

    private String host = null;
    private Integer port = null;
    private String dbName = null;

    public MongoDbContentDeliveryDriver(String host, Integer port, String dbName) throws UnknownHostException {
        this.host = host;
        this.port = port;
        this.dbName = dbName;
    }

    private static final String KMF_COL = "kmfall";

    private static final String KMF_KEY = "@key";

    private static final String KMF_VAL = "@val";

    @Override
    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback) {
        BasicDBObject searchQuery = new BasicDBObject();
        searchQuery.put(KMF_KEY, key.toString());
        DBCursor cursor = table.find(searchQuery);
        String previous = "0";
        if (cursor.count() > 1) {
            DBObject objectResult = cursor.next();
            previous = objectResult.get(KMF_VAL).toString();
        }
        String mutated = operation.mutate(previous);
        BasicDBObject newValue = new BasicDBObject();
        newValue.append(KMF_KEY, key.toString());
        newValue.append(KMF_VAL, mutated);
        table.update(searchQuery, newValue, true, false);
        callback.on(previous, null);
    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        String[] result = new String[keys.length];
        for (int i = 0; i < result.length; i++) {
            BasicDBObject searchQuery = new BasicDBObject();
            searchQuery.put(KMF_KEY, keys[i].toString());
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
    public void put(KContentPutRequest request, Callback<Throwable> error) {
        for (int i = 0; i < request.size(); i++) {
            BasicDBObject originalObjectQuery = new BasicDBObject();
            originalObjectQuery.put(KMF_KEY, request.getKey(i).toString());
            BasicDBObject newValue = new BasicDBObject();
            newValue.append(KMF_KEY, request.getKey(i).toString());
            newValue.append(KMF_VAL, request.getContent(i));
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
    public void close(Callback<Throwable> error) {
        if (mongoClient != null) {
            mongoClient.close();
        }
        mongoClient = null;
        db = null;
        table = null;
        if (error != null) {
            error.on(null);
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

    @Override
    public void connect(Callback<Throwable> callback) {
        mongoClient = new MongoClient(host, port);
        db = mongoClient.getDB(dbName);
        table = db.getCollection(KMF_COL);
        if (callback != null) {
            callback.on(null);
        }
    }

}

package org.kevoree.modeling.datastores.mongodb;

import com.mongodb.*;
import jet.runtime.typeinfo.JetValueParameter;
import org.bson.BSON;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.events.ModelEvent;
import org.kevoree.modeling.api.persistence.DataStore;

import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Aymeric Heriveu on 8/4/14.
 */
public class MongoDBDataStore implements DataStore {
    /*
    A segment is a collection
    Each collection has a set of key / values
    A bulk is gathering for each segment write/del operations

     */

    private MongoClient mongoClient = null;
    private DB db = null;
    HashMap<String, BulkWriteOperation> bwomap = null;


    public MongoDBDataStore(String host, int port, String _db) {

        try {
            mongoClient = new MongoClient(host, port);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        db = mongoClient.getDB(_db);
        bwomap = new HashMap<String, BulkWriteOperation>();

    }

    public MongoDBDataStore(String _db) {
        try {
            mongoClient = new MongoClient("localhost", 27017);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        db = mongoClient.getDB(_db);
        bwomap = new HashMap<String, BulkWriteOperation>();
    }

    private BulkWriteOperation getBulkWriteOperation(String segment) {
        if (bwomap.containsKey(segment)) {
            return bwomap.get(segment);
        } else {
            DBCollection collection = db.getCollection(segment);
            if (collection == null) {
                return null;
            } else {
                BulkWriteOperation bwo = collection.initializeOrderedBulkOperation();
                bwomap.put(segment, bwo);
                return bwo ;
            }
        }
    }



    @Override
    public void put(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2, @JetValueParameter(name = "value") @NotNull String s3) {
      DBCollection collection =  db.getCollection(s) ;
      if(collection == null){
          db.createCollection(s, new BasicDBObject(s2,s3));
      }else{

          BasicDBObject dbo = new BasicDBObject(s2,s3) ;
          BulkWriteOperation bwo = getBulkWriteOperation(s);
          bwo.insert(dbo);
      }
    }

    @Nullable
    @Override
    public String get(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2) {

        BasicDBObject query = new BasicDBObject();
        BasicDBObject field = new BasicDBObject(s2,1);

        DBCollection collection =  db.getCollection(s) ;
        DBCursor cursor = collection.find(query,field) ;

        if (cursor.hasNext()) {
            DBObject dob = cursor.next();
            if(dob.get(s2) != null)
            {
               return dob.get(s2).toString();
            }
           else{
               return null ;
            }
        }
        else{
            return null ;
        }
    }

    @Override
    public void remove(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2) {
        BasicDBObject query = new BasicDBObject();
        BasicDBObject field = new BasicDBObject(s2,1);
        DBCollection collection =  db.getCollection(s) ;
        DBCursor cursor = collection.find(query,field) ;
        if(cursor.hasNext()) {
            DBObject dob  = cursor.next() ;
            BulkWriteOperation bwo = getBulkWriteOperation(s);
            bwo.find(dob).remove();
            }
        }

    @Override
    public void commit() {

        Set<String> keys = bwomap.keySet() ;
        for (String key : keys) {
            BulkWriteOperation bwo = bwomap.get(key);

            // Ugly catch to prevent crash. MongoDB APi do prevent a
            //Exception in thread "main" java.lang.IllegalStateException: no operations
            // mongoDB java driver doesn't permit to access to the list of operations
            try{
                //1 = Wait for acknowledgement, but don't wait for secondaries to replicate
                bwo.execute(new WriteConcern(1)) ;

                // reinitializing the bulk object
                bwomap.put(key,db.getCollection(key).initializeOrderedBulkOperation());
                }catch(Exception e)
            {

            }


        }

    }

    @Override
    public void close() {
        commit() ;
        mongoClient.close();
    }

    @NotNull
    @Override
    public Set<String> getSegments() {
          return db.getCollectionNames() ;
    }

    @NotNull
    @Override
    public Set<String> getSegmentKeys(@JetValueParameter(name = "segment") @NotNull String s) {
        Set<String> res = new HashSet<String>() ;
        Set<String> keys = bwomap.keySet() ;
        for (String key : keys) {
            if(key.contains(s)){
                res.add(key) ;
            }
        }
        return res ;
    }

    @Override
    public void notify(@JetValueParameter(name = "event") @NotNull ModelEvent modelEvent) {
        //TODO leveraging Memory or MongoDB PubSub
    }

    @Override
    public void register(@JetValueParameter(name = "listener") @NotNull ModelElementListener modelElementListener, @JetValueParameter(name = "from", type = "?") @Nullable Long aLong, @JetValueParameter(name = "to", type = "?") @Nullable Long aLong2, @JetValueParameter(name = "path") @NotNull String s) {}

    @Override
    public void unregister(@JetValueParameter(name = "listener") @NotNull ModelElementListener modelElementListener) {}

}

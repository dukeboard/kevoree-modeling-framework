package org.kevoree.modeling.datastores.mongodb;

/**
 * Created by Aymeric on 30/09/2014.
 */
public class mongoDBtester {

    public static void main(String[] Args){
        MongoDBDataStore mdb = new MongoDBDataStore("test3") ;
        mdb.put("seg","va","18");
        mdb.commit();
        System.out.println(mdb.get("seg","va"));
        mdb.remove("seg","va");
        mdb.commit();
        System.out.println(mdb.get("seg","va"));
        mdb.commit();
    }
}
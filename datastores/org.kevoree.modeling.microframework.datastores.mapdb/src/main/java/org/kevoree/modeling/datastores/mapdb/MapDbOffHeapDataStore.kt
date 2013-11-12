package org.kevoree.modeling.datastores.leveldb

import org.kevoree.modeling.api.persistence.DataStore
import org.mapdb.DB
import org.mapdb.DBMaker

public class MapDbOffHeapDataStore() : DataStore {

    var db: DB

    {
        db = DBMaker.newDirectMemoryDB()!!.make()!!
    }

    private val dbs = java.util.HashMap<String, MutableMap<String, String>>()

    private fun internal_db(segment: String): MutableMap<String, String> {
        var cache: MutableMap<String, String>? = null
        if(dbs.containsKey(segment)) {
            cache = dbs.get(segment)
        } else {
            cache = db.getHashMap(segment)
            dbs.put(segment, cache!!)
        }
        return cache!!
    }

    override fun sync() {
        db.commit()
        dbs.clear()
    }

    override fun get(segment: String, key: String): String? {
        val db = internal_db(segment)
        return db.get(segment)
    }

    override fun remove(segment: String, key: String) {
        val db = internal_db(segment)
        db.remove(key)
    }

    override fun put(segment: String, key: String, value: String) {
        val db = internal_db(segment)
        db.put(key, value)
    }

}
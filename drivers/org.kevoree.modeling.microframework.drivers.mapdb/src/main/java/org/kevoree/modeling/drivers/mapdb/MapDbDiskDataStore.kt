package org.kevoree.modeling.datastores.leveldb

import org.kevoree.modeling.api.persistence.DataStore
import java.io.File
import org.mapdb.DB
import org.mapdb.DBMaker
import org.kevoree.modeling.api.persistence.EventDispatcher
import org.kevoree.modeling.api.events.ModelElementListener
import org.kevoree.modeling.api.events.ModelEvent
import org.kevoree.modeling.api.persistence.AbstractDataStore

public class MapDbDiskDataStore(directory: File) : AbstractDataStore() {

     override fun getSegmentKeys(segment: String): Set<String> {
        throw UnsupportedOperationException()
    }
    override fun getSegments(): Set<String> {
        throw UnsupportedOperationException()
    }

    var db: DB

    {
        if(!directory.isDirectory()){
            directory.mkdirs()
        }
        db = DBMaker.newFileDB(directory)!!.make()!!
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

    override fun close() {
        db.commit()
        dbs.clear()
    }

    override fun commit() {
        db.commit()
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
package org.kevoree.modeling.datastores.leveldb

import org.kevoree.modeling.api.persistence.DataStore
import org.mapdb.DB
import org.mapdb.DBMaker
import org.kevoree.modeling.api.persistence.EventDispatcher
import org.kevoree.modeling.api.events.ModelElementListener
import org.kevoree.modeling.api.events.ModelEvent

public class MapDbOffHeapDataStore() : DataStore {

    private val selector = EventDispatcher()

    override fun register(listener: ModelElementListener, from: Long?, to: Long?, path: String) {
        selector.register(listener, from, to, path)
    }

    override fun unregister(listener: ModelElementListener) {
        selector.unregister(listener)
    }

    override fun notify(event: ModelEvent) {
        selector.dispatch(event)
    }

    override fun getSegmentKeys(segment: String): Set<String> {
        throw UnsupportedOperationException()
    }

    override fun getSegments(): Set<String> {
        throw UnsupportedOperationException()
    }

    var db: DB

    {
        db = DBMaker.newDirectMemoryDB()!!.make()!!
    }

    private val dbs = java.util.HashMap<String, MutableMap<String, String>>()

    private fun internal_db(segment: String): MutableMap<String, String> {
        var cache: MutableMap<String, String>? = null
        if (dbs.containsKey(segment)) {
            cache = dbs.get(segment)
        } else {
            cache = db.getHashMap(segment)
            dbs.put(segment, cache!!)
        }
        return cache!!
    }

    override fun commit() {
        db.commit()
    }

    override fun close() {
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
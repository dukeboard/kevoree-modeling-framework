package org.kevoree.modeling.datastores.leveldb

import org.fusesource.leveldbjni.JniDBFactory
import org.iq80.leveldb.DB
import org.kevoree.modeling.api.persistence.DataStore
import java.io.File
import org.iq80.leveldb.Options
import org.iq80.leveldb.DBIterator
import java.util.HashSet
import org.kevoree.modeling.api.persistence.EventDispatcher
import org.kevoree.modeling.api.events.ModelElementListener
import org.kevoree.modeling.api.events.ModelEvent

/**
 * Created with IntelliJ IDEA.
 * User: thomas.hartmann
 * Date: 11/7/13
 * Time: 2:37 PM
 */
public class LevelDbDataStore(val dbStorageBasePath: String) : DataStore {

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

    override fun getSegments(): Set<String> {
        val parent = File(dbStorageBasePath)
        if (parent.exists() && parent.isDirectory()) {
            var childs = HashSet<String>()
            for (child in parent.listFiles()?.iterator()) {
                if (child.isDirectory()) {
                    childs.add(child.name)
                }

            }
            return childs
        }
        return dbs.keySet();
    }

    override fun getSegmentKeys(segment: String): Set<String> {
        return keys(segment).toSet();
    }

    {
        val location = File(dbStorageBasePath)
        if (!location.exists()) {
            location.mkdirs()
        }
    }


    private val options = Options().createIfMissing(true)
    private val dbs = java.util.HashMap<String, DB>()

    private fun internal_db(segment: String): DB {
        var db: DB?
        if (dbs.containsKey(segment)) {
            db = dbs.get(segment)
        } else {
            db = JniDBFactory.factory.open(File(dbStorageBasePath + File.separator + segment), options)
            dbs.put(segment, db!!)
        }
        return db!!
    }

    override fun sync() {
        for (db in dbs.values()) {
            db.write(db.createWriteBatch())
            db.close()
        }
        dbs.clear()
    }

    override fun get(segment: String, key: String): String? {
        val db = internal_db(segment)
        return JniDBFactory.asString(db.get(JniDBFactory.bytes(key)))
    }

    override fun remove(segment: String, key: String) {
        val db = internal_db(segment)
        db.delete(JniDBFactory.bytes(key))
    }

    override fun put(segment: String, key: String, value: String) {
        val db = internal_db(segment)
        db.put(JniDBFactory.bytes(key), JniDBFactory.bytes(value))
    }

    fun keys(segment: String): List<String> {
        val keys = java.util.ArrayList<String>()

        var it: DBIterator? = null
        try {
            val db = internal_db(segment)
            it = db.iterator()
            it!!.seekToFirst()
            while (it!!.hasNext()) {
                val key = JniDBFactory.asString(it!!.next().getKey())
                keys.add(key!!)
            }
        } finally {
            it!!.close()
        }
        return keys
    }

    fun values(segment: String): List<String> {
        val values = java.util.ArrayList<String>()

        var it: DBIterator? = null
        try {
            val db = internal_db(segment)
            it = db.iterator()
            it!!.seekToFirst()
            for (item in it) {
                val value = JniDBFactory.asString(it!!.peekNext()!!.getValue())
                values.add(value!!)
            }
        } finally {
            it!!.close()
        }
        return values
    }

    fun statistics(segment: String): String? {
        val db = dbs.get(segment)
        return db?.getProperty("leveldb.stats")
    }

}
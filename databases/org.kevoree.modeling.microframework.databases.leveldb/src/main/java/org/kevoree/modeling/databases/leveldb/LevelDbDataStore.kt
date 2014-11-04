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
import org.kevoree.modeling.api.persistence.AbstractDataStore

/**
 * Created with IntelliJ IDEA.
 * User: thomas.hartmann
 * Date: 11/7/13
 * Time: 2:37 PM
 */
public class LevelDbDataStore(val dbStorageBasePath: String) : AbstractDataStore() {

    {
        val location = File(dbStorageBasePath)
        if (!location.exists()) {
            location.mkdirs()
        }
    }

    override fun commit() {
        for (db in dbs.values()) {
            db.write(db.createWriteBatch())
        }
    }

    override fun close() {
        for (db in dbs.values()) {
            db.write(db.createWriteBatch())
            db.close()
        }
        dbs.clear()
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

    private val options = Options().createIfMissing(true)
    private val dbs = java.util.HashMap<String, DB>()

    private fun internal_db(segment: String, create: Boolean): DB? {
        if (dbs.containsKey(segment)) {
            return dbs.get(segment)
        } else {
            val f = File(dbStorageBasePath + File.separator + segment)
            if (!create) {
                if (!f.exists()) {
                    return null
                }
            }
            val db = JniDBFactory.factory.open(f, options)
            dbs.put(segment, db!!)
            return db
        }
    }

    override fun get(segment: String, key: String): String? {
        val db = internal_db(segment, false)
        if (db != null) {
            return JniDBFactory.asString(db.get(JniDBFactory.bytes(key)))
        } else {
            return null
        }
    }

    override fun remove(segment: String, key: String) {
        val db = internal_db(segment, false)
        db?.delete(JniDBFactory.bytes(key))
    }

    override fun put(segment: String, key: String, value: String) {
        val db = internal_db(segment, true)
        db!!.put(JniDBFactory.bytes(key), JniDBFactory.bytes(value))
    }

    fun keys(segment: String): List<String> {
        val keys = java.util.ArrayList<String>()
        var it: DBIterator? = null
        try {
            val db = internal_db(segment, false)
            it = db?.iterator()
            val itt = it
            if (itt != null) {
                itt.seekToFirst()
                while (itt.hasNext()) {
                    val key = JniDBFactory.asString(itt.next().getKey())
                    keys.add(key!!)
                }
            }
        } finally {
            it?.close()
        }
        return keys
    }

    fun values(segment: String): List<String> {
        val values = java.util.ArrayList<String>()
        var it: DBIterator? = null
        try {
            val db = internal_db(segment,false)
            it = db?.iterator()
            val itt = it
            if(itt != null){
                itt.seekToFirst()
                for (item in itt) {
                    val value = JniDBFactory.asString(itt.peekNext()!!.getValue())
                    values.add(value!!)
                }
            }

        } finally {
            it?.close()
        }
        return values
    }

    fun statistics(segment: String): String? {
        val db = dbs.get(segment)
        return db?.getProperty("leveldb.stats")
    }

}
package org.kevoree.modeling.api.persistence

import java.util.HashMap
import java.util.HashSet

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 15:32
 */

public open class MemoryDataStore : DataStore {

    override fun getSegmentKeys(segment: String): Set<String> {
        if (maps.containsKey(segment)) {
            maps.get(segment)!!.keySet()
        }
        return HashSet<String>()
    }

    override fun getSegments(): Set<String> {
        return maps.keySet()
    }

    override fun sync() {
    }

    var maps = HashMap<String, HashMap<String, String>>()

    private fun getOrCreateSegment(segment: String): HashMap<String, String> {
        if (!maps.containsKey(segment)) {
            maps.put(segment, HashMap<String, String>())
        }
        return maps.get(segment)!!
    }

    override fun put(segment: String, key: String, value: String) {

        //println("put/"+segment+"_"+key+"="+value)

        getOrCreateSegment(segment).put(key, value)
    }
    override fun get(segment: String, key: String): String? {
        return getOrCreateSegment(segment).get(key)
    }

    override fun remove(segment: String, key: String) {
        getOrCreateSegment(segment).remove(key)
    }

    fun dump() {
        for (k in maps) {
            println("Map ${k.key}")
            for (t in k.value) {
                println("${t.key}->${t.value}")
            }
        }
    }


}
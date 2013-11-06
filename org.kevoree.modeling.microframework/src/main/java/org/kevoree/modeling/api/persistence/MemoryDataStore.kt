package org.kevoree.modeling.api.persistence

import java.util.HashMap

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 15:32
 */

public class MemoryDataStore : DataStore {

    var maps = HashMap<String, HashMap<String, String>>()

    private fun getOrCreateSegment(segment: String): HashMap<String, String> {
        if(!maps.containsKey(segment)){
            maps.put(segment, HashMap<String, String>())
        }
        return maps.get(segment)!!
    }

    override fun put(segment: String, key: String, value: String) {
        getOrCreateSegment(segment).put(key, value)
    }
    override fun get(segment: String, key: String): String? {
        return getOrCreateSegment(segment).get(key)
    }


}
package org.kevoree.modeling.api.persistence

import java.util.HashMap

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 15:32
 */

public class MemoryDataStore : DataStore {

    var map = HashMap<String,String>()

    override fun put(key: String, value: String) {
        map.put(key,value)
    }
    override fun get(key: String): String? {
       return map.get(key)
    }


}
package org.kevoree.modeling.api.persistence

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:30
 */

public trait DataStore {

    fun put(segment : String,key: String, value: String)

    fun get(segment : String,key: String): String?

    fun remove(segment : String,key: String)
}
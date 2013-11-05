package org.kevoree.modeling.api.persistence

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:30
 */

public trait DataStore {

    fun put(key: String, value: String)

    fun get(key: String): String?

}
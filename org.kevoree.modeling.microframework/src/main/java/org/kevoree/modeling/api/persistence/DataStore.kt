package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.events.ModelEvent
import org.kevoree.modeling.api.events.ModelElementListener
import org.kevoree.modeling.api.Callback

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:30
 */

public trait DataStore {

    fun put(key: String, value: String, callback : Callback<String>, error : Callback<Exception>)

    fun get(key: String, callback : Callback<String>, error : Callback<Exception>)

    fun remove(key: String, callback : Callback<String>, error : Callback<Exception>)

    fun commit(callback : Callback<String>, error : Callback<Exception>)

    fun close(callback : Callback<String>, error : Callback<Exception>)

    fun notify(event: ModelEvent)

    fun register(listener: org.kevoree.modeling.api.events.ModelElementListener, from: Long?, to: Long?, path: String)

    fun unregister(listener: org.kevoree.modeling.api.events.ModelElementListener)

}
package org.kevoree.modeling.api

import org.kevoree.modeling.api.events.ModelElementListener

/**
 * Created by duke on 9/30/14.
 */

public trait Manager {

    fun create(): Dimension
    fun get(key: String)
    fun saveAll(callback: Callback<Boolean>)
    fun deleteAll(callback: Callback<Boolean>)
    fun unloadAll(callback: Callback<Boolean>)


    fun listen(listener: ModelElementListener, from: Long?, to: Long?, path: String)
    fun disable(listener: ModelElementListener)
    fun stream(query: String, callback: Callback<KObject<*>>)

}
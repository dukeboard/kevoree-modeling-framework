package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.events.ModelEvent
import org.kevoree.modeling.api.events.ModelElementListener

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:30
 */

public trait DataStore {

    fun put(segment: String, key: String, value: String)

    fun get(segment: String, key: String): String?

    fun remove(segment: String, key: String)

    fun commit()

    fun close()

    fun getSegments(): Set<String>

    fun getSegmentKeys(segment: String): Set<String>

    fun notify(event: ModelEvent)

    fun register(listener: org.kevoree.modeling.api.events.ModelElementListener, from: Long?, to: Long?, path: String)

    fun unregister(listener: org.kevoree.modeling.api.events.ModelElementListener)

}
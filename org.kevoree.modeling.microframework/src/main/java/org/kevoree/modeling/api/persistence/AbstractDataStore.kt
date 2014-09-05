package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.events.ModelElementListener
import org.kevoree.modeling.api.events.ModelEvent

/**
 * Created by gregory.nain on 05/09/2014.
 */


public abstract class AbstractDataStore : DataStore {

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

}




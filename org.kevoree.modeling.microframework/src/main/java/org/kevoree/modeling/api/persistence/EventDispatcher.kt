package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.events.ModelElementListener
import java.util.HashMap
import org.kevoree.modeling.api.events.ModelEvent
import org.kevoree.modeling.api.time.TimeAwareKMFContainer

/**
 * Created by duke on 8/22/14.
 */

class EventDispatcher {

    private var listeners = HashMap<ModelElementListener, TimedRegistration>()

    fun register(listener: ModelElementListener, from: Long?, to: Long?, pathRegex: String) {
        listeners.put(listener, TimedRegistration(from, to, pathRegex))
    }

    fun unregister(listener: ModelElementListener) {
        listeners.remove(listener)
    }

    fun dispatch(event: ModelEvent) {
        for (l in listeners) {
            if (l.value.covered(event)) {
                l.key.elementChanged(event)
            }
        }
    }

    fun clear() {
        listeners.clear()
    }

}

data class TimedRegistration(val from: Long?, val to: Long?, val pathRegex: String) {

    fun covered(event: ModelEvent): Boolean {
        if (event.source is TimeAwareKMFContainer<*>) {
            if (from != null) {
                if (from < event.source.now) {
                    return false
                }
            }
            if (to != null) {
                if (to < event.source.now) {
                    return false
                }
            }
        }
        if (event.source != null) {
            if (pathRegex.contains("*")) {
                var regexPath = pathRegex.replace("*", ".*")
                return event.source.path().matches(regexPath)
            } else {
                return event.source.path().equals(pathRegex)
            }
        } else {
            return false
        }
    }

}

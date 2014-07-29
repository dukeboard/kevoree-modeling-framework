package org.kevoree.modeling.api.time.blob

import java.util.HashMap
import org.kevoree.modeling.api.time.TimeView
import org.kevoree.modeling.api.time.TimePoint
import java.util.concurrent.ConcurrentHashMap

/**
 * Created by duke on 7/24/14.
 */

public class SharedCache<A> {

    private var times = HashMap<TimePoint, TimeView<A>>()
    var timeCache: MutableMap<String, TimeMeta> = ConcurrentHashMap<String, TimeMeta>()

    fun add(tp: TimePoint, tv: TimeView<A>) {
        times.put(tp, tv)
    }

    fun get(tp: TimePoint): TimeView<A>? {
        return times.get(tp)
    }

    fun drop(tp: TimePoint) {
        times.remove(tp)
    }


    fun keys(): Set<TimePoint> {
        return times.keySet()
    }

    fun flush() {
        times.clear()
        timeCache.clear()
    }

}

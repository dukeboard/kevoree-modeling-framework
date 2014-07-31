package org.kevoree.modeling.api.time.blob

import java.util.HashMap
import org.kevoree.modeling.api.time.TimeView
import java.util.concurrent.ConcurrentHashMap

/**
 * Created by duke on 7/24/14.
 */

public class SharedCache {

    private var times = HashMap<Long, TimeView>()
    var timeCache: MutableMap<String, TimeMeta> = ConcurrentHashMap<String, TimeMeta>()

    fun add(tp: Long, tv: TimeView) {
        times.put(tp, tv)
    }

    fun get(tp: Long): TimeView? {
        return times.get(tp)
    }

    fun drop(tp: Long) {
        times.remove(tp)
    }


    fun keys(): Set<Long> {
        return times.keySet()
    }

    fun flush() {
        times.clear()
        timeCache.clear()
    }

}

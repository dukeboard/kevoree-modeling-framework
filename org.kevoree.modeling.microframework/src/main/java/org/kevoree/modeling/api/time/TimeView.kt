package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.KMFContainer

/**
 * Created by duke on 6/11/14.
 */

public trait TimeView<A> {

    fun now(): TimePoint?

    fun time(tp: TimePoint): TimeView<A>

    fun time(tps : String): TimeView<A>

    fun lookup(path: String): KMFContainer?

    fun commit()

    fun rollback()

    fun factory(): A {
        return this as A
    }


    public fun globalFloor(tp: TimePoint?): TimePoint?

    public fun globalCeil(tp: TimePoint?): TimePoint?

    public fun globalLatest(): TimePoint?

    fun create(metaTypeName: String): KMFContainer?

    fun entities() : List<KMFContainer>

}
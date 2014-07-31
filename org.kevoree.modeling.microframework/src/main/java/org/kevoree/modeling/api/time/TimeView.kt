package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.trace.TraceSequence

/**
 * Created by duke on 6/11/14.
 */

public trait TimeView {

    fun now(): Long

    fun lookup(path: String): KMFContainer?

    public fun globalFloor(tp: Long?): Long?

    public fun globalCeil(tp: Long?): Long?

    public fun globalLatest(): Long?

    fun create(metaTypeName: String): KMFContainer?

    fun modified(): Set<String>

    fun delete()

    fun diff(other: TimeView): TraceSequence

    fun select(query: String): List<KMFContainer>

    fun root(elem: KMFContainer)

}
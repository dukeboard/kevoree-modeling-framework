package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.KObject
import org.kevoree.modeling.api.trace.TraceSequence

/**
 * Created by duke on 6/11/14.
 */

public trait TimeView {

    fun now(): Long

    fun lookup(path: String): KObject?

    fun create(metaTypeName: String): KObject?

    fun modified(): Set<String>

    fun delete()

    fun diff(other: TimeView): TraceSequence

    fun select(query: String): List<KObject>

    fun root(elem: KObject)

}
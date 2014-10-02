package org.kevoree.modeling.api

import org.kevoree.modeling.api.time.TimeView
import org.kevoree.modeling.api.time.TimeTree

/**
 * Created by duke on 9/30/14.
 */

public trait Dimension {
    fun key(): String
    fun parent(callback: Callback<Dimension?>)
    fun children(callback: Callback<Set<Dimension>>)
    fun fork(callback: Callback<Dimension?>)
    fun save(callback: Callback<Boolean>)
    fun delete(callback: Callback<Boolean>)
    fun unload(callback: Callback<Boolean>)

    fun time(timePoint: Long): TimeView
    fun globalTimeTree(): TimeTree
    fun timeTree(path: String): TimeTree

}

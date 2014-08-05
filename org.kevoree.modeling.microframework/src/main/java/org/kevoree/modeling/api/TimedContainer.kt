package org.kevoree.modeling.api

import org.kevoree.modeling.api.time.TimeTree

/**
 * Created by duke on 8/5/14.
 */

trait TimedContainer<A> : org.kevoree.modeling.api.KMFContainer {

    fun previous(): A?

    fun next(): A?

    fun last(): A?

    fun first(): A?

    fun jump(time: Long): A?

    fun timeTree(): TimeTree

}
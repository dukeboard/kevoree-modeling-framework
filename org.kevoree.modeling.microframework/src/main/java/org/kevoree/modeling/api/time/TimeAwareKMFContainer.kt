package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.KMFContainer

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:01
 */

public trait TimeAwareKMFContainer : KMFContainer {

    fun shift(timePoint : TimePoint)

    fun deepShift(timePoint : TimePoint)

    var now : TimePoint

    fun previous() : KMFContainer

    fun next() : KMFContainer

}
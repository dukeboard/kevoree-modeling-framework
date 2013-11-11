package org.kevoree.modeling.api.time

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:35
 */

trait TimeAwareKMFFactory {

    fun lookup(timepoint: TimePoint, path: String): TimeAwareKMFContainer

}

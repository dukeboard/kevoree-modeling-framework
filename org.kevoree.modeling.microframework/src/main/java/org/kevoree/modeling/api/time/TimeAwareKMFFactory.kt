package org.kevoree.modeling.api.time

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:35
 */

trait TimeAwareKMFFactory {

    fun lookupTimeAware(timepoint: TimePoint, path: String): TimeAwareKMFContainer

}

package org.kevoree.modeling.api.time

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 14/11/2013
 * Time: 19:27
 */

enum class TimeSegment {
    RAW
    ENTITYMETA
    TIMEMETA
    ENTITIES
}

object TimeSegmentConst {
    val GLOBAL_TIMEMETA = "#global"
}
package org.kevoree.modeling.api.time

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:02
 */

public data class TimePoint(val timestamp: Long, val sequenceNumber: Long = 0) : Comparable<TimePoint> {

    override fun compareTo(other: TimePoint): Int {
        if(this == other){
            return 0
        }
        if(timestamp == other.timestamp){
            return sequenceNumber.compareTo(other.sequenceNumber)
        } else {
            return timestamp.compareTo(other.timestamp)
        }
    }

    public fun shift(timeOffset: Long): TimePoint {
        return TimePoint(timestamp + timeOffset, 0)
    }

    override fun toString(): String {
        return "$timestamp:$sequenceNumber"
    }

    class object {
        fun create(v: String): TimePoint {
            val vv = v.split(":")
            if(vv.size == 2){
                return TimePoint(java.lang.Long.parseLong(vv.get(0)), java.lang.Long.parseLong(vv.get(1)))
            } else {
                if(vv.size == 1){
                    return TimePoint(java.lang.Long.parseLong(vv.get(0)), 0)
                } else {
                    throw Exception("Bad format "+v)
                }
            }

        }
    }

}

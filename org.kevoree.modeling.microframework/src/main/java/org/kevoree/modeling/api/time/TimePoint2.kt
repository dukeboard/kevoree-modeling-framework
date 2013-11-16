package org.kevoree.modeling.api.time

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:02
 */

public data class TimePoint2(val timestamp: Long, val sequenceNumber: Long) : Comparable<TimePoint2> {

    override fun compareTo(other: TimePoint2): Int {
        if(this == other){
            return 0
        }
        if(timestamp == other.timestamp){
            return sequenceNumber.compareTo(other.sequenceNumber)
        } else {
            return timestamp.compareTo(other.timestamp)
        }
    }

    public fun shift(timeOffset: Long): TimePoint2 {
        return TimePoint2(timestamp + timeOffset, 0)
    }

    fun toString(): String {
        return "$timestamp:$sequenceNumber"
    }

    class object {
        fun create(v: String): TimePoint2 {
            val vv = v.split(":")
            return TimePoint2(java.lang.Long.parseLong(vv.get(0)), java.lang.Long.parseLong(vv.get(1)))
        }
    }

}

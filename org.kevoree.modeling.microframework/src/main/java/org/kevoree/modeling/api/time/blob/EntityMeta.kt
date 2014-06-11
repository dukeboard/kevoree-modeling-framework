package org.kevoree.modeling.api.time.blob

import org.kevoree.modeling.api.time.TimePoint

/**
 * Created by duke on 6/4/14.
 */

/*
 *  key : timepoint+path
  * */

class EntityMeta() {

    var previous: TimePoint? = null
    var next: TimePoint? = null
    var lastestPersisted: TimePoint? = null
    var metatype: String? = null

    val sep = "/"

    override fun toString(): String {
        val buidler = StringBuilder()
        if (previous != null) {
            buidler.append(previous)
        }
        buidler.append(sep)
        if (next != null) {
            buidler.append(next)
        }
        buidler.append(sep)
        if (lastestPersisted != null) {
            buidler.append(lastestPersisted)
        }
        buidler.append(sep)
        buidler.append(metatype)
        return buidler.toString()
    }

    fun load(payload: String) {
        val elem = payload.split(sep)
        if (elem.size == 4) {
            val previousPayload = elem.get(0)
            if(previousPayload != ""){
                previous = TimePoint.create(previousPayload)
            }
            val nextPayload = elem.get(1)
            if(nextPayload != ""){
                next = TimePoint.create(nextPayload)
            }
            val originPayload = elem.get(2)
            if(originPayload != ""){
                lastestPersisted = TimePoint.create(originPayload)
            }
            metatype = elem.get(3)
        } else {
            throw Exception("Bad EntityTimeMeta format")
        }
    }

}

package org.kevoree.modeling.api.time.blob

import org.kevoree.modeling.api.time.TimePoint

/**
 * Created by duke on 6/4/14.
 */

/*
 *  key : timepoint+path
  * */

class EntityMeta() {

    //var previous: TimePoint? = null
    //var next: TimePoint? = null
    var lastestPersisted: TimePoint? = null
    var metatype: String? = null

    val sep = "/"

    override fun toString(): String {
        val buidler = StringBuilder()
        buidler.append(lastestPersisted)
        buidler.append(sep)
        buidler.append(metatype)
        return buidler.toString()
    }

    fun load(payload: String) {
        val elem = payload.split(sep)
        if (elem.size == 2) {
            val originPayload = elem.get(0)
            if (originPayload != "") {
                lastestPersisted = TimePoint.create(originPayload)
            }
            metatype = elem.get(1)
        } else {
            throw Exception("Bad EntityTimeMeta format")
        }
    }

}

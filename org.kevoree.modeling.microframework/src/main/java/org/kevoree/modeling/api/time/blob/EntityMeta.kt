package org.kevoree.modeling.api.time.blob

/**
 * Created by duke on 6/4/14.
 */

/*
 *  key : timepoint+path
  * */

class EntityMeta() {

    //var previous: TimePoint? = null
    //var next: TimePoint? = null
    var latestPersisted: Long? = null
    var metatype: String? = null

    val sep = "/"

    override fun toString(): String {
        val buidler = StringBuilder()
        buidler.append(latestPersisted)
        buidler.append(sep)
        buidler.append(metatype)
        return buidler.toString()
    }

    fun load(payload: String) {
        val elem = payload.split(sep)
        if (elem.size == 2) {
            val originPayload = elem.get(0)
            if (originPayload != "") {
                latestPersisted = java.lang.Long.parseLong(originPayload)
            }
            metatype = elem.get(1)
        } else {
            throw Exception("Bad EntityTimeMeta format")
        }
    }

}

package org.kevoree.modeling.api.time.blob

import java.util.HashMap

/**
 * Created by duke on 6/4/14.
 */

/*
 *  key : path
  * */

class EntitiesMeta() {

    var isDirty = false;

    val sep = "#"

    var list = HashMap<String, Boolean>()

    override fun toString(): String {
        val stringBuilder = StringBuilder()
        var isFirst = true
        for (p in list.keySet()) {
            if (!isFirst) {
                stringBuilder.append(sep)
            }
            stringBuilder.append(p);
            isFirst = false;
        }
        return stringBuilder.toString()
    }

    fun load(payload: String) {
        if (payload.equals("")) {
            return;
        }
        //TODO refactor this code for efficiency
        val elements = payload.split(sep)
        for (elem in elements) {
            list.put(elem, true)
        }
        isDirty = false;
    }

}

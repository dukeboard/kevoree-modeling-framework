package org.kevoree.modeling.api.time.blob

import java.util.ArrayList

/**
 * Created by duke on 6/4/14.
 */

/*
 *  key : path
  * */

class EntitiesMeta() {

    val sep = "#"

    var list = ArrayList<String>()

    override fun toString(): String {
        val stringBuilder = StringBuilder()
        var isFirst = true
        for (p in list) {
            if (!isFirst) {
                stringBuilder.append(sep)
            }
            if (p.equals("")) {
                stringBuilder.append("/");
            } else {
                stringBuilder.append(p);

            }
            isFirst = false;
        }
        return stringBuilder.toString()
    }

    fun load(payload: String) {
        if(payload.equals("")){
            return;
        }
        val elements = payload.split(sep)
        for (elem in elements) {
            if(elem.equals("/")){
                list.add("")
            } else {
                list.add(elem)
            }
        }
    }

}

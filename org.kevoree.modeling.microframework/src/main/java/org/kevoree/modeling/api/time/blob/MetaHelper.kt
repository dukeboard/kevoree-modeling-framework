package org.kevoree.modeling.api.time.blob

import java.util.ArrayList
import org.kevoree.modeling.api.time.TimeAwareKMFFactory
import org.kevoree.modeling.api.persistence.PersistenceKMFFactory

/**
 * Created by duke on 6/12/14.
 */

object MetaHelper {

    val sep = "#"
    val sep2 = "$"

    fun serialize(p: java.util.HashMap<org.kevoree.modeling.api.KMFContainer, MutableList<String>>): String {
        val buffer = StringBuilder()
        var isFirst = true
        for (v in p) {
            if (!isFirst) {
                buffer.append(sep)
            }
            buffer.append(v.key)
            if (!v.value.empty) {
                buffer.append(sep2)
                for (v2 in v.value) {
                    buffer.append(v2)
                }
            }
            isFirst = false
        }
        return buffer.toString()
    }

    fun unserialize(p: String, factory: PersistenceKMFFactory): java.util.HashMap<org.kevoree.modeling.api.KMFContainer, MutableList<String>> {
        val result = java.util.HashMap<org.kevoree.modeling.api.KMFContainer, MutableList<String>>()
        val lines = p.split(sep)
        for (l in lines) {
            val elems = l.split(sep2)
            if (elems.size > 1) {
                val payload = ArrayList<String>()
                for (i in 1..elems.size - 1) {
                    payload.add(elems.get(i))
                }
                result.put(factory.lookup(elems.get(0))!!, payload)
            }
        }
        return result
    }

}
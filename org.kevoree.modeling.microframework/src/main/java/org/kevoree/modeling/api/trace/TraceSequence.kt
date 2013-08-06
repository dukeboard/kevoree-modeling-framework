package org.kevoree.modeling.api.trace

import org.kevoree.modeling.api.KMFContainer

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 19:52
 */

trait TraceSequence {

    fun getTraces(): List<ModelTrace>

    fun populate(addtraces: List<ModelTrace>): TraceSequence

    fun populateFromString(addtracesTxt: String): TraceSequence

    fun populateFromStream(inputStream: java.io.InputStream): TraceSequence

    fun exportToString(): String

    fun applyOn(target : KMFContainer) : Boolean

}
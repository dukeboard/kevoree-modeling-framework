package org.kevoree.modeling.api;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 12:03
 * To change this template use File | Settings | File Templates.
 */

trait TraceSequence {

    fun getTraces() : List<ModelTrace>

    fun populate(addtraces : List<ModelTrace>) : TraceSequence

    fun populateFromString(addtracesTxt : String) : TraceSequence

    fun populateFromStream(inputStream : java.io.InputStream) : TraceSequence

    fun exportToString() : String

}
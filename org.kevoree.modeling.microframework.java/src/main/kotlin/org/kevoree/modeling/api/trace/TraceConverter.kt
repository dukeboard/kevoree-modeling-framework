package org.kevoree.modeling.api.trace

/**
 * Created by duke on 09/08/13.
 */

trait TraceConverter {

    fun convert(input : ModelTrace) : ModelTrace

}
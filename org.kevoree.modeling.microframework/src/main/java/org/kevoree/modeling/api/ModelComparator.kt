package org.kevoree.modeling.api


/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 12:05
 * To change this template use File | Settings | File Templates.
 */

trait ModelComparator {

    fun diff(origin: KMFContainer, target: KMFContainer): TraceSequence

    fun inter(origin: KMFContainer, target: KMFContainer): TraceSequence


}
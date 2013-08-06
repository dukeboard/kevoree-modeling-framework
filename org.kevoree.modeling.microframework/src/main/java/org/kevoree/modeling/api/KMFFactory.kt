package org.kevoree.modeling.api

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 21:00
 */

trait KMFFactory {

    fun create(metaClassName : String) : org.kevoree.modeling.api.KMFContainer?

}

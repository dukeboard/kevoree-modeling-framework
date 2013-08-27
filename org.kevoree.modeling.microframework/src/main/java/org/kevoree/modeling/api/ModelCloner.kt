package org.kevoree.modeling.api

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 16:53
 */

trait ModelCloner {

    fun clone<A: org.kevoree.modeling.api.KMFContainer>(o : A) : A?

    fun clone<A: org.kevoree.modeling.api.KMFContainer>(o : A,readOnly : Boolean) : A?

    fun cloneMutableOnly<A: org.kevoree.modeling.api.KMFContainer>(o : A,readOnly : Boolean) : A?

}
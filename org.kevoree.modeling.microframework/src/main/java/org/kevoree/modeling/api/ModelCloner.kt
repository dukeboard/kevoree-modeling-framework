package org.kevoree.modeling.api

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 16:53
 */

trait ModelCloner {

    fun clone<A>(o : A) : A?

    fun clone<A>(o : A,readOnly : Boolean) : A?

    fun cloneMutableOnly<A>(o : A,readOnly : Boolean) : A?

}
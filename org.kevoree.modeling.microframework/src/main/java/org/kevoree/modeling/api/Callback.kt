package org.kevoree.modeling.api

/**
 * Created by duke on 9/29/14.
 */

trait Callback<A> {

    fun on(p: A)

}
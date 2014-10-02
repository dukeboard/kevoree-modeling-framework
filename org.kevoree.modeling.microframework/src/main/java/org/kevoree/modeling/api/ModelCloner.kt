package org.kevoree.modeling.api

/**
 * Created by duke on 9/30/14.
 */

public trait ModelCloner {

    fun clone<A : KObject<*>>(o: A, callback: Callback<A>)

}
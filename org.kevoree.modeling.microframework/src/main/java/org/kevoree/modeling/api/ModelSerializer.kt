package org.kevoree.modeling.api

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:21
 */

public trait ModelSerializer {

    fun serialize(oMS : Any,ostream : java.io.OutputStream)

    fun serialize(oMS : Any) : String?

}
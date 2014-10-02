package org.kevoree.modeling.api

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:21
 */

public trait ModelSerializer {

    fun serializeToStream(model: KObject<*>, raw: java.io.OutputStream, callback: Callback<Boolean>, error: Callback<Exception>)

    fun serialize(model: KObject<*>, callback: Callback<String>, error: Callback<Exception>)

}
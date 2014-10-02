package org.kevoree.modeling.api

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:19
 */

public trait ModelLoader {

    fun loadModelFromString(str: String, callback: Callback<KObject<*>?>, error: Callback<Exception>)

    fun loadModelFromStream(inputStream: java.io.InputStream, callback: Callback<KObject<*>?>, error: Callback<Exception>)

}
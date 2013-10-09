package org.kevoree.modeling.api

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:19
 */

public trait ModelLoader {

    fun loadModelFromString(str: String) : List<KMFContainer>?

    fun loadModelFromStream(inputStream: java.io.InputStream) : List<KMFContainer>?

}
package org.kevoree.modeling.api;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:21
 */

@:keep
interface ModelSerializer {

   // fun serializeToStream(model : KMFContainer,raw : java.io.OutputStream)

    function serialize(model : KMFContainer) : String;

}
package org.kevoree.modeling.api;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:19
 */

@:keep
interface ModelLoader {

    function loadModelFromString(str: String) : List<KMFContainer>;

   // function loadModelFromStream(inputStream: java.io.InputStream) : List<KMFContainer>;

}
package org.kevoree.modeling.api.xmi

import java.util.HashMap
import org.kevoree.modeling.api.KMFContainer

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 18/10/13
 * Time: 19:43
 */

public class ResourceSet {

    private val resources = HashMap<String, HashMap<String, KMFContainer>>()

    public fun registerXmiAddrMappedObjects(nsuri : String, xmiAddrs : HashMap<String, KMFContainer>){
        resources.put(nsuri,xmiAddrs)
    }

    public fun resolveObject(nsuri : String,xmiAddr : String) : KMFContainer? {
       return null
    }

    public fun exportXmiAddrMappedObjects() : HashMap<String, KMFContainer>{
        val objects = HashMap<String, KMFContainer>()
        //TODO
        return objects
    }


}
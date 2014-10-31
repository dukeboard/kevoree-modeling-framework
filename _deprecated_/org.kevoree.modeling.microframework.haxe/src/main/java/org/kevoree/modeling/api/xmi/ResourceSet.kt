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
    private val invertedResources = HashMap<KMFContainer, XmiObjAddr>()

    public fun registerXmiAddrMappedObjects(nsuri: String, xmiAddrs: HashMap<String, KMFContainer>) {
        resources.put(nsuri, xmiAddrs)
        for(ad in xmiAddrs){
            if(invertedResources.containsKey(ad.value)){
                val alreadyVal = invertedResources.get(ad.value)
                if(alreadyVal!!.addr.contains("@")){
                    invertedResources.put(ad.value, XmiObjAddr(nsuri, ad.key))
                }
            } else {
                invertedResources.put(ad.value, XmiObjAddr(nsuri, ad.key))
            }
        }
    }

    public fun resolveObject(xmiAddr: String): KMFContainer? {
        //ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EString
        val typeAndAddr = xmiAddr.split(" ")
        if(typeAndAddr.size > 1){
            val addrs = typeAndAddr.get(1).split("#")
            if(addrs.size == 2){
                val resolvedAddrs = resources.get(addrs.get(0));
                var addr = addrs.get(1)
                addr = "#" + addr
                addr = addr.replace("#//", "/0/")
                return resolvedAddrs?.get(addr)
            }
        }
        return null
    }

    public fun objToAddr(obj: KMFContainer): String? {
        val resolved = invertedResources.get(obj)
        if(resolved != null){
            val packName = formatMetaClassName(obj.metaClassName())
            val nsURI = resolved.nsuri
            var addr = resolved.addr
            addr = addr.replace("/0/","#//")
            return "$packName $nsURI$addr"
        }
        return null
    }

    private fun formatMetaClassName(metaClassName: String): String {
        val lastPoint = metaClassName.lastIndexOf('.')
        val pack = metaClassName.substring(0, lastPoint)
        val cls = metaClassName.substring(lastPoint + 1)
        return pack + ":" + cls
    }

}

data class XmiObjAddr (val nsuri: String, val addr: String)
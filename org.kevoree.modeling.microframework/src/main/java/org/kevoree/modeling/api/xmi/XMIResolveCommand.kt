

package org.kevoree.modeling.api.xmi

public class XMIResolveCommand(val context : LoadingContext, val target : org.kevoree.modeling.api.KMFContainer, val mutatorType : Int, val refName : String, val ref : String) : org.kevoree.modeling.api.util.ResolveCommand {
    override fun run() {
        var referencedElement = context.map.get(ref)
        if(referencedElement != null) {
            target.reflexiveMutator(mutatorType,refName, referencedElement)
            return
        }
        if(ref.equals("/0/") || ref.equals("/")) {
            referencedElement = context.map.get("/0")
            if(referencedElement != null)   {
                target.reflexiveMutator(mutatorType,refName, referencedElement)
                return
            }
        }
        throw Exception("KMF Load error : reference " + ref + " not found in map when trying to  " + mutatorType + " "+refName+"  on " + target.toString())
    }
}
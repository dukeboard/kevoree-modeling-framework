package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait DeployUnit : org.kevoree.container.KMFContainer , org.kevoree.NamedElement {
fun getGroupName() : String

fun setGroupName(groupName : String) 
fun getUnitName() : String

fun setUnitName(unitName : String) 
fun getVersion() : String

fun setVersion(version : String) 
fun getUrl() : String

fun setUrl(url : String) 
fun getHashcode() : String

fun setHashcode(hashcode : String) 
fun getType() : String

fun setType(`type` : String) 

fun getRequiredLibs() : List<org.kevoree.DeployUnit>

fun setRequiredLibs(requiredLibs : List<org.kevoree.DeployUnit> )


fun addRequiredLibs(requiredLibs : org.kevoree.DeployUnit)


fun addAllRequiredLibs(requiredLibs :List<org.kevoree.DeployUnit>)


fun removeRequiredLibs(requiredLibs : org.kevoree.DeployUnit)

fun removeAllRequiredLibs()

fun findRequiredLibsByID(key : String) : org.kevoree.DeployUnit?

fun getTargetNodeType() : org.kevoree.NodeType?

fun setTargetNodeType(targetNodeType : org.kevoree.NodeType? )

}

package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ServicePortType : org.kevoree.container.KMFContainer , org.kevoree.PortType {
fun getInterface() : String

fun setInterface(interface : String) 

fun getOperations() : List<org.kevoree.Operation>

fun setOperations(operations : List<org.kevoree.Operation> )


fun addOperations(operations : org.kevoree.Operation)


fun addAllOperations(operations :List<org.kevoree.Operation>)


fun removeOperations(operations : org.kevoree.Operation)

fun removeAllOperations()

fun findOperationsByID(key : String) : org.kevoree.Operation?
}

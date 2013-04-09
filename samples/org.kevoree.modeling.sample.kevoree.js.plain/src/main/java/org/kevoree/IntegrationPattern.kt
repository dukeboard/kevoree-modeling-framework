package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait IntegrationPattern : org.kevoree.container.KMFContainer , org.kevoree.NamedElement {

fun getExtraFonctionalProperties() : List<org.kevoree.ExtraFonctionalProperty>

fun setExtraFonctionalProperties(extraFonctionalProperties : List<org.kevoree.ExtraFonctionalProperty> )


fun addExtraFonctionalProperties(extraFonctionalProperties : org.kevoree.ExtraFonctionalProperty)


fun addAllExtraFonctionalProperties(extraFonctionalProperties :List<org.kevoree.ExtraFonctionalProperty>)


fun removeExtraFonctionalProperties(extraFonctionalProperties : org.kevoree.ExtraFonctionalProperty)

fun removeAllExtraFonctionalProperties()


fun getPortTypes() : List<org.kevoree.PortTypeRef>

fun setPortTypes(portTypes : List<org.kevoree.PortTypeRef> )


fun addPortTypes(portTypes : org.kevoree.PortTypeRef)


fun addAllPortTypes(portTypes :List<org.kevoree.PortTypeRef>)


fun removePortTypes(portTypes : org.kevoree.PortTypeRef)

fun removeAllPortTypes()

fun findPortTypesByID(key : String) : org.kevoree.PortTypeRef?
}

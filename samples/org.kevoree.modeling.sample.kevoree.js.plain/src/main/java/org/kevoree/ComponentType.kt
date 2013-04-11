package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ComponentType : org.kevoree.container.KMFContainer , org.kevoree.LifeCycleTypeDefinition {

fun getRequired() : List<org.kevoree.PortTypeRef>

fun setRequired(required : List<org.kevoree.PortTypeRef> )


fun addRequired(required : org.kevoree.PortTypeRef)


fun addAllRequired(required :List<org.kevoree.PortTypeRef>)


fun removeRequired(required : org.kevoree.PortTypeRef)

fun removeAllRequired()

fun findRequiredByID(key : String) : org.kevoree.PortTypeRef?

fun getIntegrationPatterns() : List<org.kevoree.IntegrationPattern>

fun setIntegrationPatterns(integrationPatterns : List<org.kevoree.IntegrationPattern> )


fun addIntegrationPatterns(integrationPatterns : org.kevoree.IntegrationPattern)


fun addAllIntegrationPatterns(integrationPatterns :List<org.kevoree.IntegrationPattern>)


fun removeIntegrationPatterns(integrationPatterns : org.kevoree.IntegrationPattern)

fun removeAllIntegrationPatterns()

fun findIntegrationPatternsByID(key : String) : org.kevoree.IntegrationPattern?

fun getExtraFonctionalProperties() : org.kevoree.ExtraFonctionalProperty?

fun setExtraFonctionalProperties(extraFonctionalProperties : org.kevoree.ExtraFonctionalProperty? )


fun getProvided() : List<org.kevoree.PortTypeRef>

fun setProvided(provided : List<org.kevoree.PortTypeRef> )


fun addProvided(provided : org.kevoree.PortTypeRef)


fun addAllProvided(provided :List<org.kevoree.PortTypeRef>)


fun removeProvided(provided : org.kevoree.PortTypeRef)

fun removeAllProvided()

fun findProvidedByID(key : String) : org.kevoree.PortTypeRef?
}

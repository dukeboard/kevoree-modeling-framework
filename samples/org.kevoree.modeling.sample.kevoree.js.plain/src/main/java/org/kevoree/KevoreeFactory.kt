



package org.kevoree;

trait KevoreeFactory {

    fun getVersion() : String

    fun createComponentInstance() : ComponentInstance
    fun createComponentType() : ComponentType
    fun createContainerNode() : ContainerNode
    fun createContainerRoot() : ContainerRoot
    fun createPortType() : PortType
    fun createPort() : Port
    fun createNamespace() : Namespace
    fun createDictionary() : Dictionary
    fun createDictionaryType() : DictionaryType
    fun createDictionaryAttribute() : DictionaryAttribute
    fun createDictionaryValue() : DictionaryValue
    fun createCompositeType() : CompositeType
    fun createPortTypeRef() : PortTypeRef
    fun createWire() : Wire
    fun createServicePortType() : ServicePortType
    fun createOperation() : Operation
    fun createParameter() : Parameter
    fun createTypedElement() : TypedElement
    fun createMessagePortType() : MessagePortType
    fun createRepository() : Repository
    fun createDeployUnit() : DeployUnit
    fun createTypeLibrary() : TypeLibrary
    fun createNamedElement() : NamedElement
    fun createIntegrationPattern() : IntegrationPattern
    fun createExtraFonctionalProperty() : ExtraFonctionalProperty
    fun createPortTypeMapping() : PortTypeMapping
    fun createChannel() : Channel
    fun createMBinding() : MBinding
    fun createNodeNetwork() : NodeNetwork
    fun createNodeLink() : NodeLink
    fun createNetworkProperty() : NetworkProperty
    fun createChannelType() : ChannelType
    fun createTypeDefinition() : TypeDefinition
    fun createInstance() : Instance
    fun createLifeCycleTypeDefinition() : LifeCycleTypeDefinition
    fun createGroup() : Group
    fun createGroupType() : GroupType
    fun createNodeType() : NodeType
    fun createAdaptationPrimitiveType() : AdaptationPrimitiveType

}
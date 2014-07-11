class kevoree.ComponentInstance : kevoree.Instance {

    @contained provided : kevoree.Port
    @contained required : kevoree.Port
    namespace : kevoree.Namespace
}
class kevoree.ComponentType : kevoree.TypeDefinition {

    @contained required : kevoree.PortTypeRef
    @contained provided : kevoree.PortTypeRef
}
class kevoree.ContainerNode : kevoree.Instance {

    @contained components : kevoree.ComponentInstance
    hosts : kevoree.ContainerNode
    host : kevoree.ContainerNode
    groups : kevoree.Group
    @contained networkInformation : kevoree.NetworkInfo
}
class kevoree.ContainerRoot  {

    @contained nodes : kevoree.ContainerNode
    @contained typeDefinitions : kevoree.TypeDefinition
    @contained repositories : kevoree.Repository
    @contained dataTypes : kevoree.TypedElement
    @contained libraries : kevoree.TypeLibrary
    @contained hubs : kevoree.Channel
    @contained mBindings : kevoree.MBinding
    @contained deployUnits : kevoree.DeployUnit
    @contained nodeNetworks : kevoree.NodeNetwork
    @contained groups : kevoree.Group
}
class kevoree.PortType : kevoree.TypeDefinition {
    synchrone : EBoolean

}
class kevoree.Port : kevoree.NamedElement {

    bindings : kevoree.MBinding
    portTypeRef : kevoree.PortTypeRef
}
class kevoree.Namespace : kevoree.NamedElement {

    elements : kevoree.Instance
}
class kevoree.Dictionary  {

    @contained values : kevoree.DictionaryValue
}
class kevoree.FragmentDictionary : kevoree.Dictionary {
    @id name : EString

}
class kevoree.DictionaryType  {

    @contained attributes : kevoree.DictionaryAttribute
}
class kevoree.DictionaryAttribute : kevoree.TypedElement {
    optional : EBoolean
    state : EBoolean
    datatype : EString
    fragmentDependant : EBoolean
    defaultValue : EString

}
class kevoree.DictionaryValue  {
    @id name : EString
    value : EString

}
class kevoree.PortTypeRef : kevoree.NamedElement {
    optional : EBooleanObject
    noDependency : EBooleanObject

    ref : kevoree.PortType
    @contained mappings : kevoree.PortTypeMapping
}
class kevoree.ServicePortType : kevoree.PortType {
    interface : EString

    @contained operations : kevoree.Operation
}
class kevoree.Operation : kevoree.NamedElement {

    @contained parameters : kevoree.Parameter
    returnType : kevoree.TypedElement
}
class kevoree.Parameter : kevoree.NamedElement {
    order : EIntegerObject

    type : kevoree.TypedElement
}
class kevoree.TypedElement : kevoree.NamedElement {

    genericTypes : kevoree.TypedElement
}
class kevoree.MessagePortType : kevoree.PortType {

    filters : kevoree.TypedElement
}
class kevoree.Repository  {
    @id url : EString

}
class kevoree.DeployUnit : kevoree.NamedElement {
    @id groupName : EString
    @id version : EString
    url : EString
    @id hashcode : EString
    type : EString

    requiredLibs : kevoree.DeployUnit
}
class kevoree.TypeLibrary : kevoree.NamedElement {

    subTypes : kevoree.TypeDefinition
}
class kevoree.NamedElement  {
    @id name : EString

}
class kevoree.PortTypeMapping  {
    beanMethodName : EString
    serviceMethodName : EString
    paramTypes : EString

}
class kevoree.Channel : kevoree.Instance {

    bindings : kevoree.MBinding
}
class kevoree.MBinding  {

    port : kevoree.Port
    hub : kevoree.Channel
}
class kevoree.NodeNetwork  {

    @contained link : kevoree.NodeLink
    initBy : kevoree.ContainerNode
    target : kevoree.ContainerNode
}
class kevoree.NodeLink  {
    networkType : EString
    estimatedRate : EIntegerObject
    lastCheck : EString
    zoneID : EString

    @contained networkProperties : kevoree.NetworkProperty
}
class kevoree.NetworkInfo : kevoree.NamedElement {

    @contained values : kevoree.NetworkProperty
}
class kevoree.NetworkProperty : kevoree.NamedElement {
    @id name : EString
    value : EString

}
class kevoree.ChannelType : kevoree.TypeDefinition {
    lowerBindings : EIntegerObject
    upperBindings : EIntegerObject
    lowerFragments : EIntegerObject
    upperFragments : EIntegerObject

}
class kevoree.TypeDefinition : kevoree.NamedElement {
    @id version : EString
    factoryBean : EString
    bean : EString
    abstract : EBoolean

    deployUnit : kevoree.DeployUnit
    @contained dictionaryType : kevoree.DictionaryType
    superTypes : kevoree.TypeDefinition
}
class kevoree.Instance : kevoree.NamedElement {
    metaData : EString
    started : EBoolean

    typeDefinition : kevoree.TypeDefinition
    @contained dictionary : kevoree.Dictionary
    @contained fragmentDictionary : kevoree.FragmentDictionary
}
class kevoree.Group : kevoree.Instance {

    subNodes : kevoree.ContainerNode
}
class kevoree.GroupType : kevoree.TypeDefinition {

}
class kevoree.NodeType : kevoree.TypeDefinition {

}
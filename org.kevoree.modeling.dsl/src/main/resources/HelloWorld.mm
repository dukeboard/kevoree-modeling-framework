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
    hosts : kevoree.ContainerNode oppositeOf host
    host : kevoree.ContainerNode oppositeOf hosts
    groups : kevoree.Group oppositeOf subNodes
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
    synchrone : Bool

}

class kevoree.Port : kevoree.NamedElement {

    bindings : kevoree.MBinding oppositeOf port
    portTypeRef : kevoree.PortTypeRef
}

class kevoree.Namespace : kevoree.NamedElement {

    elements : kevoree.Instance
}

class kevoree.Dictionary  {

    @contained values : kevoree.DictionaryValue
}

class kevoree.FragmentDictionary : kevoree.Dictionary {
    @id name : String

}

class kevoree.DictionaryType  {

    @contained attributes : kevoree.DictionaryAttribute
}

class kevoree.DictionaryAttribute : kevoree.TypedElement {
    optional : Bool
    state : Bool
    datatype : String
    fragmentDependant : Bool
    defaultValue : String

}

class kevoree.DictionaryValue  {
    @id name : String
    value : String

}

class kevoree.PortTypeRef : kevoree.NamedElement {
    optional : Bool
    noDependency : Bool

    ref : kevoree.PortType
    @contained mappings : kevoree.PortTypeMapping
}

class kevoree.ServicePortType : kevoree.PortType {
    interface : String

    @contained operations : kevoree.Operation
}

class kevoree.Operation : kevoree.NamedElement {

    @contained parameters : kevoree.Parameter
    returnType : kevoree.TypedElement
}

class kevoree.Parameter : kevoree.NamedElement {
    order : Int

    type : kevoree.TypedElement
}

class kevoree.TypedElement : kevoree.NamedElement {

    genericTypes : kevoree.TypedElement
}

class kevoree.MessagePortType : kevoree.PortType {

    filters : kevoree.TypedElement
}

class kevoree.Repository  {
    @id url : String

}

class kevoree.DeployUnit : kevoree.NamedElement {
    @id groupName : String
    @id version : String
    url : String
    @id hashcode : String
    type : String

    requiredLibs : kevoree.DeployUnit
}

class kevoree.TypeLibrary : kevoree.NamedElement {

    subTypes : kevoree.TypeDefinition
}

class kevoree.NamedElement  {
    @id name : String

}

class kevoree.PortTypeMapping  {
    beanMethodName : String
    serviceMethodName : String
    paramTypes : String

}

class kevoree.Channel : kevoree.Instance {

    bindings : kevoree.MBinding oppositeOf hub
}

class kevoree.MBinding  {

    port : kevoree.Port oppositeOf bindings
    hub : kevoree.Channel oppositeOf bindings
}

class kevoree.NodeNetwork  {

    @contained link : kevoree.NodeLink
    initBy : kevoree.ContainerNode
    target : kevoree.ContainerNode
}

class kevoree.NodeLink  {
    networkType : String
    estimatedRate : Int
    lastCheck : String
    zoneID : String

    @contained networkProperties : kevoree.NetworkProperty
}

class kevoree.NetworkInfo : kevoree.NamedElement {

    @contained values : kevoree.NetworkProperty
}

class kevoree.NetworkProperty : kevoree.NamedElement {
    @id name : String
    value : String

}

class kevoree.ChannelType : kevoree.TypeDefinition {
    lowerBindings : Int
    upperBindings : Int
    lowerFragments : Int
    upperFragments : Int

}

class kevoree.TypeDefinition : kevoree.NamedElement {
    @id version : String
    factoryBean : String
    bean : String
    abstract : Bool

    deployUnit : kevoree.DeployUnit
    @contained dictionaryType : kevoree.DictionaryType
    superTypes : kevoree.TypeDefinition
}

class kevoree.Instance : kevoree.NamedElement {
    metaData : String
    started : Bool

    typeDefinition : kevoree.TypeDefinition
    @contained dictionary : kevoree.Dictionary
    @contained fragmentDictionary : kevoree.FragmentDictionary
}

class kevoree.Group : kevoree.Instance {

    subNodes : kevoree.ContainerNode oppositeOf groups
}

class kevoree.GroupType : kevoree.TypeDefinition {

}

class kevoree.NodeType : kevoree.TypeDefinition {

}
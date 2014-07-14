class kevoree.ComponentInstance : kevoree.Instance {
    @contained
    provided : kevoree.Port[0,*]
    @contained
    required : kevoree.Port[0,*]
    namespace : kevoree.Namespace
}

class kevoree.ComponentType : kevoree.TypeDefinition {
    @contained
    required : kevoree.PortTypeRef[0,*]
    @contained
    provided : kevoree.PortTypeRef[0,*]
}

class kevoree.ContainerNode : kevoree.Instance {
    @contained
    components : kevoree.ComponentInstance[0,*]
    hosts : kevoree.ContainerNode[0,*] oppositeOf host
    host : kevoree.ContainerNode oppositeOf hosts
    groups : kevoree.Group[0,*] oppositeOf subNodes
    @contained
    networkInformation : kevoree.NetworkInfo[0,*]
}

class kevoree.ContainerRoot  {
    @contained
    nodes : kevoree.ContainerNode[0,*]
    @contained
    typeDefinitions : kevoree.TypeDefinition[0,*]
    @contained
    repositories : kevoree.Repository[0,*]
    @contained
    dataTypes : kevoree.TypedElement[0,*]
    @contained
    libraries : kevoree.TypeLibrary[0,*]
    @contained
    hubs : kevoree.Channel[0,*]
    @contained
    mBindings : kevoree.MBinding[0,*]
    @contained
    deployUnits : kevoree.DeployUnit[0,*]
    @contained
    nodeNetworks : kevoree.NodeNetwork[0,*]
    @contained
    groups : kevoree.Group[0,*]
}

class kevoree.PortType : kevoree.TypeDefinition {
    synchrone : Bool
}

class kevoree.Port : kevoree.NamedElement {
    bindings : kevoree.MBinding[0,*] oppositeOf port
    portTypeRef : kevoree.PortTypeRef
}

class kevoree.Namespace : kevoree.NamedElement {
    elements : kevoree.Instance[0,*]
}

class kevoree.Dictionary  {
    @contained
    values : kevoree.DictionaryValue[0,*]
}

class kevoree.FragmentDictionary : kevoree.Dictionary {
    @id
    name : String
}

class kevoree.DictionaryType  {
    @contained
    attributes : kevoree.DictionaryAttribute[0,*]
}

class kevoree.DictionaryAttribute : kevoree.TypedElement {
    optional : Bool
    state : Bool
    datatype : String
    fragmentDependant : Bool
    defaultValue : String
}

class kevoree.DictionaryValue  {
    @id
    name : String
    value : String
}

class kevoree.PortTypeRef : kevoree.NamedElement {
    optional : Bool
    noDependency : Bool
    ref : kevoree.PortType
    @contained
    mappings : kevoree.PortTypeMapping[0,*]
}

class kevoree.ServicePortType : kevoree.PortType {
    interface : String
    @contained
    operations : kevoree.Operation[0,*]
}

class kevoree.Operation : kevoree.NamedElement {
    @contained
    parameters : kevoree.Parameter[0,*]
    returnType : kevoree.TypedElement
}

class kevoree.Parameter : kevoree.NamedElement {
    order : Int
    type : kevoree.TypedElement
}

class kevoree.TypedElement : kevoree.NamedElement {
    genericTypes : kevoree.TypedElement[0,*]
}

class kevoree.MessagePortType : kevoree.PortType {
    filters : kevoree.TypedElement[0,*]
}

class kevoree.Repository  {
    @id
    url : String
}

class kevoree.DeployUnit : kevoree.NamedElement {
    @id
    groupName : String
    @id
    version : String
    url : String
    @id
    hashcode : String
    type : String
    requiredLibs : kevoree.DeployUnit[0,*]
}

class kevoree.TypeLibrary : kevoree.NamedElement {
    subTypes : kevoree.TypeDefinition[0,*]
}

class kevoree.NamedElement  {
    @id
    name : String
}

class kevoree.PortTypeMapping  {
    beanMethodName : String
    serviceMethodName : String
    paramTypes : String
}

class kevoree.Channel : kevoree.Instance {
    bindings : kevoree.MBinding[0,*] oppositeOf hub
}

class kevoree.MBinding  {
    port : kevoree.Port oppositeOf bindings
    hub : kevoree.Channel oppositeOf bindings
}

class kevoree.NodeNetwork  {
    @contained
    link : kevoree.NodeLink[0,*]
    initBy : kevoree.ContainerNode
    target : kevoree.ContainerNode
}

class kevoree.NodeLink  {
    networkType : String
    estimatedRate : Int
    lastCheck : String
    zoneID : String
    @contained
    networkProperties : kevoree.NetworkProperty[0,*]
}

class kevoree.NetworkInfo : kevoree.NamedElement {
    @contained
    values : kevoree.NetworkProperty[0,*]
}

class kevoree.NetworkProperty : kevoree.NamedElement {
    @id
    name : String
    value : String
}

class kevoree.ChannelType : kevoree.TypeDefinition {
    lowerBindings : Int
    upperBindings : Int
    lowerFragments : Int
    upperFragments : Int
}

class kevoree.TypeDefinition : kevoree.NamedElement {
    @id
    version : String
    factoryBean : String
    bean : String
    abstract : Bool
    deployUnit : kevoree.DeployUnit
    @contained
    dictionaryType : kevoree.DictionaryType
    superTypes : kevoree.TypeDefinition[0,*]
}

class kevoree.Instance : kevoree.NamedElement {
    metaData : String
    started : Bool
    typeDefinition : kevoree.TypeDefinition
    @contained
    dictionary : kevoree.Dictionary
    @contained
    fragmentDictionary : kevoree.FragmentDictionary[0,*]
}

class kevoree.Group : kevoree.Instance {
    subNodes : kevoree.ContainerNode[0,*] oppositeOf groups
}

class kevoree.GroupType : kevoree.TypeDefinition {
}

class kevoree.NodeType : kevoree.TypeDefinition {
}
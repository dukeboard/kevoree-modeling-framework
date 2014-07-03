class TypeDefinition {
    @id name : String
    @contained properties : Property[0,*]
}
class ComponentType : TypeDefinition {
    portNumber : Integer
}
class Property {
       @id name : String
       value : String
}

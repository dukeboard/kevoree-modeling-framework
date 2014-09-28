class p.TypeDefinition {
    @id name : String
    @contained properties : p.Property[0,*]
}
class p.ComponentType : p.TypeDefinition {
    portNumber : Int
}
class p.Property {
       @id name : String
       value : String

       func myFunction(p : String,p: p.Property) : String

}




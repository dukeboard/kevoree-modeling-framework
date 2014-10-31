class cloud.Node {
    @id
    name : String
    value : String
    @contained
    children : cloud.Node[0,*]
    @contained
    element : cloud.Element
}

class cloud.Element {
    @id
    name : String

    value : String

    func trigger (param:String, loop : Int) : String
}


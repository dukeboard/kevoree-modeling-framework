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

    @precision(2.2)
    load : Double

    func trigger(param : String, loop : Int) : String
}


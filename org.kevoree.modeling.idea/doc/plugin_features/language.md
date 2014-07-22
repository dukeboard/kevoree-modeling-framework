# Language

- `class` is used to declare a new concept. The name of the concept must me a fully qualified name, including packages. e.g.: *test.MyConcept*
- **An Attribute** is declared as: `attNAme : attType` with attType in {String, Long, Int, Bool, Short, Double, Float}
- **A Relation** is declared as: `relName : relType<[cardMin, cadMax]> <oppositeOf relName>`. The relation type must be a concept declared in the MetaModel. The cardinality is optional. The specification of the opposite relation simply requires the name of the relation in the opposite concept (the type of the relation).
- `@id` placed on an attribute specifies that this attribute takes part in the unique identification of the concept elements.
- `@contained` specifies that the relation contains the elements.


```
class fsm.State {
    @id
    name : String
    @id
    version : String
    hits : Int

    @contained
    outgoing : fsm.Transition[0,*]
    incoming : fsm.Transition[0,*]
}

class fsm.Transition {
    source : fsm.State[0,1] oppositeOf outgoing
    target : fsm.State[0,1] oppositeOf incoming
}
```

# Kevoree Modeling Framework - Query Langage (KMFQL)

![Kevoree icon](http://kevoree.org/img/kevoree-logo.png)

## Overview

The Eclipse Modeling Framework(EMF) has been developed for design time manipulations of models and provides tools for this purpose, though not developed to be light, embeddable and effective at **run time**. 
The **Kevoree Modeling Framework(KMF)**[^1] is developed specifically to address these drawbacks and provides a drop-in replacement of the EMF *generator* (i.e.: model to code generator). Indeed, models are structured data and must offer efficient solutions for their exploration, loading, saving and cloning.

KMF takes advantage of its generation abilities to now propose two new tools to efficiently select and/or reach any model element.

* The [**Query Selector**](#querySelector) offers a simple language to collect, in depth, all the elements from the model that satisfy a query
* The [**Path Selector**](#pathSelector) gives the ability to efficiently reach a specific element in the model, as soon as the model element has an *ID*.


[^1]:[Models'12 Conference](https://www.google.lu/url?sa=t&rct=j&q=&esrc=s&source=web&cd=4&cad=rja&ved=0CFcQFjAD&url=http%3A%2F%2Fhal.archives-ouvertes.fr%2Fdocs%2F00%2F71%2F45%2F58%2FPDF%2Femfatruntime.pdf&ei=s8AYUfPlIZCDhQfx54DoCw&usg=AFQjCNFlfrm1NFVs6iIddxVjorbJeOajWA&sig2=nUrWedVJnv8ndOQViy2ZtA&bvm=bv.42080656,d.ZG4)


<a id="pathSelector"></a>
## Path Selector

The **Path Selector** gives the ability to reach a specific element in the model in a logarithmic time, as soon as the model element has an *ID*. Indeed, IDs are mandatory to uniquely identify model elements among their fellows. Let see how it works.

For the sake of clarity, we illustrate the use of Path Selectors(PS) with an example extracted from [Kevoree](http://www.kevoree.org). Let consider a very simple excerpt of the Kevoree metamodel.


![Mini Kevoree Model](https://raw.github.com/dukeboard/kevoree-modeling-framework/master/doc/fig/minikev.png)


In Kevoree, a NamedElement has an attribute `name`(^_^). This attribute is marked as the `ID` of NemedElement's elements (i.e.: the property `id` of this attribute is set to `true`).
In short a root contains nodes which contains themself components, and every elements are identified by an ID which is the `name` attribute.
 
Finding a model element (like the components Logger in the node 42) from the generated API point of view need to iterate on each model element to find it. In Java code this can done like it :

	ComponentModelRoot root = ...
    Component foundedComponent = …
    for(Node loopingNode : root.getNodes()){
    	if(loopingNode.getName().equals("node42")){
    		for(Component loopingComponent : loopingNode.getComponents()){
    			if(loopingComponent.equals("logger")){
    				foundedComponent = loopingComponent.equals;
    			}
    		}
    	}	
    }

Looping on relations between models has serious drowbacks on performance and in code complexity. Moreover is this translation to Java code there is no insurance of the unikness property defined in the ecore file.
In many case study their is a serious need to find a model element with an unikness notion like in relationnal databases.
This motivation is the basic of the path langage presented here. 
In a nuthsell it is way to find a model element following model relationships and *id* attribute expressed in metamodel.   

In Java code the generated API look like to :

	ComponentModelRoot root = ...
	Component foundedComponent = root.findByQuery("nodes[42]/components[logger]");
	
and because there are no ambiguity on relations name (only one are present per model entity), we can also express this path with the following expression :

	ComponentModelRoot root = ...
	Component foundedComponent = root.findByQuery("42/components[logger]");



### Syntax

####Simple Path

KMFQL syntax follow the metamodels relationships.
Each relationship can be cross over with the following `word`.

	relationName[ID]

Define as follow :


 RelationName | ID
:----------- | :-----------:
Name of the relation to cross over (ex : nodes) | Value of the attribute to identify one element in the relationship
 
If an `ID` contains a `/` character (such as a sub-path), the entire `ID`  must be protected by a **{** and a **}**

In our simple example we can expressed the our selection of the node 42, on a model root by the following expression :

	nodes[{42}]
	
If the starting point (model element) of our path contains only one relationship, the name of the relationship began optional.
Then the following expression is suffisent : 42


####Chained paths

Selection can be then chained by a `/` char which allow deep path contruction.
In short, a selection identify an element and the selection is then down on the relationship of this element with the subQuery followed the `/`.
A complex path can by composed like the following expression

	relationName[ID]/relationName[ID]


We can then chained an infinit number of subQuery with allow to identify a deep object.
In our example if we want to get the component named logger host by the node420 himself hosted by the node 42, it can can be expressed by the following expression :

	nodes[42]/nodes[420]/components[logger]
	
	
####Generated Java API

The API is generated inside the classes generated by KMF. 
Then any model element with has relationship with ID has a method find**relationShipName**ByID and findByQuery method.

	public Node findNodeByID(String nodeID);
	
	public Object findByQuery(String query);

The resolution starting point of the query if the element himself, the result is the object (untyped) or null if the resolution failed.

Then if we look for the element 420 from the root model the expression is then nodes[42]/nodes[420] but if we use the findByQuery method in the node 42 himself the expression of 420 began nodes[420] only. The resolution process of KMFQL is recursive.

####Performance and scalability

KMFQL is design for performance at runtime, then at runtime the evaluation of the query is down with a minimal overhead and using hashfuntions. The resolution (or non resolution) of a path introduce far less overhead rather than iterate on expression.
Moreover KMFQL reduce the number of temporary object creation resulting in a better scalability on limited environnement like Android virtual machine.

KMFQL used HashMap has back-end, the scalability of this solution is then dependent of this implementation.
Scalaility if pretty good until ~100 000 elements, after this soft limit HashMap implementation is tunable to adapt the hash function to the number of model elements in the relationship.


<a id="querySelector"></a>
## Query Selector

The path selection allows developper to find a unique model element identify by a path composed by `ID` and `/`.
Query selector reuse path semantic but allow to deeply collect model element following relationship.
As the opposite of an SQL langage it apply filter recursivly and aggregate result of crossed paths.
In short it is a multiple path aggregation.

KMFQL query is non limited to element identify by id by can use any attribute for the filtering expression.

### Syntax

The syntax is based on the same construction of path selection.

	relationName[{filterExp}]/relationName[{filterExp}]

The filterExp reuse LDAP filter expression and KMFQL use a sub project for the execution named JFilter.
Filter expression syntax is then well [documented by this project](https://github.com/rouvoy/jfilter)

Relation name is optional and selection without it will be apply on any relationship.

	{filterExp}/relationName[{filterExp}]

### API and usage

Like path find methods, selectors method are generated if the option `selector` is set to true in the maven plugin of KMF.

	selectByQuery(String query);
	
If we take the previous example of tiny component model prevously described, selected every node which name began 42 can be expressed as :

	nodes[{ name = 42* }]
	
Path and selector can be mixed together, then selecting every nodes containing a component with ID is expressed as follow :

	nodes[{ name = 42* }] / components[logger]

Another example is the selection of every child (hosted by another node) wich has **also** a number of component >10

	nodes[{ name = * }] / nodes[{ components.size > 10 }]

And finally in the same manner the following expression select every master which host more than 3 sub nodes and which name began by Center1_ :

	nodes[{ &(nodes.size > 3)(name = Center1_* ) }]
	
Finally with the syntaxique sugar and or operator selecting nodes of Center1 and Center2 can be expressed by the following expression :

	{ PIPE(name = Center1_*)(name = Center2_* ) }

### Performance 

KMF Selector has a slower resolution than path selection, but is still far better rather iterate on relationship collections.
Last but not least, JFilter and KMFQL are design to be able to run on sall environement like Android Dalvik.


<a id="top"></a>
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
*Shortcuts:* [Simple Path](#pathSelector/simplePath), [Chained Paths](#pathSelector/chainedPaths), [Java API](#pathSelector/javaApi), [Efficiency](#pathSelector/perf)

In model driven engineering, developers often have to navigate models to find specific elements. Being merging models, collecting elements with a given property or simply accessing attributes of elements. But looping on relations in order to find a specific model element has serious drawbacks on performance and code complexity. Moreover the Java code generated usually offers no insurance on the uniqueness defined by the `id` attribute in the metamodel.

The development of the **Path Selector (PS)** is motivated by the necessity to have a efficient tool to reach a specific element in the model, identified by a unique id, as it is done in relational databases. The Path Selector uses the *id* attribute expressed in metamodel as the unique key to find a model element by following model relationships. Let see how it works.

For the sake of clarity, we illustrate the use of Path Selectors(PS) with an example extracted from [Kevoree](http://www.kevoree.org). Let consider a very simple excerpt of the Kevoree metamodel.


![Mini Kevoree Model](https://raw.github.com/dukeboard/kevoree-modeling-framework/master/doc/fig/minikev.png)


**NamedElement** has an attribute `name`(^_^). This attribute is marked as the `ID` of NamedElement's elements (i.e.: the property `id` of this attribute is set to `true`).<br/>
**ComponentModelRoot** contains several nodes.<br/>
**Node** are NamedElements, thus has a name attribute, can contain other nodes and host components.<br/>
**Component** are also NamedElements.

Now, imagine that you want to get the `logger`component that you know to be hosted on node `42`. Doing so using the KMF API looks like:

	ComponentModelRoot root = mySystem.getRoot();
    Component foundComponent = null;
    for(Node loopingNode : root.getNodes()){
    	if(loopingNode.getName().equals("42")){
    		for(Component loopingComponent : loopingNode.getComponents()){
    			if(loopingComponent.equals("logger")){
    				foundComponent = loopingComponent.equals;
    			}
    		}
    	}	
    }

Using the KMFQL-PS the same research looks like:

	ComponentModelRoot root = mySystem.getRoot();
	Component foundedComponent = root.findByQuery("nodes[42]/components[logger]");
	

[top](#top)
### Syntax

<a id="pathSelector/simplePath"></a>
####Simple Path

The KMFQL-PS syntax follows the metamodel elements' relationships. Each relation can be navigated using the following syntax:

	relationName[ID]

Where


 RelationName | ID
:----------- | :-----------:
Name of the relation to navigate (ex : nodes) | Value of the `id` to identify one specific element in the collection
 
`ID`s can contain a `/` character (such as a sub-paths). In this case, the ID is considered as a [chained path](#pathSelector/chainedPaths). To protect against this behavior, the entire `ID` must be protected by braces (e.g.: `{myHome/room1}`).

Also, in our example the following paths are equivalent :

	nodes[42] <=> nodes[{42}]
	
In some particular cases, a model element can contain one and only one relation  to another element. In this particular case, it can be convenient to omit the specification of the relation to navigate. In our example, ComponentModelRoot has only one containment relation (nodes), which enables the path to a specific node: 

	Component foundedComponent = root.findByQuery("42");

[top](#top)
<a id="pathSelector/chainedPaths"></a>
####Chained paths

Paths to elements can be chained. Each path to a specific element is delimited by a `/` char.
`relationName[ID]/ID/relationName[{ID/with/slash}]`
The paths are evaluated in ordered sequence, from left to right. Thus `ID` in the previous query is applied on the result of the evaluation of `relationName[ID]`

In our example, the retrieval of the logger of the node 420, hosted on node 42 can be expressed as follow :

	nodes[42]/nodes[420]/components[logger]
	
<a id="pathSelector/javaApi"></a>
####Generated Java API

The API for PS is automatically included in generated classes for each model element that declares an `ID` attribute.
In this case, two methods are automatically generated : find**relationShipName**ByID and findByQuery method.

	public Node findNodeByID(String nodeID); //Returns the node model element with the specific nodeID; null otherwise.
	
	public Object findByQuery(String query); //Returns the object selected by a chained path; null otherwise.

The starting point for the resolution of a query (Chained Path) is the element on which the method is called. Thus, if you want to retrieve the node 420 from a ComponentModelRool element the chained path is `nodes[42]/nodes[420]`. But if you look for this same element from node42, the query path is reduced like `node[420]`. The resolution process of KMFQL is recursive.

[top](#top)
<a id="pathSelector/perf"></a>
####Performance and scalability

KMFQL is design for performance at runtime, then at runtime the evaluation of the query is down with a minimal overhead and using hashfuntion. The resolution (or non resolution) of a path introduce far less overhead rather than iterate on expression.

KMFQL used HashMap has back-end, the scalability of this solution is then dependent of this implementation.
Scalaility if pretty good until ~100 000 elements, after this soft limit HashMap implementation is tunable to adapt the hash function to the number of model elements in the relationship.


<a id="querySelector"></a>
## Query Selector


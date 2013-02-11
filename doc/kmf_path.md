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
In this case, two methods are automatically generated : find**relationshipName**ByID and findByQuery method.

	public Node findNodeByID(String nodeID); //Returns the node model element with the specific nodeID; null otherwise.
	
	public Object findByQuery(String query); //Returns the object selected by a chained path; null otherwise.

The starting point for the resolution of a query (Chained Path) is the element on which the method is called. Thus, if you want to retrieve the node 420 from a ComponentModelRool element the chained path is `nodes[42]/nodes[420]`. But if you look for this same element from node42, the query path is reduced like `node[420]`. The resolution process of KMFQL is recursive.

Each element identified by an `ID` also embbed a generated method to produce the unique path to find them.

	public String buildQuery();
	
The method buildQuery returns a path that follows the containement hierarchie.

[top](#top)
<a id="pathSelector/perf"></a>
####Performance and scalability

KMFQL is design for performance at runtime, then at runtime the evaluation of the query is down with a minimal overhead and using hashfuntions. The resolution (or non resolution) of a path introduce far less overhead rather than iterate on expression.
Moreover KMFQL reduce the number of temporary object creation resulting in a better scalability on limited environnement like Android virtual machine.

KMFQL used HashMap has back-end, the scalability of this solution is then dependent of this implementation.
Scalaility if pretty good until ~100 000 elements, after this soft limit HashMap implementation is tunable to adapt the hash function to the number of model elements in the relationship.

##### Micro benchmark

The following graphical representation illustrate a hierarchie of node and component.

![BenchModel](https://raw.github.com/dukeboard/kevoree-modeling-framework/master/doc/fig/deepModel.png)

The following code represente the legacy code with EMF API to found the component FakeConsole :

        for (ContainerNode node : model.getNodes()) {
            if (node.getName().equals("node6")) {
                for (ContainerNode node2 : node.getHosts()) {
                    if (node2.getName().equals("node7")) {
                        for (ContainerNode node3 : node2.getHosts()) {
                            if (node3.getName().equals("node8")) {
                                for (ContainerNode node4 : node3.getHosts()) {
                                    if (node4.getName().equals("node4")) {
                                        for (ComponentInstance i : node4.getComponents()) {
                                            if (i.getName().equals("FakeConso380")) {
                                                fConsole = i;break;
                                            }
                                        }break;
                                    }
                                }break;
                            }
                        }break;
                    }
                }break;
            }
        }
        
And the following code represent the new version with KMFQL :

        ComponentInstance fConsole2 = model.findByQuery("nodes[node6]/hosts[node7]/hosts[node8]/hosts[node4]/components[FakeConso380]", ComponentInstance.class);

Executed on an i7 2.6 Ghz processor this very simple selection give the following times :

API Version | Time to select (in microseconds)
:----------- | :-----------:
EMF         | 954
KMF         | 37 

To summarize, selection by path is ~26 faster rather than iteration on relationships collection.

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
	
Finally with the syntaxique sugar and or operator selecting nodes of Center1 or Center2 can be expressed by the following expression :

	{ PIPE(name = Center1_*)(name = Center2_* ) }

### Performance 

KMF Selector has a slower resolution than path selection, but is still far better rather iterate on relationship collections.
Last but not least, JFilter and KMFQL are design to be able to run on sall environement like Android Dalvik.


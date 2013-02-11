<a id="top"></a>
# Kevoree Modeling Framework - Query Langage (KMFQL)

![Kevoree icon](http://kevoree.org/img/kevoree-logo.png)

## Overview

The Eclipse Modeling Framework(EMF) has been developed for design time manipulations of models and provides tools for this purpose, though not developed to be light, embeddable and effective at **run time**. 
The **Kevoree Modeling Framework(KMF)**[^1] is developed specifically to address these drawbacks and provides a drop-in replacement of the EMF *generator* (i.e.: model to code generator). Indeed, models are structured data and must offer efficient solutions for their exploration, loading, saving and cloning.

KMF takes advantage of its generation abilities to now propose two new tools to efficiently select and/or reach any model element.

* The [**Path Selector(KMFQL-PS)**](#pathSelector) gives the ability to efficiently reach a specific element in the model, as soon as the model element has an *ID*.
* The [**Query Selector(KMFQL-QS)**](#querySelector) offers a simple language to collect, in depth, all the elements from the model that satisfy a query


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

KMFQL-PS is designed to reach the highest efficiency at runtime. The introduction of hash tables, on model elements with IDs, introduces a minimum overhead and radically speeds up the resolution (or non-resolution) of an element. It also reduces the number of temporary objects created, which confers a better scalability on limited execution environments (e.g.: Android platform).

In details, KMFQL-PS uses HashMaps as back-end structure. The scalability of this solution depends on its implementation. In general cases, HashMaps still a good choice until ~100 000 elements. Over this soft limit HashMap implementations must be tuned to adapt the hash function to the number of elements stored.

###### Micro benchmark

To illustrate how efficient the KMFQL-PS can be, we created the following model. It is the graphical view of a model in which the root element contains one node, which contains four nodes, etc.

![BenchModel](https://raw.github.com/dukeboard/kevoree-modeling-framework/master/doc/fig/deepModel.png)

Now, imagine you want to get the FakeConsole component instance that is hosted deeply in the node hierarchy. In plain Java, using the API generated by EMF for instance, this is what the retrieval of this component instance would look like:

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
        
ò_ó Disappointing. Look at the same function, in KMFQL-PS :

        ComponentInstance fConsole2 = model.findByQuery("nodes[node6]/hosts[node7]/hosts[node8]/hosts[node4]/components[FakeConso380]", ComponentInstance.class);

On a i7 2.6 Ghz processor this selection gives the following execution times :

API Version | in µs | in ms
:----------- | :-----------: | :-----------:
EMF-Plain Java         | 954 | 0,954
KMFQL-PS        | 37 | 0,037 

To summarize, KMFQL-PS, compared with the naive version, reduces the execution time by a factor of **25,9**.

[top](#top)
<a id="querySelector"></a>
## Query Selector

When working with models, the selection of elements among a collection is one of the most common operation. This selection is often made of a filter on the values of some elements' attributes. This filtered sub-collection can then be applied another filter going deeper in the containment relation and/or a treatment can be applied.

The KMFQL-QS has been created to allow for efficient deep filtering of model elements. Just as for the Path Selector, queries can be composed of chained filters. The filtering is performed a prefix recursion basis. The first filter returning no element ends the execution of the query and returns null. Otherwise, the query returns the last set of elements that passed the last filter.

The difference with an SQL query for instance, is that the first part of the query is executed, then the second part is executed on each element the sub-set issues from the first query. The results of the second query are aggregated and used as input for the third query; and the algorithm goes until there is no more query part to apply.

KMFQL-QS relies on [JFilter](https://github.com/rouvoy/jfilter) for the definition of filters and execution of the query.

### Syntax

The syntax is based on the same construction as KMFQL-PS. The filterExp format is documented on [JFilter](https://github.com/rouvoy/jfilter).

	relationName[{filterExp}]/relationName[{filterExp}]

The relation name is optional. In this case,  the query is executed on **ALL** relations of the element on which it is called.<br/>
**BE AWARE** that this behavior can lead to a combinatorial explosion if not used with caution.

	{filterExp}/relationName[{filterExp}]

[top](#top)
### API and usage

As for KMFQL-PS, selector methods are generated directly in the classes of the model elements, if the `selector` option is set to true in the KMF maven plugin.

	selectByQuery(String query);
	
If we take the previous example of tiny component model previously described, selected every node which name began 42 can be expressed as :

	nodes[{ name = 42* }]
	
Path and selector can be mixed together, then selecting every nodes containing a component with ID is expressed as follow :

	nodes[{ name = 42* }] / components[logger]

Another example is the selection of every child (hosted by another node) witch has **also** a number of component >10

	nodes[{ name = * }] / nodes[{ components.size > 10 }]

And finally in the same manner the following expression select every master which host more than 3 sub nodes and which name began by Center1_ :

	nodes[{ &(nodes.size > 3)(name = Center1_* ) }]
	
Finally with the syntactique sugar and or operator selecting nodes of Center1 or Center2 can be expressed by the following expression :

	{ |(name = Center1_*)(name = Center2_* ) }

### Performance 

KMF Selector has a slower resolution than path selection, but is still far better rather iterate on relationship collections.
Last but not least, JFilter and KMFQL are design to be able to run on small environment like Android Dalvik.

[top](#top)
Kevoree Modeling
=======

The increasing use of Model@Runtime requires rich and efficient modeling frameworks.
KMF is developed to provide efficient modeling frameworks to edit, compose and synchronize models on Java and JavaScript Virtual Machines.

> Free the code from models !

### Why a new framework?

KMF was originally developped to support the Kevoree platform.
After years of developing Model@Run.time platforms we have now a strong expertise on runtime needed tools for models manipulation, distribution, synchronization... KMF is a generalisation of this expertise in a generic modeling framework. Based on a cross-compiled tools chain for JS and JVM platform from a domain metamodel, it also offers models efficient operators tuned for Runtime usage. It generate for you a powerful API for server-side storage but as well for building a presentation layer in a simple browser. In short, KMF generate business specific API and Tools from a metamodel, ready for distributed modeling activities.

> KMF is framework dedicated for runtime usages

### Features

KMF give you runtime oriented features such as:
```
most important feature, a very simple and comprehensive API
```

 * Memory optimized object oriented modeling API
 * JS (Browser, NodeJS) and JVM cross-compiled models
 * Efficient visitors for models traversal
 * Unique path for each model elements
 * Optimized query language to lookup model elements
 * Traces operators for models low-levels operations
 * Built-in load/save operation in JSON/XMI format
 * Built-in different clone strategy (mutable only, copy on write)
 * Built-in models merge and diff operators
 * Persistence layers for BigModel with lazy load
 * Distributed datastore for BigData models
 
Getting started
---------------

The easiest way to start using KMF is though Maven build system. To leverages Maven you can use you own (certainly already existing) project or use a sample to kick-off.

> NB : standalone compiler and NetBeans/Eclipse/IntelliJ plugins are coming soon !

### Using your own maven project

Create a Maven project folder in which you will place the pom and your EcoreMM.

```
myProject
 |-myMetaModel.ecore
 |-pom.xml
```

Then the KMF plugin in the Build/Plugins section

``` html
<plugin>
 <groupId>org.kevoree.modeling</groupId>
 <artifactId>org.kevoree.modeling.kotlin.generator.mavenplugin</artifactId>
 <version>replace.by.last.kmf.version</version>
 <extensions>true</extensions>
 <executions><execution>
   <id>ModelGen</id>
   <goals><goal>generate</goal></goals>
   <configuration>
   <!-- optionS here -->
   </configuration>
  </execution></executions>
</plugin>
```

In addition, add the KMF MicroFramework dependency
``` html
<dependency>
 <groupId>org.kevoree.modeling</groupId>
 <artifactId>org.kevoree.modeling.microframework</artifactId>
 <version>replace.by.last.kmf.version</version>
</dependency>
```

### Using a sample project

If you don't have an existing project, perhaps the best simpliest way is to use a sample project. You can download one by clicking on the button.

> [Download sample project >](https://github.com/dukeboard/kevoree-modeling-framework/tree/master/metamodel/tinycloud
)

### Compile models

When your Maven project is ready, juste type into a terminal the following command.

```
mvn clean install
```

After compilation, the target directly will contains a JAR or a JS files which contains all needed file to use your generated API at runtime.



Query language
==============

The Eclipse Modeling Framework(EMF) has been developed for design time manipulations of models and provides tools for this purpose, though not developed to be light, embeddable and effective at **run time**. 
The [Kevoree Modeling Framework](https://www.google.lu/url?sa=t&rct=j&q=&esrc=s&source=web&cd=4&cad=rja&ved=0CFcQFjAD&url=http%3A%2F%2Fhal.archives-ouvertes.fr%2Fdocs%2F00%2F71%2F45%2F58%2FPDF%2Femfatruntime.pdf&ei=s8AYUfPlIZCDhQfx54DoCw&usg=AFQjCNFlfrm1NFVs6iIddxVjorbJeOajWA&sig2=nUrWedVJnv8ndOQViy2ZtA&bvm=bv.42080656,d.ZG4), or KMF, is developed specifically to address these drawbacks and provides a drop-in replacement of the EMF *generator* (i.e.: model to code generator). Indeed, models are structured data and must offer efficient solutions for their exploration, loading, saving and cloning.

KMF takes advantage of its generation abilities to now propose two new tools to efficiently select and/or reach any model element.

* The [**Path Selector(KMFQL-PS)**](#pathSelector) gives the ability to efficiently reach a specific element in the model, as soon as the model element has an *ID*.
* The [**Query Selector(KMFQL-QS)**](#querySelector) offers a simple language to collect, in depth, all the elements from the model that satisfy a query


Path Selector
-------------

Collecting model elements with a given property or simply accessing attributes of elements is one of the most common operation in modeling. But looping on relations in order to find a specific model element has serious drawbacks on performance and code complexity. Moreover the Java code generated usually offers no insurance on the uniqueness defined by the `id` attribute in the metamodel.

The development of the **Path Selector (PS)** is motivated by the necessity to have a efficient tool to reach a specific element in the model, identified by a unique id, as it is done in relational databases. The Path Selector uses the *id* attribute expressed in metamodel as the unique key to find a model element by following model relationships. Let see how it works. For the sake of clarity, we illustrate the use of Path Selectors(PS) with an example extracted from [Kevoree](http://www.kevoree.org). Let consider a very simple excerpt of the Kevoree metamodel.

> ![Mini Kevoree Model](https://raw.github.com/dukeboard/kevoree-modeling-framework/master/doc/fig/minikev.png)

**NamedElement** has an attribute `name`. This attribute is marked as the `ID` of NamedElement's elements (i.e.: the property `id` of this attribute is set to `true`).<br/>
**ComponentModelRoot** contains several nodes.<br/>
**Node** are NamedElements, thus has a name attribute, can contain other nodes and host components.<br/>
**Component** are also NamedElements.

Now, imagine that you want to get the `logger`component that you know to be hosted on node `42`. Doing so using the KMF API looks like:

``` java
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
```

Using the KMFQL-PS the same research looks like:

``` java
ComponentModelRoot root = mySystem.getRoot();
Component foundComponent = root.findByPath("nodes[42]/components[logger]");
```	

### Path construction

The KMFQL-PS syntax follows the metamodel elements' relationships. Each relation can be navigated using the following syntax.

> relationName[ID]

* RelationName : Name of the relation to navigate (ex : nodes)
* ID : Value of the `id` to identify one specific element in the collection
 
`ID`s can contain a `/` character (such as a sub-paths). In this case, the ID is considered as a [chained path](#pathSelector/chainedPaths). To protect against this behavior, the entire `ID` must be protected by braces (e.g.: `{myHome/room1}`).

Also, in our example the following paths are equivalent

> nodes[42] <=> nodes[{42}]
	
In some particular cases, a model element can contain one and only one relation  to another element. In this particular case, it can be convenient to omit the specification of the relation to navigate. In our example, ComponentModelRoot has only one containment relation (nodes), which enables the path to a specific node: 

```java
Component foundedComponent = root.findByPath("42");
```

Paths to elements can be chained. Each path to a specific element is delimited by a `/` char.
`relationName[ID]/ID/relationName[{ID/with/slash}]`
The paths are evaluated in ordered sequence, from left to right. Thus `ID` in the previous query is applied on the result of the evaluation of `relationName[ID]`

In our example, the retrieval of the logger of the node 420, hosted on node 42 can be expressed as follow :

> nodes[42]/nodes[420]/components[logger]
	
### Path API

The API for PS is automatically included in generated classes for each model element that declares an `ID` attribute.
In this case, two methods are automatically generated : find**relationshipName**ByID and findByPath method.

``` java
Node findNodeByID(String nodeID); 	
Object findByPath(String query); 
```

The starting point for the resolution of a query (Chained Path) is the element on which the method is called. Thus, if you want to retrieve the node 420 from a ComponentModelRool element the chained path is `nodes[42]/nodes[420]`. But if you look for this same element from node42, the query path is reduced like `node[420]`. The resolution process of KMFQL is recursive.

Each element identified by an `ID` also embbed a generated method to produce the unique path to find them. The method path returns a path that follows the containement hierarchie.

```java
String path();
```	

Query Selector
--------------

When working with models, the selection of elements among a collection is one of the most common operation. This selection is often made of a filter on the values of some elements' attributes. This filtered sub-collection can then be applied another filter going deeper in the containment relation and/or a treatment can be applied.

The KMFQL-QS has been created to enable the efficient, deep filtering of model elements. Just as for the Path Selector, queries can be composed of chained filters. The filtering is performed a prefix recursion basis. The first filter returning no element ends the execution of the query and returns null. Otherwise, the query returns the last set of elements that passed the last filter.

The difference with an SQL query for instance, is that the first part of the query is executed, then the second part is executed on each element the sub-set issues from the first query. The results of the second query are aggregated and used as input for the third query; and the algorithm goes until there is no more query part to apply.

KMFQL-QS relies on [JFilter](https://github.com/rouvoy/jfilter) for the definition of filters and execution of the query.

### Selector syntax

The syntax is based on the same construction as KMFQL-PS. The filterExp format is documented on [JFilter](https://github.com/rouvoy/jfilter).

	relationName[{filterExp}]/relationName[{filterExp}]

The relation name is optional. In this case,  the query is executed on **ALL** relations of the element on which it is called.<br/>

	{filterExp}/relationName[{filterExp}]
	
> **BE AWARE** that this behavior can lead to a combinatorial explosion if not used with caution.

### Selector API

As for KMFQL-PS, selector methods are generated directly in the classes of the model elements, if the `selector` option is set to true in the KMF maven plugin.

> selectByQuery(String query);
	
If we take the previous example of tiny component model previously described, selected every node which name began 42 can be expressed as :

> nodes[{ name = 42* }]
	
Path and selector can be mixed together, then selecting every nodes containing a component with ID is expressed as follow :

> nodes[{ name = 42* }] / components[logger]

Another example is the selection of every child (hosted by another node) which has **also** a number of component >10

> nodes[{ name = * }] / nodes[{ components.size > 10 }]

And finally in the same manner the following expression select every master which host more than 3 sub nodes and which name began by Center1_ :

> nodes[{ &(nodes.size > 3)(name = Center1_* ) }]
	
Finally with the syntactic sugar and _or_ operator selecting nodes of Center1 or Center2 can be expressed by the following expression :

> { |(name = Center1_*)(name = Center2_* ) }
> 

### Special keyword for contained elements

In addition to standard relationship names available in the selector language, KMFQL offers a dedicated keyword to perform selections on any element contained by another.

In details, if an element is container for some other, it is possible to select all his child(contained) elements, whatever their containment collection, by using the following expression :

> contained[*]
	
So as with classical relation, it is possible to select a subset of the contained elements (e.g.: any contained element which name starts with `subNode`):

> contained[name = subNode*]
	

Model Events
============

What for?
---------

### Events motivation

Events is a way to be informed from models modifications. This low-level mechanism can be use to synchronize two different models or to synchronize a view with it's backbone model. Basically an event listener can be register on a model element or recursivelly on all sub-contained elements *(tree listener)*.

### How to use it ?

KMF proposes an option event in its Maven pluggin.
If this option is set to `true`, the code generator generates all necessary methods and class to provide a listener mechanism to all the features of your Metamodel.

``` xml
   <events>true</events>
```

API description
---------------

### ModelEvent

Each modification in models now produce events through the send of an object ModelEvent. 
Events are generated when:

* Attributes are `set`
* References are `set`, `added` or `removed` (the two last are only available for references with unlimited max cardinality)
* An opposite element is modified (only if the opposite relation is set).

The `source` of an event is identified by its `path()`. As a consequence, you need to specify an `ID` attribute for, at least, the element you want to listen.

### Events listeners

A model listener is an object which can receive model events. This is realized by a call on elementChanged method.

```
trait ModelElementListener {
    fun elementChanged(evt : ModelEvent)
}
```

Model listener can be placed on any elements. They can be registered as ModelElement listener or ModelTreeListener. The first one will receive only events from the unique model element where the listener is the target. The second one will recursivelly reeive events from all modifications (reference or attribute modified) on all sub elements (according to the containment hierarchy).

On right, please find the extract of the KMFContainer API. Model listeners can be added or dropped through this. *removeModelTreeListener* method recursivelly delete it on child elements.

```
trait KMFContainer {
    fun addModelElementListener(lst : ModelElementListener)
    fun removeModelElementListener(lst : ModelElementListener )
    fun removeAllModelElementListeners()
    fun addModelTreeListener(lst : ModelElementListener)
    fun removeModelTreeListener(lst : ModelElementListener)
    fun removeAllModelTreeListeners()
}
```

For instance, considering a very simple Finite State Machine metamodel <br /> 
(FSM<>--State<>--Transition<>--Action).

``` java
fsm.addModelTreeListener(new ModelTreeListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                System.out.println("FSM-Tree::" + evt.toString());
            }
        });
```

Would print a message each time something is set, added or removed in the entire FSM !
But, if you want to listen to events concerning the FSM only (States added or removed, don't care about Transitions and Actions), a ModelElementListener would be sufficient.

``` java
fsm.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                System.out.println("FSM::" + evt.toString());
            }
        });
```


Model visitors
===============

Visitor motivation
------------------

Model is basically a graph of objects organized around relationship. Many models case study need to naviguate through these relationships to perform operations. We can cite as an exemple a pretty print process which need to traverse the whole graph following containements relationship. 

### Efficient visit
The classic approach in model object oriented API is based on iteration on list to perform this naviguation. This lead to serious perform drawback due to the number of temporary object created. For this reason KMF generated built a very efficient way to use a visitor pattern on objects relationship and attributes.

Visitor usage
-----

### Visitors API

The KMF visitor API is based on the ModelVisitor interface. It is mainly based on a visit method called each time a visitor (custom process) found a new element.

``` java
package org.kevoree.modeling.api.util;
trait ModelVisitor {
	fun visit(elem : KMFContainer, refInParent : String, parent : KMFContainer)
}
```

In addition a visitor can optionally define additional methods to have feedback during the visit. The beginVisitElem method is called when a visit of an element start, the end respective method endVisitElem will be called when this object and all is sub childs elements will be visited. In addition beginVisitRef and endVisitRef is triggered when a reference of an object is visited. The end method is called when all elements of a reference is already visited by this visitor.


``` java
fun beginVisitElem(elem : KMFContainer){}
fun endVisitElem(elem : KMFContainer){}
fun beginVisitRef(refName : String, refType : String){}
fun endVisitRef(refName : String){}
```

Despite the visitor traverse efficient the graph, for performance optimization it is often necessary to control the recursivity of visit. In short this allows to control and stop the visitor. To control visit process, ModelVisitor is extended with stopVisit method to completely stop a visitor. The noChildrenVisit and the noReferencesVisit respectivelly allows to not visit children or referenced model elements.

``` java
fun stopVisit()
fun noChildrenVisit()
fun noReferencesVisit()
```

To visit attributes of a model element, KMF use a dedicated model visitor named ModelAttributeVisitor. This visitor rely on the triggering of a method visit which is called with the content (value) and the name of the attribute.

```
trait ModelAttributeVisitor {
	fun visit(value: Any?, name: String, parent: KMFContainer)
}
```

### How to use?

Any kmf model element as built-in two method to start a process visitor. The visit method take as parameter your custom visitor. In addition the first parameter allows to define if the visit is recursive, if it should include contained referenced objects and the last parameter if non contained reference object should be reached. In addition the visitAttributes allows to call a visit of attributes on this model element.

``` java
trait KMFContainer {
 	fun visit(visitor : org.kevoree.modeling.api.util.ModelVisitor, 
		recursive : Boolean, containedReference : Boolean,
		nonContainedReference : Boolean)
	fun visitAttributes(visitor : ModelAttributeVisitor)
}
```

Model operators
===============

Traces concepts
---------------

### What is a trace?

A trace is an atomic model modification. In short it define a change of a model element identified by a path. A trace is then the backup of an action which as been or will be done on a model. It is a low-level tool to interact with model. Trace is atomic and serializable, because of identified elements on a trace use KMF path. Due to that a trace can be extracted from a model and apply an a mirror of it remotely, because path contains the semantic of unique element identification. Here is the following kind of potential trace for KMF models.

```
TraceType {
	SET
	ADD
	ADDALL
	REMOVE
	REMOVEALL
	RENEW_INDEX
}
```

Need an example ? This a trace of the modification of the param att of node0 with the content newVal.

> {type:"SET",path:"nodes[node0]/param",content:"newVal"}

### Trace sequence

A trace sequence is basically an ordered set of atomic traces. A trace sequence can be applied on a model to sequencially perform a model transformation. A trace sequence can be view a patch.

Set operation of models
-----------------------

### ModelCompare

To perform all KMF model operation, we need to generated a trace sequence through a model compare. This trace sequence can be then apply on a model to perform the real operation. 

```
ModelCompare compare = new DefaultModelCompare();
```

### Model union

A model merge operation aims at merge all models elements present in two models in one model. 

> A + TraceMergeOf(A,B) = A + B

As all KMF model operation it relie on the comparator to generate the trace sequence corresding to such operation. Then the trace sequence can be apply on A, B is unchanged.

``` java
diffSeq = compare.merge(modelA,modelB);
diffSeq.applyOn(modelA)
```

### Model intersection

A model intersection operation aims at building a model containing all common models elements present in two models. 

> A + TraceMergeOf(A,B) = (A+B) - A - B 

As all KMF model operation it relie on the comparator to generate the trace sequence corresding to such operation.

``` java
diffSeq = compare.inter(modelA,modelB);
diffSeq.applyOn(modelA)
```

### Model patch

A model compare operation aims at migrate a model to another. In short a model A should reach the state of a model B this is the right operation. This operation is mainly used in synchronization process. 

> A + TraceMergeOf(A,B) = B

As all KMF model operation it relie on the comparator to generate the trace sequence corresding to such operation.

``` java
diffSeq = compare.inter(modelA,modelB);
diffSeq.applyOn(modelA)
```

Model tracker
-------------

### Undo/Redo for models

KMF framework offers a ModelTracker utility. In short this tool allows to follow event on an object and register as a trace sequence all modifications. In addition the tracker also maintains a reversed trace sequence to perform reversed modifications.

The API of model tracker rely on a track activation with the **track** method. A model tracker can be unregistred through **untrack** method. The **reset** method allows to define a breack point in the tracker. User can then perform any modifications on models. Then the call on **undo** will apply a reversed trace sequence an revert all modifications. After that a call on **redo** method will reapply the modifications.


``` java
trait ModelTracker {
	fun track(model: KMFContainer)
	fun untrack()
	fun reset()
	fun undo()
	fun redo()
}
```

Model Aspects
=============

Modeling through code
----------

MOF structure of your models like describes in .ecore files only reflect the structural way to store models.
Indeed ecore format allows you to define operations into models, however these methods need an operation language to define it.

KMF rely on Kotlin execution language to express model behaviors. Kotlin language is cross compilable to JS and JVM so such behavior can work in JVM but as well in browser or nodejs platform.
KMF rely on a bi-directional synchronization between code and model (ecore files). As result you can define behavior in code (.kt files) to eOperation declared in .ecore files but in addition you can declare method and new meta class directly from the code.

Use code or model first as needed in your project, but remains one rule, models are domain definition and technical details should be hidden in code.

Kotlin API
----------

### Aspect API

Let's take as example a simple FSM metamodel (you can found it [here](https://github.com/dukeboard/kevoree-modeling-framework/tree/master/metamodel/fsm/org.kevoree.modeling.sample.fsm.kt) ). In this metamodel we add an operation `run` to the metaclass `Action`. Then, you can declare in your src/main/java directory several Kotlin traits implementing the generated interface. An example can be found [here](https://github.com/dukeboard/kevoree-modeling-framework/blob/master/metamodel/fsm/org.kevoree.modeling.sample.fsm.kt/src/main/java/org/jetbrains/annotations/MyAspect.kt).

``` kotlin
aspect trait MyAspect : Action {
	override fun run(p : Boolean): String {return "";}
	private fun internalStuff(){}
    }
```

Then you compile your project and the resulting Java .class or JavaScript .js files will have all your traits directly woven in the compiled code. Aspect keyword is an annotation meaning that the aspect must mixed with the meta class : Action. If you define a new operation by adding a **fun** definition, it is directly added in the MetaModel as a new operation (be careful the API will change and you will have to add the override keyword). Private function will remain private to the aspect and will not be pushed in the ecore model. In short, you can now call the method run on any of your Action object, in the JVM or in the JS version.

### Metaclass API

You can also add a new pure code meta class using the same mechanism, juste by using the **meta** keyword. This means that you add a new metaclass named **MyMetaClassName** with superclass **Action**. This meta class will be generated in the API as any method class defined in the based ecore file.


``` java
    public meta trait MyMetaClassName : Action {
        override fun myFct(): {return "";}
    }
```

Using JS models
===============

in NodeJS
---------

The KMF maven plugin generates into the target directory a file named : <artefactID>.min.js.
This file is ready to be included as a nodeJS module. To load it, you only have to call the include directive of nodeJS. Of course replace org.cloud by the generated package specified in your model.

``` js
var model = require('./org.kevoree.modeling.sample.cloud.js.min.js');
var saver = new model.org.cloud.serializer.JSONModelSerializer();
var loader = new model.org.cloud.loader.JSONModelLoader();
```

in browsers
-----------

TODO

BigModel
===================

What is BigModel ?
------------------

Model can reach a huge size, especially when considering it a an history of monitoring system or while modeling a use domain like all the topology of a cluster. In such case study, model can fit in the memory and we need a better way to interact with informations. Similarly to BigData we speak of BigModel in such cases.

### Concept overview

KMF Persistence API is based on the following asumption: despite a model not fit in memory, or is stored on a remote server, it's manipulation must be seamless to memory storage. The global concept behind KMF persistence if lazy load, in short when naviguating into model we will load seamlessly the model element we need. If a model element is created in memory or already load, a cache will optimize the load. In addition we try to limit the lazy while retriving an object through is path, in short a lookup of an element with is path only load one model element. This concept allows to go directly in deep in the graph object without any extra-cost like a select in a database.

### PersistenceFactory

The main entry point for the persistence KMF API is a special factory : PersistenceKMFFactory. This factory allows to interact with the BigModel through the lookup of an element using is path, and the save of an element thourgh persist method. A simple batch concept allows to save several elements shortly. All modification is only written to the remote storage or disk when a call on **commit** method is performed. Finally the **clearCache** method allows to close the factory and free the memory.

``` java
trait PersistenceKMFFactory {
	fun lookup(path: String): KMFContainer?
	fun persist(elem: KMFContainer)
	fun persistBatch(batch: Batch)
	fun createBatch()
	fun commit()
	fun clearCache()
}
```

### Batch persit

A batch contains model elements. Elements can be added one by one through the **addElement** operation or all reachable elements can be added through **addElementAndReachable**. The batch define a fulent API, so call can be chained like b.addElement(a).addElement(b);


```java
trait Batch {
	fun addElement(e: KMFContainer): Batch
	fun addElementAndReachable(e: KMFContainer): Batch
}
```

Available DataStores
--------------------

### DataStore API

To perform low level storage, KMF rely on a very simple DataStore API. Basically it rely on interface which can perform get, put, and remove operation.The KMF framework already offer these mapping on existing API to realize this storage.

* MemoryDataStore
* Redis (in progress)
* MapDB (in progress)
* LevelDB
* HTML5 storage (browser and nodejs only)

### Client/Server deployment

TODO

### Master/Master deployment

TODO

###Distributed high-performance deployment

TODO

### Performances

TODO
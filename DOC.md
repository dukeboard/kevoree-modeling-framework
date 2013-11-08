Kevoree Modeling Framework
=======

Models are no longer restricted to modeling environments.

The increasing use of Model@Runtime requires rich and efficient modeling frameworks.
KMF is developed to provide efficient modeling frameworks to edit, compose and synchronize models on Java and JavaScript Virtual Machines.

> Free the code from models !

Why a new framework ?
---------------

KMF generates modeling frameworks and API for JS and JVM platforms, from a domain metamodel. It also offers comparison, merge and incremental synchronisation mechanisms tuned for Runtime use, making a powerful tool for server-side storage and presentation in a simple browser. In short, KMF generate business specific API and Tools from a metamodel, ready for distributed modeling activities.
KMF give you runtime oriented features such as:

 * Dedicated to runtime usage of models
 * Memory and cpu efficient even for mobile devices
 * JS and JVM cross-compiled models
 * Efficient (partial) load/save/clone operations (XMI and JSON supported)
 * Models built-in operations (namely merge, intersection, diff)
 * Persistence model driven layers for BigData
 * Just create an Ecore file and compile it !

Getting started
===============

The easiest way to use KMF is using Maven project description and build system.

> NB : standalone compiler is coming soon !

Using your own maven project
----------------------------

To get started with KMF, you just have to create a Maven project folder in which you will place the pom and your EcoreMM.

``` xml
myProject
 |-myMetaModel.ecore
 |-pom.xml
```

Then add this in your POM:
The plugin in the Build/Plugins section:

``` xml
<plugin>
 <groupId>org.kevoree.modeling</groupId>
 <artifactId>org.kevoree.modeling.kotlin.generator.mavenplugin</artifactId>
 <version>${replace.by.last.kevoree.version}</version>
 <extensions>true</extensions>
 <executions>
  <execution>
   <id>ModelGen</id>
   <goals>
    <goal>generate</goal>
   </goals>
   <configuration>
    <!--Optional: If true, generates the modeling framework for JavaScript platform  -->
    <js>false</js>
    <!--Optional: If true, generates the modeling framework with Events capability  -->
    <events>false</events>
    <!--Optional: If true, generates `findByQuery` methods. Only available for Java generation (no JavaScript)  -->
    <selector>false</selector>
   </configuration>
  </execution>
 </executions>
</plugin>
```

Add the KMF MicroFramework dependency.

``` xml
        <dependency>
            <groupId>org.kevoree.modeling</groupId>
            <artifactId>org.kevoree.modeling.microframework</artifactId>
            <version>${kmf.version}</version>
        </dependency>
```

Then cd into your project folder and just `mvn clean install`.

After compilation, the JAR present in target directory will contains all needed files to build your Model@Runtime platorm.
In case of JS compilation, a JS reduced file is present in target, compatible with browser or nodejs usages. See JavaScript usage section for more details.

Using a sample project
----------------------------

TODO, add download link to the sample cloud project crosscompiled in JS and JVM


Model Events
============

Motivation
----------

Events is a way to be inform to modification into models. This low-level mechanism can be use to synchronize two different models or to synchronize a view with it's backbone model.

How to use it ?
---------------

KMF proposes an option event in its Maven pluggin.
If this option is set to `true`, the code generator generates all necessary methods and class to provide a listener mechanism to all the features of your Metamodel.

``` xml
   <events>true</events>
```

API description
---------------

#ModelEvent class
Each modification in models now produce events through the API class ModelEvent. It contains the following attributes:

Events are generated when:
* Attributes are `set`
* References are `set`, `added` or `removed` (the two last are only available for references with unlimited max cardinality)
* An opposite element is modified (only if the opposite relation is set).

NB: The `source` of an event is identified by its `path()`. As a consequence, you need to specify an `ID`attribute for, at least, the element you want to listen and all its parents (in the containment hierarchy).

#ModelEvent listener

There are two types of listeners you can place on any element:
* ModelElementListener is used to get informed about changes in the attributes or in the relations of a specific model element
* ModelTreeListener is used to get informed each time an attribute or a reference is modified or set, or if a model element is added or removed somewhere under (according to the containment hierarchy) the element you place the listener on.

For instance, considering a very simple Finite State Machine metamodel (FSM<>--State<>--Transition<>--Action).
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




Extends model though code
=========================

Motivation
----------

MOF structure of your models like describes in .ecore files only reflect the structural way to store models.
Indeed ecore format allows you to define operations into models, however these methods need an operation language to define it.

KMF rely on Kotlin execution language to express model behaviors. Kotlin language is cross compilable to JS and JVM so such behavior can work in JVM but as well in browser or nodejs platform.
KMF rely on a bi-directional synchronization between code and model (ecore files). As result you can define behavior in code (.kt files) to eOperation declared in .ecore files but in addition you can declare method and new meta class directly from the code.

Use code or model first as needed in your project, but remains one rule, models are domain definition and technical details should be hidden in code.

How to use it ?
----------

Let's take as example a simple FSM metamodel (you can found it [here](https://github.com/dukeboard/kevoree-modeling-framework/tree/master/metamodel/fsm/org.kevoree.modeling.sample.fsm.kt) )

In this metamodel we add an operation `run` to the metaclass `Action`

Then, you can declare in your src/main/java directory several Kotlin traits implementing the generated interface

An example can be found [here](https://github.com/dukeboard/kevoree-modeling-framework/blob/master/metamodel/fsm/org.kevoree.modeling.sample.fsm.kt/src/main/java/org/jetbrains/annotations/MyAspect.kt).

``` java
    public aspect trait MyAspect : Action {
        override fun run(p : Boolean): String {return "";}

        private fun internalStuff(){}
    }
```

Then you compile your project and the resulting Java .class or JavaScript .js files will have all your traits directly woven in the compiled code.

Aspect keyword is an annotation meaning that the aspect must mixed with the meta class : Action.
If you define a new operation by adding a **fun** definition, it is directly added in the MetaModel as a new operation (be careful the API will change and you will have to add the override keyword).

Private function will remain private to the aspect and will not be pushed in the ecore model.

In short, you can now call the method run on any of your Action object, in the JVM or in the JS version.

You can also add a new MetaClass using the same mechanism, juste by using the **meta** keyword.

``` java
    public meta trait MyMetaClassName : Action {
        override fun myFct(): {return "";}
    }
```

This means that you add a new metaclass named **MyMetaClassName** with superclass **Action**.

TODO

Using JavaScript compiled models
================================

use in NodeJS runtime
---------------------

The KMF maven plugin generates into the target directory a file named : <artefactID>.min.js.
This file is ready to be included as a nodeJS module.

To load it, you only have to call the include directive of nodeJS:

``` js
    var model = require('./org.kevoree.modeling.sample.cloud.js.min.js');
```

And use all KMF generated classes as follows:

``` js
var saver = new model.org.cloud.serializer.JSONModelSerializer();
var loader = new model.org.cloud.loader.JSONModelLoader();
```

Of course replace org.cloud by the generated package specified in your model.

use in browsers
---------------

TODO

Model based BigData
===================

What is BigModel ?
------------------

TODO

Persistence package API
-----------------------

TODO

Available DataStores
--------------------

MemoryDataStore

MapDB

For JVM Off-heap memory usage

LevelDB for performance

TODO

Client/Server deployment
--------------------

TODO

Master/Master deployment
------------------

TODO

Distributed high-performance deployment
----------------------------------

TODO

Performances
------------

TODO
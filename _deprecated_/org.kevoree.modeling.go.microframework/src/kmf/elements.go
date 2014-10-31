package kmf

import "container/list"

type ModelElement interface {
	Parent() ModelElement
	Delete()
	Equals(obj ModelElement) bool
	DeepEquals(obj ModelElement) bool
	getRefInParent() string
	FindByPath(query string) ModelElement
	FindByID(relationName string, idP string) ModelElement
	Path() string
	MetaClassName() string
	reflexiveMutator(mutatorType ActionType, refName string, value, setOpposite  bool, fireEvent  bool)
	addModelElementListener(lst  ModelElementListener)
	removeModelElementListener(lst  ModelElementListener)
	removeAllModelElementListeners()
	addModelTreeListener(lst  ModelElementListener)
	removeModelTreeListener(lst  ModelElementListener)
	removeAllModelTreeListeners()
	visit(visitor ModelVisitor, recursive  bool, containedReference  bool, nonContainedReference  bool)
	visitAttributes(visitor ModelAttributeVisitor)
	//createTraces(similarObj KMFContainer, isInter  bool, isMerge  bool, onlyReferences  bool, onlyAttributes  bool)  List
	//toTraces(attributes  bool, references  bool)  List
}

type ModelElementFactory interface {
	Create(name string) ModelElement
}

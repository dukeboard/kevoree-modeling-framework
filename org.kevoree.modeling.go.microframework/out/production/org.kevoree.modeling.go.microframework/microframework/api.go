/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 15/12/2013
 * Time: 09:49
 */
package microframework

import "microframework/event"
import "microframework/visitor"
import "container/list"

type ActionType int

const (
	SET ActionType = iota
	ADD
	REMOVE
	ADD_ALL
	REMOVE_ALL
	RENEW_INDEX
)

type ElementAttributeType int

const(
ATTRIBUTE ElementAttributeType  = iota
REFERENCE
CONTAINMENT
)

type KMFContainer interface {
	setRecursiveReadOnly()
	eContainer() KMFContainer
 	isReadOnly() bool
 	isRecursiveReadOnly() bool
 	setInternalReadOnly()
 	delete()
 	modelEquals(similarObj KMFContainer) bool
 	deepModelEquals(similarObj KMFContainer) bool
 	getRefInParent() string
 	findByPath(query string) KMFContainer
 	findByID(relationName string,idP string) KMFContainer
	path() string
 	metaClassName() string
 	reflexiveMutator(mutatorType ActionType, refName string, value, setOpposite  bool, fireEvent  bool)
 	selectByQuery(query string) List
 	addModelElementListener(lst  ModelElementListener)
 	removeModelElementListener(lst  ModelElementListener )
 	removeAllModelElementListeners()
 	addModelTreeListener(lst  ModelElementListener)
 	removeModelTreeListener(lst  ModelElementListener)
 	removeAllModelTreeListeners()
 	visit(visitor ModelVisitor, recursive  bool, containedReference  bool,nonContainedReference  bool)
 	visitAttributes(visitor ModelAttributeVisitor)
 	createTraces(similarObj KMFContainer, isInter  bool, isMerge  bool, onlyReferences  bool, onlyAttributes  bool)  List
 	toTraces(attributes  bool, references  bool)  List
}


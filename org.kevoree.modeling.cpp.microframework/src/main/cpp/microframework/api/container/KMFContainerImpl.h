#ifndef KMFContainer_IMPL_H
#define KMFContainer_IMPL_H

#include <microframework/api/KMFContainer.h>
#include <microframework/api/container/RemoveFromContainerCommand.h>
#include <microframework/api/container/KMFContainerVisitors.h>
#include <microframework/api/utils/Utils.h>
#include <microframework/api/container/TotracesVisitors.h>

using std::string;
using std::list;

/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */


class KMFContainerImpl : public KMFContainer
{

public:
	KMFContainerImpl();
	~KMFContainerImpl();
	KMFContainer* eContainer();
	string getRefInParent();
	string path();
	KMFContainer* findByPath(string query);
	void setEContainer(KMFContainerImpl *container,RemoveFromContainerCommand *unsetCmd,string refNameInParent);
	list<ModelTrace*>* createTraces(KMFContainer *similarObj ,bool isInter ,bool isMerge ,bool onlyReferences,bool onlyAttributes );
	void clean_path_cache();
	template <class A>
	A* findByPath(string query,A clazz);
	list<ModelTrace*> * toTraces(bool attributes,bool references);

protected :
	void  internal_visit(ModelVisitor *visitor,KMFContainer *internalElem,bool recursive,bool containedReference,bool nonContainedReference,string refName);
	RemoveFromContainerCommand *internal_unsetCmd;
	KMFContainer *internal_eContainer;
	std::string internal_containmentRefName;
	bool internal_readOnlyElem;
	bool internal_recursive_readOnlyElem;
	list<ModelElementListener> internal_modelElementListeners;
	list<ModelElementListener> internal_modelTreeListeners;
	std::string path_cache;

};



#endif

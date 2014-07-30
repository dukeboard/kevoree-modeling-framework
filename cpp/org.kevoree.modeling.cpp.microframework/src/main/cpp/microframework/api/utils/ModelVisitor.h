#ifndef __ModelVisitor_H
#define __ModelVisitor_H

#include <microframework/api/utils/any.h>
#include <string>
#include <unordered_map>

using std::string;
class KMFContainer;
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class ModelVisitor
{

public:
	ModelVisitor();
	void stopVisit();
	void noChildrenVisit();
	void noReferencesVisit();
	virtual void visit(KMFContainer *elem,string refNameInParent, KMFContainer* parent)=0;
	virtual void beginVisitElem(KMFContainer *elem){}
	virtual void endVisitElem(KMFContainer *elem){}
	virtual void beginVisitRef(string refName,string refType){}
	virtual void endVisitRef(string refName){}

	bool visitStopped; // false
	bool visitChildren; // true
	bool visitReferences; // true;
	std::unordered_map<string,KMFContainer*> alreadyVisited;
};





#endif

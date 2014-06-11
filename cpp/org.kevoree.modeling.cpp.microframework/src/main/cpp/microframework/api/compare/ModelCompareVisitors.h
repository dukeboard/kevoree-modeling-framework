#ifndef __ModelCompareVisitors_H
#define __ModelCompareVisitors_H

/**
 * Author: jedartois@gmail.com
 * Date: 31/11/13
 * Time: 9:14
 */

#include <microframework/api/KMFContainer.h>
#include <map>
#include <list>
#include <string>
class ModelCompareVisitorFiller:public ModelVisitor
{
public:
	ModelCompareVisitorFiller (std::map<std::string,KMFContainer*> *_objectsMap);
	~ModelCompareVisitorFiller();
	void visit (KMFContainer * elem, std::string refNameInParent,KMFContainer * parent);
private:
	std::map<std::string,KMFContainer*> *objectsMap;
};


class ModelCompareVisitorCreateTraces:public ModelVisitor
{

public:
	ModelCompareVisitorCreateTraces (std::map<std::string,KMFContainer*> *_objectsMap, bool _inter,bool _merge,std::list<ModelTrace *> *_traces,std::list<ModelTrace *> *_tracesRef);
	~ModelCompareVisitorCreateTraces();
	void visit (KMFContainer * elem, std::string refNameInParent,KMFContainer * parent);
private:
	std::map<std::string,KMFContainer*> *objectsMap;
	std::list < ModelTrace * > *traces;
	std::list < ModelTrace * > *tracesRef;
	bool inter;
	bool merge;
};
#endif

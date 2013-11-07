#ifndef __GroupType_H
#define __GroupType_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "LifeCycleTypeDefinition.h"
class GroupType : public LifeCycleTypeDefinition{ 
public:
std::string internalGetKey();
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
GroupType();

~GroupType();

}; // END CLASS 
#endif

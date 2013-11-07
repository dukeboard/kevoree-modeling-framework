#ifndef __LifeCycleTypeDefinition_H
#define __LifeCycleTypeDefinition_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "TypeDefinition.h"
class LifeCycleTypeDefinition : public TypeDefinition{ 
public:
std::string startMethod;
std::string stopMethod;
std::string updateMethod;
std::string internalGetKey();
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
LifeCycleTypeDefinition();

~LifeCycleTypeDefinition();

}; // END CLASS 
#endif

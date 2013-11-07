#ifndef __TypedElement_H
#define __TypedElement_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "NamedElement.h"
class TypedElement : public NamedElement{ 
public:
google::dense_hash_map<string,TypedElement*> genericTypes; 
std::string internalGetKey();
TypedElement *findgenericTypesByID(std::string id);
void addgenericTypes(TypedElement *ptr);
void removegenericTypes(TypedElement *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
TypedElement();

~TypedElement();

}; // END CLASS 
#endif

#ifndef __MessagePortType_H
#define __MessagePortType_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "PortType.h"
class TypedElement;

class MessagePortType : public PortType{ 
public:
google::dense_hash_map<string,TypedElement*> filters; 
std::string internalGetKey();
TypedElement *findfiltersByID(std::string id);
void addfilters(TypedElement *ptr);
void removefilters(TypedElement *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
MessagePortType();

~MessagePortType();

}; // END CLASS 
#endif

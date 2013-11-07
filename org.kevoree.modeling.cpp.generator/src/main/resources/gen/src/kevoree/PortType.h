#ifndef __PortType_H
#define __PortType_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "TypeDefinition.h"
class PortType : public TypeDefinition{ 
public:
bool synchrone;
std::string internalGetKey();
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
PortType();

~PortType();

}; // END CLASS 
#endif

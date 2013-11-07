#ifndef __NetworkProperty_H
#define __NetworkProperty_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "NamedElement.h"
class NetworkProperty : public NamedElement{ 
public:
std::string value;
std::string lastCheck;
std::string internalGetKey();
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
NetworkProperty();

~NetworkProperty();

}; // END CLASS 
#endif

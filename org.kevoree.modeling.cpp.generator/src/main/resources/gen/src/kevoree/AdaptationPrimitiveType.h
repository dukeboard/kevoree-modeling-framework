#ifndef __AdaptationPrimitiveType_H
#define __AdaptationPrimitiveType_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "NamedElement.h"
class AdaptationPrimitiveType : public NamedElement{ 
public:
std::string internalGetKey();
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
AdaptationPrimitiveType();

~AdaptationPrimitiveType();

}; // END CLASS 
#endif

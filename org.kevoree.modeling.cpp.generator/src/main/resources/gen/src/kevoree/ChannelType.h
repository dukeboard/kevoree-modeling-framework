#ifndef __ChannelType_H
#define __ChannelType_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "LifeCycleTypeDefinition.h"
class ChannelType : public LifeCycleTypeDefinition{ 
public:
int lowerBindings;
int upperBindings;
int lowerFragments;
int upperFragments;
std::string internalGetKey();
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
ChannelType();

~ChannelType();

}; // END CLASS 
#endif

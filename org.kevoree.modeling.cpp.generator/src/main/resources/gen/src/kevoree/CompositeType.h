#ifndef __CompositeType_H
#define __CompositeType_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "ComponentType.h"
class ComponentType;

class Wire;

class CompositeType : public ComponentType{ 
public:
google::dense_hash_map<string,ComponentType*> childs; 
google::dense_hash_map<string,Wire*> wires; 
std::string internalGetKey();
ComponentType *findchildsByID(std::string id);
Wire *findwiresByID(std::string id);
void addchilds(ComponentType *ptr);
void addwires(Wire *ptr);
void removechilds(ComponentType *ptr);
void removewires(Wire *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
CompositeType();

~CompositeType();

}; // END CLASS 
#endif

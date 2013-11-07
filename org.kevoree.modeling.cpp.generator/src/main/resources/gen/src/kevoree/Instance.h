#ifndef __Instance_H
#define __Instance_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "NamedElement.h"
class TypeDefinition;

class Dictionary;

class Instance : public NamedElement{ 
public:
std::string metaData;
bool started;
TypeDefinition *typeDefinition; 
Dictionary *dictionary; 
std::string internalGetKey();
void addtypeDefinition(TypeDefinition *ptr);
void adddictionary(Dictionary *ptr);
void removetypeDefinition(TypeDefinition *ptr);
void removedictionary(Dictionary *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
Instance();

~Instance();

}; // END CLASS 
#endif

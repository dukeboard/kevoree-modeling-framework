#ifndef __TypeLibrary_H
#define __TypeLibrary_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "NamedElement.h"
class TypeDefinition;

class TypeLibrary : public NamedElement{ 
public:
google::dense_hash_map<string,TypeDefinition*> subTypes; 
std::string internalGetKey();
TypeDefinition *findsubTypesByID(std::string id);
void addsubTypes(TypeDefinition *ptr);
void removesubTypes(TypeDefinition *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
TypeLibrary();

~TypeLibrary();

}; // END CLASS 
#endif

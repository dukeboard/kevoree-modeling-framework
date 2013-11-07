#ifndef __TypeDefinition_H
#define __TypeDefinition_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "NamedElement.h"
class DeployUnit;

class DictionaryType;

class TypeDefinition : public NamedElement{ 
public:
std::string factoryBean;
std::string bean;
bool abstract;
google::dense_hash_map<string,DeployUnit*> deployUnits; 
DictionaryType *dictionaryType; 
google::dense_hash_map<string,TypeDefinition*> superTypes; 
std::string internalGetKey();
DeployUnit *finddeployUnitsByID(std::string id);
TypeDefinition *findsuperTypesByID(std::string id);
void adddeployUnits(DeployUnit *ptr);
void adddictionaryType(DictionaryType *ptr);
void addsuperTypes(TypeDefinition *ptr);
void removedeployUnits(DeployUnit *ptr);
void removedictionaryType(DictionaryType *ptr);
void removesuperTypes(TypeDefinition *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
TypeDefinition();

~TypeDefinition();

}; // END CLASS 
#endif

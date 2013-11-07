#ifndef __ComponentType_H
#define __ComponentType_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "LifeCycleTypeDefinition.h"
class PortTypeRef;

class IntegrationPattern;

class ExtraFonctionalProperty;

class PortTypeRef;

class ComponentType : public LifeCycleTypeDefinition{ 
public:
google::dense_hash_map<string,PortTypeRef*> required; 
google::dense_hash_map<string,IntegrationPattern*> integrationPatterns; 
ExtraFonctionalProperty *extraFonctionalProperties; 
google::dense_hash_map<string,PortTypeRef*> provided; 
std::string internalGetKey();
PortTypeRef *findrequiredByID(std::string id);
IntegrationPattern *findintegrationPatternsByID(std::string id);
PortTypeRef *findprovidedByID(std::string id);
void addrequired(PortTypeRef *ptr);
void addintegrationPatterns(IntegrationPattern *ptr);
void addextraFonctionalProperties(ExtraFonctionalProperty *ptr);
void addprovided(PortTypeRef *ptr);
void removerequired(PortTypeRef *ptr);
void removeintegrationPatterns(IntegrationPattern *ptr);
void removeextraFonctionalProperties(ExtraFonctionalProperty *ptr);
void removeprovided(PortTypeRef *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
ComponentType();

~ComponentType();

}; // END CLASS 
#endif

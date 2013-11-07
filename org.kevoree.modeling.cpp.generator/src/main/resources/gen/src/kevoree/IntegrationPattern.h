#ifndef __IntegrationPattern_H
#define __IntegrationPattern_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "NamedElement.h"
class ExtraFonctionalProperty;

class PortTypeRef;

class IntegrationPattern : public NamedElement{ 
public:
google::dense_hash_map<string,ExtraFonctionalProperty*> extraFonctionalProperties; 
google::dense_hash_map<string,PortTypeRef*> portTypes; 
std::string internalGetKey();
ExtraFonctionalProperty *findextraFonctionalPropertiesByID(std::string id);
PortTypeRef *findportTypesByID(std::string id);
void addextraFonctionalProperties(ExtraFonctionalProperty *ptr);
void addportTypes(PortTypeRef *ptr);
void removeextraFonctionalProperties(ExtraFonctionalProperty *ptr);
void removeportTypes(PortTypeRef *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
IntegrationPattern();

~IntegrationPattern();

}; // END CLASS 
#endif

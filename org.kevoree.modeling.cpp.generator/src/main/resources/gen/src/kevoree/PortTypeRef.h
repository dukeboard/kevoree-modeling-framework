#ifndef __PortTypeRef_H
#define __PortTypeRef_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "NamedElement.h"
class PortType;

class PortTypeMapping;

class PortTypeRef : public NamedElement{ 
public:
short optional;
short noDependency;
PortType *ref; 
google::dense_hash_map<string,PortTypeMapping*> mappings; 
std::string internalGetKey();
PortTypeMapping *findmappingsByID(std::string id);
void addref(PortType *ptr);
void addmappings(PortTypeMapping *ptr);
void removeref(PortType *ptr);
void removemappings(PortTypeMapping *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
PortTypeRef();

~PortTypeRef();

}; // END CLASS 
#endif

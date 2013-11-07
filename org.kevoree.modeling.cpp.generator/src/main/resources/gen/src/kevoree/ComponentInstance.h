#ifndef __ComponentInstance_H
#define __ComponentInstance_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "Instance.h"
class Port;

class Port;

class _Namespace;

class ComponentInstance : public Instance{ 
public:
google::dense_hash_map<string,Port*> provided; 
google::dense_hash_map<string,Port*> required; 
_Namespace *_namespace; 
std::string internalGetKey();
Port *findprovidedByID(std::string id);
Port *findrequiredByID(std::string id);
void addprovided(Port *ptr);
void addrequired(Port *ptr);
void add_namespace(_Namespace *ptr);
void removeprovided(Port *ptr);
void removerequired(Port *ptr);
void remove_namespace(_Namespace *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
ComponentInstance();

~ComponentInstance();

}; // END CLASS 
#endif

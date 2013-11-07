#ifndef __ServicePortType_H
#define __ServicePortType_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "PortType.h"
class Operation;

class ServicePortType : public PortType{ 
public:
std::string interface;
google::dense_hash_map<string,Operation*> operations; 
std::string internalGetKey();
Operation *findoperationsByID(std::string id);
void addoperations(Operation *ptr);
void removeoperations(Operation *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
ServicePortType();

~ServicePortType();

}; // END CLASS 
#endif

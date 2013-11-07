#ifndef __DeployUnit_H
#define __DeployUnit_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "NamedElement.h"
class NodeType;

class DeployUnit : public NamedElement{ 
public:
std::string groupName;
std::string version;
std::string url;
std::string hashcode;
std::string type;
google::dense_hash_map<string,DeployUnit*> requiredLibs; 
NodeType *targetNodeType; 
std::string internalGetKey();
DeployUnit *findrequiredLibsByID(std::string id);
void addrequiredLibs(DeployUnit *ptr);
void addtargetNodeType(NodeType *ptr);
void removerequiredLibs(DeployUnit *ptr);
void removetargetNodeType(NodeType *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
DeployUnit();

~DeployUnit();

}; // END CLASS 
#endif

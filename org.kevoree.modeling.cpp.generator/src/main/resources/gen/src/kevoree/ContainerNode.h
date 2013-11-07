#ifndef __ContainerNode_H
#define __ContainerNode_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "Instance.h"
class ComponentInstance;

class Group;

class ContainerNode : public Instance{ 
public:
google::dense_hash_map<string,ComponentInstance*> components; 
google::dense_hash_map<string,ContainerNode*> hosts; 
ContainerNode *host; 
google::dense_hash_map<string,Group*> groups; 
std::string internalGetKey();
ComponentInstance *findcomponentsByID(std::string id);
ContainerNode *findhostsByID(std::string id);
Group *findgroupsByID(std::string id);
void addcomponents(ComponentInstance *ptr);
void addhosts(ContainerNode *ptr);
void addhost(ContainerNode *ptr);
void addgroups(Group *ptr);
void removecomponents(ComponentInstance *ptr);
void removehosts(ContainerNode *ptr);
void removehost(ContainerNode *ptr);
void removegroups(Group *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
ContainerNode();

~ContainerNode();

}; // END CLASS 
#endif

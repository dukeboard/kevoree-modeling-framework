#ifndef __Group_H
#define __Group_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "Instance.h"
class ContainerNode;

class Group : public Instance{ 
public:
google::dense_hash_map<string,ContainerNode*> subNodes; 
std::string internalGetKey();
ContainerNode *findsubNodesByID(std::string id);
void addsubNodes(ContainerNode *ptr);
void removesubNodes(ContainerNode *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
Group();

~Group();

}; // END CLASS 
#endif

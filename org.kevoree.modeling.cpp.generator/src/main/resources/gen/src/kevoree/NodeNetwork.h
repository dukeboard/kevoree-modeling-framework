#ifndef __NodeNetwork_H
#define __NodeNetwork_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class NodeLink;

class ContainerNode;

class ContainerNode;

class NodeNetwork : public KMFContainerImpl{ 
public:
std::string generated_KMF_ID;
google::dense_hash_map<string,NodeLink*> link; 
ContainerNode *initBy; 
ContainerNode *target; 
std::string internalGetKey();
NodeLink *findlinkByID(std::string id);
void addlink(NodeLink *ptr);
void addinitBy(ContainerNode *ptr);
void addtarget(ContainerNode *ptr);
void removelink(NodeLink *ptr);
void removeinitBy(ContainerNode *ptr);
void removetarget(ContainerNode *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
NodeNetwork();

~NodeNetwork();

}; // END CLASS 
#endif

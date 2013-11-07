#ifndef __ContainerRoot_H
#define __ContainerRoot_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class ContainerNode;

class TypeDefinition;

class Repository;

class TypedElement;

class TypeLibrary;

class Channel;

class MBinding;

class DeployUnit;

class NodeNetwork;

class Group;

class AdaptationPrimitiveType;

class ContainerRoot : public KMFContainerImpl{ 
public:
std::string generated_KMF_ID;
google::dense_hash_map<string,ContainerNode*> nodes; 
google::dense_hash_map<string,TypeDefinition*> typeDefinitions; 
google::dense_hash_map<string,Repository*> repositories; 
google::dense_hash_map<string,TypedElement*> dataTypes; 
google::dense_hash_map<string,TypeLibrary*> libraries; 
google::dense_hash_map<string,Channel*> hubs; 
google::dense_hash_map<string,MBinding*> mBindings; 
google::dense_hash_map<string,DeployUnit*> deployUnits; 
google::dense_hash_map<string,NodeNetwork*> nodeNetworks; 
google::dense_hash_map<string,Group*> groups; 
google::dense_hash_map<string,AdaptationPrimitiveType*> adaptationPrimitiveTypes; 
std::string internalGetKey();
ContainerNode *findnodesByID(std::string id);
TypeDefinition *findtypeDefinitionsByID(std::string id);
Repository *findrepositoriesByID(std::string id);
TypedElement *finddataTypesByID(std::string id);
TypeLibrary *findlibrariesByID(std::string id);
Channel *findhubsByID(std::string id);
MBinding *findmBindingsByID(std::string id);
DeployUnit *finddeployUnitsByID(std::string id);
NodeNetwork *findnodeNetworksByID(std::string id);
Group *findgroupsByID(std::string id);
AdaptationPrimitiveType *findadaptationPrimitiveTypesByID(std::string id);
void addnodes(ContainerNode *ptr);
void addtypeDefinitions(TypeDefinition *ptr);
void addrepositories(Repository *ptr);
void adddataTypes(TypedElement *ptr);
void addlibraries(TypeLibrary *ptr);
void addhubs(Channel *ptr);
void addmBindings(MBinding *ptr);
void adddeployUnits(DeployUnit *ptr);
void addnodeNetworks(NodeNetwork *ptr);
void addgroups(Group *ptr);
void addadaptationPrimitiveTypes(AdaptationPrimitiveType *ptr);
void removenodes(ContainerNode *ptr);
void removetypeDefinitions(TypeDefinition *ptr);
void removerepositories(Repository *ptr);
void removedataTypes(TypedElement *ptr);
void removelibraries(TypeLibrary *ptr);
void removehubs(Channel *ptr);
void removemBindings(MBinding *ptr);
void removedeployUnits(DeployUnit *ptr);
void removenodeNetworks(NodeNetwork *ptr);
void removegroups(Group *ptr);
void removeadaptationPrimitiveTypes(AdaptationPrimitiveType *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
ContainerRoot();

~ContainerRoot();

}; // END CLASS 
#endif

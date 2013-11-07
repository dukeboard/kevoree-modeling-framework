#ifndef __NodeLink_H
#define __NodeLink_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class NetworkProperty;

class NodeLink : public KMFContainerImpl{ 
public:
std::string networkType;
int estimatedRate;
std::string lastCheck;
std::string zoneID;
std::string generated_KMF_ID;
google::dense_hash_map<string,NetworkProperty*> networkProperties; 
std::string internalGetKey();
NetworkProperty *findnetworkPropertiesByID(std::string id);
void addnetworkProperties(NetworkProperty *ptr);
void removenetworkProperties(NetworkProperty *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
NodeLink();

~NodeLink();

}; // END CLASS 
#endif

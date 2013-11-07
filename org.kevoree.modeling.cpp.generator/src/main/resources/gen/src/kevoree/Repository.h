#ifndef __Repository_H
#define __Repository_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class DeployUnit;

class Repository : public KMFContainerImpl{ 
public:
std::string url;
google::dense_hash_map<string,DeployUnit*> units; 
std::string internalGetKey();
DeployUnit *findunitsByID(std::string id);
void addunits(DeployUnit *ptr);
void removeunits(DeployUnit *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
Repository();

~Repository();

}; // END CLASS 
#endif

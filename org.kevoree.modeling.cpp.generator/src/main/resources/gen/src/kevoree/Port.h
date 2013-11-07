#ifndef __Port_H
#define __Port_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class MBinding;

class PortTypeRef;

class Port : public KMFContainerImpl{ 
public:
std::string generated_KMF_ID;
google::dense_hash_map<string,MBinding*> bindings; 
PortTypeRef *portTypeRef; 
std::string internalGetKey();
MBinding *findbindingsByID(std::string id);
void addbindings(MBinding *ptr);
void addportTypeRef(PortTypeRef *ptr);
void removebindings(MBinding *ptr);
void removeportTypeRef(PortTypeRef *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
Port();

~Port();

}; // END CLASS 
#endif

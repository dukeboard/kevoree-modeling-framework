#ifndef __Wire_H
#define __Wire_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class PortTypeRef;

class Wire : public KMFContainerImpl{ 
public:
std::string generated_KMF_ID;
PortTypeRef *ports; 
std::string internalGetKey();
void addports(PortTypeRef *ptr);
void removeports(PortTypeRef *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
Wire();

~Wire();

}; // END CLASS 
#endif

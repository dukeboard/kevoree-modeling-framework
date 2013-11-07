#ifndef __MBinding_H
#define __MBinding_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class Port;

class Channel;

class MBinding : public KMFContainerImpl{ 
public:
std::string generated_KMF_ID;
Port *port; 
Channel *hub; 
std::string internalGetKey();
void addport(Port *ptr);
void addhub(Channel *ptr);
void removeport(Port *ptr);
void removehub(Channel *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
MBinding();

~MBinding();

}; // END CLASS 
#endif

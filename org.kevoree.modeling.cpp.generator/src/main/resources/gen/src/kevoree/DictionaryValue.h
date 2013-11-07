#ifndef __DictionaryValue_H
#define __DictionaryValue_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class DictionaryAttribute;

class ContainerNode;

class DictionaryValue : public KMFContainerImpl{ 
public:
std::string value;
std::string generated_KMF_ID;
DictionaryAttribute *attribute; 
ContainerNode *targetNode; 
std::string internalGetKey();
void addattribute(DictionaryAttribute *ptr);
void addtargetNode(ContainerNode *ptr);
void removeattribute(DictionaryAttribute *ptr);
void removetargetNode(ContainerNode *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
DictionaryValue();

~DictionaryValue();

}; // END CLASS 
#endif

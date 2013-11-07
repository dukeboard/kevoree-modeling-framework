#ifndef __Dictionary_H
#define __Dictionary_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class DictionaryValue;

class Dictionary : public KMFContainerImpl{ 
public:
std::string generated_KMF_ID;
google::dense_hash_map<string,DictionaryValue*> values; 
std::string internalGetKey();
DictionaryValue *findvaluesByID(std::string id);
void addvalues(DictionaryValue *ptr);
void removevalues(DictionaryValue *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
Dictionary();

~Dictionary();

}; // END CLASS 
#endif

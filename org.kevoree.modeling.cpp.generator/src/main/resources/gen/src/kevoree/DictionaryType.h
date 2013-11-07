#ifndef __DictionaryType_H
#define __DictionaryType_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class DictionaryAttribute;

class DictionaryValue;

class DictionaryType : public KMFContainerImpl{ 
public:
std::string generated_KMF_ID;
google::dense_hash_map<string,DictionaryAttribute*> attributes; 
google::dense_hash_map<string,DictionaryValue*> defaultValues; 
std::string internalGetKey();
DictionaryAttribute *findattributesByID(std::string id);
DictionaryValue *finddefaultValuesByID(std::string id);
void addattributes(DictionaryAttribute *ptr);
void adddefaultValues(DictionaryValue *ptr);
void removeattributes(DictionaryAttribute *ptr);
void removedefaultValues(DictionaryValue *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
DictionaryType();

~DictionaryType();

}; // END CLASS 
#endif

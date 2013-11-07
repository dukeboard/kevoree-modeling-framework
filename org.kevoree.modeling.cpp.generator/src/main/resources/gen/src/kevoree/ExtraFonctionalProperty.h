#ifndef __ExtraFonctionalProperty_H
#define __ExtraFonctionalProperty_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class PortTypeRef;

class ExtraFonctionalProperty : public KMFContainerImpl{ 
public:
std::string generated_KMF_ID;
google::dense_hash_map<string,PortTypeRef*> portTypes; 
std::string internalGetKey();
PortTypeRef *findportTypesByID(std::string id);
void addportTypes(PortTypeRef *ptr);
void removeportTypes(PortTypeRef *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
ExtraFonctionalProperty();

~ExtraFonctionalProperty();

}; // END CLASS 
#endif

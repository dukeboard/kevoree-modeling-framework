#ifndef __AdaptationPrimitiveTypeRef_H
#define __AdaptationPrimitiveTypeRef_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class AdaptationPrimitiveType;

class AdaptationPrimitiveTypeRef : public KMFContainerImpl{ 
public:
std::string maxTime;
std::string generated_KMF_ID;
AdaptationPrimitiveType *ref; 
std::string internalGetKey();
void addref(AdaptationPrimitiveType *ptr);
void removeref(AdaptationPrimitiveType *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
AdaptationPrimitiveTypeRef();

~AdaptationPrimitiveTypeRef();

}; // END CLASS 
#endif

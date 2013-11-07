#ifndef __NodeType_H
#define __NodeType_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "LifeCycleTypeDefinition.h"
class AdaptationPrimitiveType;

class AdaptationPrimitiveTypeRef;

class NodeType : public LifeCycleTypeDefinition{ 
public:
google::dense_hash_map<string,AdaptationPrimitiveType*> managedPrimitiveTypes; 
google::dense_hash_map<string,AdaptationPrimitiveTypeRef*> managedPrimitiveTypeRefs; 
std::string internalGetKey();
AdaptationPrimitiveType *findmanagedPrimitiveTypesByID(std::string id);
AdaptationPrimitiveTypeRef *findmanagedPrimitiveTypeRefsByID(std::string id);
void addmanagedPrimitiveTypes(AdaptationPrimitiveType *ptr);
void addmanagedPrimitiveTypeRefs(AdaptationPrimitiveTypeRef *ptr);
void removemanagedPrimitiveTypes(AdaptationPrimitiveType *ptr);
void removemanagedPrimitiveTypeRefs(AdaptationPrimitiveTypeRef *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
NodeType();

~NodeType();

}; // END CLASS 
#endif

#ifndef ___Namespace_H
#define ___Namespace_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "NamedElement.h"
class _Namespace : public NamedElement{ 
public:
google::dense_hash_map<string,_Namespace*> childs; 
_Namespace *parent; 
std::string internalGetKey();
_Namespace *findchildsByID(std::string id);
void addchilds(_Namespace *ptr);
void addparent(_Namespace *ptr);
void removechilds(_Namespace *ptr);
void removeparent(_Namespace *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
_Namespace();

~_Namespace();

}; // END CLASS 
#endif

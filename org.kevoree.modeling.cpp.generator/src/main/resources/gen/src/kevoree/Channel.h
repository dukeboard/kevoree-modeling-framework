#ifndef __Channel_H
#define __Channel_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include "Instance.h"
class MBinding;

class Channel : public Instance{ 
public:
google::dense_hash_map<string,MBinding*> bindings; 
std::string internalGetKey();
MBinding *findbindingsByID(std::string id);
void addbindings(MBinding *ptr);
void removebindings(MBinding *ptr);
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
KMFContainer* findByID(string relationName,string idP);
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
Channel();

~Channel();

}; // END CLASS 
#endif

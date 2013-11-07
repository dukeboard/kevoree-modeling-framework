#ifndef __NamedElement_H
#define __NamedElement_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class NamedElement : public KMFContainerImpl{ 
public:
std::string name;
std::string internalGetKey();
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
NamedElement();

~NamedElement();

}; // END CLASS 
#endif

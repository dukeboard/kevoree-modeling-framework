#ifndef __PortTypeMapping_H
#define __PortTypeMapping_H
#include <list>
#include <string>
#include <google/dense_hash_map>
#include <KMFContainerImpl.h>
class PortTypeMapping : public KMFContainerImpl{ 
public:
std::string beanMethodName;
std::string serviceMethodName;
std::string paramTypes;
std::string generated_KMF_ID;
std::string internalGetKey();
string metaClassName();
void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );
void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);
void visitAttributes(ModelAttributeVisitor *visitor);
PortTypeMapping();

~PortTypeMapping();

}; // END CLASS 
#endif

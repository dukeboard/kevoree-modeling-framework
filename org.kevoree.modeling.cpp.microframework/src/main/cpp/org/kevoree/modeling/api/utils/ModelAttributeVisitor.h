#ifndef _ModelAttributeVisitor_H
#define _ModelAttributeVisitor_H
#include "any.h"

#include <string>
using std::string;

class KMFContainer;

class ModelAttributeVisitor {
  public:
  void visit(any value,string name,KMFContainer *parent);
};


#endif

#ifndef KMFFactory_H
#define KMFFactory_H

#include "KMFContainer.h"
#include <string>
class KMFFactory 
{

public:
KMFContainer create(std::string metaClassName);


};


#endif

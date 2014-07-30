#ifndef KMFFactory_H
#define KMFFactory_H

#include <microframework/api/KMFContainer.h>
#include <string>
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class KMFFactory 
{

public:
virtual KMFContainer* create(std::string metaClassName)=0;

};


#endif

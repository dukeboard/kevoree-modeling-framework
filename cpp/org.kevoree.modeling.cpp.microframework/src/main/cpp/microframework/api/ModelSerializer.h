#ifndef __ModelSerializer_H
#define __ModelSerializer_H

#include <iostream>
#include <string>
#include <microframework/api/KMFContainer.h>
#include <microframework/api/container/KMFContainerImpl.h>
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class ModelSerializer 
{

public:
	virtual void serializeToStream(KMFContainer *model, iostream  raw)=0;
	virtual string serialize(KMFContainer *model)=0;
};


#endif

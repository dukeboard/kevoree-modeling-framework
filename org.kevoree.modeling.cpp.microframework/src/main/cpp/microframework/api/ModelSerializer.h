#ifndef ModelSerializer_H
#define ModelSerializer_H

#include <iostream>
#include <string>
#include <microframework/api/KMFContainer.h>
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class ModelSerializer 
{

public:
    void serializeToStream(KMFContainer *model, iostream  raw);
    string serialize(KMFContainer *model);
};


#endif

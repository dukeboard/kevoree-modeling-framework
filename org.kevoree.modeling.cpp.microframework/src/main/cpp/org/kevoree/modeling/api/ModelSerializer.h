#ifndef ModelSerializer_H
#define ModelSerializer_H

#include <iostream>
#include <string>
#include "KMFContainer.h"
class ModelSerializer 
{

public:

    void serializeToStream(KMFContainer model, iostream  raw);
    string serialize(KMFContainer model);
};


#endif

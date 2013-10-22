#ifndef ModelLoader_H
#define ModelLoader_H

#include <iostream>
#include <list>
#include "KMFContainer.h"
class ModelLoader 
{

public:
    list<KMFContainer> loadModelFromString(string str); 
    list<KMFContainer> loadModelFromStream(iostream inputStream);
};


#endif

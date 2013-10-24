#ifndef ModelLoader_H
#define ModelLoader_H

#include <iostream>
#include <list>
#include "KMFContainer.h"
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class ModelLoader 
{

public:
    list<KMFContainer> loadModelFromString(string str); 
    list<KMFContainer> loadModelFromStream(iostream inputStream);
};


#endif

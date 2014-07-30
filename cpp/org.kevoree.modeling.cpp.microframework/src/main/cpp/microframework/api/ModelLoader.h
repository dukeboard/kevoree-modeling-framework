#ifndef ModelLoader_H
#define ModelLoader_H

#include <iostream>
#include <list>
#include <microframework/api/KMFContainer.h>
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class ModelLoader 
{

public:
  virtual vector<KMFContainer*>* loadModelFromString(string str){return NULL;}
  virtual vector<KMFContainer*>* loadModelFromStream(istream &inputStream){return NULL;}
};


#endif

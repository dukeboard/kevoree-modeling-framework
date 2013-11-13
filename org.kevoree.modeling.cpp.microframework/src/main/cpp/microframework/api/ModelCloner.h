
#ifndef ModelCloner_H
#define ModelCloner_H

#include <iostream>
#include <list>
#include <KMFContainer.h>
#include <KMFFactory.h>
#include <google/dense_hash_map>

/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class ModelCloner 
{

public:
    KMFFactory mainFactory;


     virtual google::dense_hash_map<KMFContainer, KMFContainer> createContext(){}

     template <class A>
     A clone(A o,bool readOnly,bool mutableOnly);
    
    
};


#endif


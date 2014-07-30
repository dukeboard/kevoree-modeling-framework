
#ifndef ModelCloner_H
#define ModelCloner_H


#include <microframework/api/KMFContainer.h>
#include <microframework/api/KMFFactory.h>
#include <unordered_map>
#include <iostream>
#include <list>

/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class ModelCloner 
{

public:
	KMFFactory mainFactory;
	virtual std::unordered_map<KMFContainer, KMFContainer> createContext(){}
	template <class A>
	A clone(A o,bool readOnly,bool mutableOnly);
};


#endif


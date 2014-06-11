#ifndef __SINGLETON_H
#define __SINGLETON_H

#include <iostream>
template <typename T> class Singleton
{
private:
	Singleton(const Singleton<T>&){};
	Singleton& operator=(const Singleton<T>&){};
protected:
	static T* _mInstance;
	static int i; // for debugging purposes
	Singleton()
	{
		i++; // for debugging purposes
		_mInstance = this;
		// this function never called?
	};
public:
	static T& getSingleton()
	{
		return *_mInstance;
	}
	static T* getSingletonPtr()
	{
		return _mInstance;
	}
};
template <typename T> T* Singleton<T>::_mInstance;
template <typename T> int Singleton<T>::i = 0; // for debugging purposes

#endif
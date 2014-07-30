#ifndef __UUID_H
#define __UUID_H
#include <microframework/api/utils/Singleton.h>
#include <iostream>
#include <vector>
#include <stdlib.h>

class Uuid  : public Singleton<Uuid>
{
public:
	std::string generateUUID();
	char randchar();
};


#endif


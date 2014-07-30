#ifndef __RemoveFromContainerCommand_H
#define __RemoveFromContainerCommand_H


#include <microframework/api/KMFContainer.h>
#include <string>
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class RemoveFromContainerCommand
{

public:
	RemoveFromContainerCommand(KMFContainer *_target,int _mutatorType,string _refName,any _element) {
		target = _target;
		mutatorType = _mutatorType;
		refName = _refName;
		element = _element;
	}

	void run()
	{
		target->reflexiveMutator(mutatorType,refName, element,true,true);
	}
private:
	KMFContainer *target;
	int mutatorType;
	std::string refName;
	any element;

};


#endif

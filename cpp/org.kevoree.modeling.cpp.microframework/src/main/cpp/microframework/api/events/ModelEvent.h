#ifndef __ModelEvent_H
#define __ModelEvent_H

#include <string>
#include <microframework/api/utils/any.h>

using namespace std;

/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */


class ModelEvent 
{

public:

	ModelEvent(string internal_sourcePath, int internal_etype, int internal_elementAttributeType, string internal_elementAttributeName, any internal_value,any internal_previous_value);

	string getSourcePath();
	int getType();
	int getElementAttributeType();
	string getElementAttributeName();
	any getValue();
	any getPreviousValue();

	string internal_sourcePath;
	int internal_etype;
	int internal_elementAttributeType;
	string internal_elementAttributeName;
	any internal_value;
	any internal_previous_value;

};
#endif


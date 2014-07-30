#include <microframework/api/events/ModelEvent.h>
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
ModelEvent::ModelEvent(string _internal_sourcePath, int _internal_etype, int _internal_elementAttributeType, string _internal_elementAttributeName, any _internal_value,any _internal_previous_value){

	internal_sourcePath = _internal_sourcePath;
	internal_etype = _internal_etype;
	internal_elementAttributeType = _internal_elementAttributeType;
	internal_elementAttributeName= _internal_elementAttributeName;
	internal_value = _internal_value;
	internal_previous_value = _internal_previous_value;
}


string ModelEvent::getSourcePath(){
	return internal_sourcePath;
}

int ModelEvent::getType(){
	return internal_etype;
}

int ModelEvent::getElementAttributeType(){
	return internal_elementAttributeType;
}
string ModelEvent::getElementAttributeName(){
	return internal_elementAttributeName;
}
any ModelEvent::getValue(){
	return internal_value;
}
any ModelEvent::getPreviousValue(){
	return internal_previous_value;
}

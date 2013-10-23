
#include <string>
#include "../utils/any.h"
using namespace std;




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


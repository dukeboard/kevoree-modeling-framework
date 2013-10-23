
#include <string>
using namespace std;


class ModelEvent 
{

public:

 ModelEvent(string internal_sourcePath, int internal_etype, int internal_elementAttributeType, string internal_elementAttributeName, void *internal_value);
 
 
 string internal_sourcePath;
 int internal_etype;
 int internal_elementAttributeType;
 string internal_elementAttributeName;
 // internal_value: Any? TODO
 //val internal_previous_value: Any?) {

};


#ifndef TraceConverter_H
#define TraceConverter_H
#include "ModelTrace.h"

class TraceConverter
{
public:
     virtual ModelTrace* convert(ModelTrace *input)= 0;   
};

#endif

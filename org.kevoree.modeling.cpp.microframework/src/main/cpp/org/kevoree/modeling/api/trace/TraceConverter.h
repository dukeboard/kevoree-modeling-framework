#ifndef TraceConverter_H
#define TraceConverter_H
#include "ModelTrace.h"
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class TraceConverter
{
public:
     virtual ModelTrace* convert(ModelTrace *input)= 0;   
};

#endif

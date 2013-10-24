#ifndef __Event2Trace_H
#define __Event2Trace_H

#include "../compare/ModelCompare.h"
#include "../ModelEvent.h"
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class Event2Trace
{
  public:
  Event2Trace(ModelCompare compare);
   TraceSequence convert(ModelEvent event);
   TraceSequence inverse(ModelEvent event);


};

#endif
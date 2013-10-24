#ifndef __Event2Trace_H
#define __Event2Trace_H

#include "../compare/ModelCompare.h"
#include "../ModelEvent.h"

class Event2Trace
{
  public:
  Event2Trace(ModelCompare compare);
   TraceSequence convert(ModelEvent event);
   TraceSequence inverse(ModelEvent event);


};

#endif
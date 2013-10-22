#include "TraceSequence.h"

#include <list>



TraceSequence* TraceSequence::populate(std::list<ModelTrace> addtraces){  
	     std::copy(addtraces.begin(), addtraces.end(), std::back_insert_iterator<std::list<ModelTrace> >(traces)); // adall
        return this;	
}

    
void TraceSequence::append(TraceSequence seq){
	 std::copy(seq.traces.begin(), seq.traces.end(), std::back_insert_iterator<std::list<ModelTrace> >(traces)); // adall
}



TraceSequence TraceSequence::populateFromString(string addtracesTxt){
		
		
}

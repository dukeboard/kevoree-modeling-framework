

#include "../trace/TraceSequence.h"
#include "../KMFContainer.h"

class ModelCompare 
{

public:
    TraceSequence createSequence();
	TraceSequence diff(KMFContainer origin,KMFContainer target);
	TraceSequence merge(KMFContainer origin,KMFContainer target);
	TraceSequence inter(KMFContainer origin,KMFContainer target);

};

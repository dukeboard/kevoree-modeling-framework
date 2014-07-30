#ifndef ModelCompare_H
#define ModelCompare_H
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
#include <microframework/api/trace/TraceSequence.h>
#include <microframework/api/KMFContainer.h>
#include <list>

class ModelCompare
{

public:
	~ModelCompare(){ }
	TraceSequence* createSequence ();
	TraceSequence* diff (KMFContainer *origin, KMFContainer *target);
	TraceSequence* merge (KMFContainer *origin, KMFContainer *target);
	TraceSequence* inter (KMFContainer *origin, KMFContainer *target);

private:
	TraceSequence seq;
	std::list < ModelTrace * > *internal_diff (KMFContainer *origin,KMFContainer *target,bool inter, bool merge);
}; // END CLASS

#endif

#ifndef TraceSequence_H
#define TraceSequence_H

#include <list>
#include <iostream>
#include <microframework/api/trace/ModelTrace.h>
#include <microframework/api/KMFFactory.h>
#include <unordered_map>

/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class TraceSequence 
{

public:
	TraceSequence();
	~TraceSequence();

	TraceSequence* populate(list<ModelTrace*> *addtraces);
	void append(TraceSequence *seq);
	TraceSequence* populateFromString(string addtracesTxt);
	TraceSequence* populateFromStream(istream &inputStream );
	string exportToString();
	string toString ();
	void reverse();

	list<ModelTrace*> traces;
	KMFFactory *factory;
};


#endif

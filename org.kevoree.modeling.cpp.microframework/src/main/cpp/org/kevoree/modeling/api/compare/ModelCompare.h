
#ifndef ModelCompare_H
#define ModelCompare_H

#include "../trace/TraceSequence.h"
#include "../KMFContainer.h"
#include <google/dense_hash_map>

#include <list>


class ModelCompare
{

  public:
    TraceSequence * createSequence ();
    TraceSequence *diff (KMFContainer origin, KMFContainer target);
    TraceSequence *merge (KMFContainer origin, KMFContainer target);
    TraceSequence *inter (KMFContainer origin, KMFContainer target);
  private:
      std::list < ModelTrace * >internal_diff (KMFContainer origin,KMFContainer target,bool inter, bool merge);


};



#endif

#ifndef __HASHMAP_H__
#define __HASHMAP_H__

#include "Entry.h"
#include <string>
#include <list>
using std::string;
using std::list;

template <typename V>
class Hashmap {
  private:
    list< Entry<V>* >* table[255];
    static int hash(string k);
    
  public:
    Hashmap<V>();
    ~Hashmap<V>();

    void insert(string k, V v);
    V* find(string k);
    void remove(string k);
};

#endif

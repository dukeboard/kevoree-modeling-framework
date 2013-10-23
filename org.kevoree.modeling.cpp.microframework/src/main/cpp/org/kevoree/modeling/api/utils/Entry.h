#ifndef __ENTRY_H__
#define __ENTRY_H__

#include <string>
using std::string;

template <typename V>
class Entry {
  private:
    string key;
    V value;

  public:
    Entry<V>(string k, V v);
    
    V* getValue();
    string getKey();
    void setValue(V v);
};

#endif

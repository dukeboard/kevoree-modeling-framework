#ifndef __UTILS_H
#define __UTILS_H

#include <vector>

class Utils {

  public:

  static vector<string> split(string str, string delim)
  {
        unsigned start = 0;
        unsigned end;
        vector<string> v;

        while( (end = str.find(delim, start)) != string::npos )
        {
              v.push_back(str.substr(start, end-start));
              start = end + delim.length();
        }
        v.push_back(str.substr(start));
        return v;
  }
     /* size_type remove(const Key& key) { return static_cast<size_type>(this->d->erase(key)); }

           T take(const Key &key)
           {
               typename Container::iterator it = this->d->find(key);
               if (it == this->d->end()) {
                   return T();
               }

               T result = it->second;
               this->d->erase(it);
               return result;
           }*/

};



#endif
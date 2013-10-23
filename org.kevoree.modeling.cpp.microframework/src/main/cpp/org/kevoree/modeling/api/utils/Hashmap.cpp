#include "Hashmap.h"
#include "Entry.h"
#include <assert.h>
#include <string>
#include <list>
using std::string;
using std::list;

template <typename V>
Hashmap<V>::Hashmap() {
    for (int i = 0; i < 255; ++i) {
        table[i] = new list< Entry<V>* >();
    }
}

template <typename V>
Hashmap<V>::~Hashmap() {
    for (int i = 0; i < 255; ++i) {
        delete table[i];
    }
}

template <typename V>
int Hashmap<V>::hash(string k) {
    int sum = 0;
    for (int i = 0; i < (int) k.length(); ++i) {
        sum += (int) k[i];
    }

    return sum % 255;
}

template <typename V>
void Hashmap<V>::insert(string k, V v) {
    int keyHash = hash(k);
    assert(keyHash >= 0 && keyHash < 255);

    typename list< Entry<V>* >::iterator it;
    for (it = table[keyHash]->begin(); it != table[keyHash]->end(); ++it) {
        if ((*it)->getKey() == k) {
            (*it)->setValue(v);
            return;
        }
    }

    table[keyHash]->push_back(new Entry<V>(k, v));
}

template <typename V>
V* Hashmap<V>::find(string k) {
    int keyHash = hash(k);
    assert(keyHash >= 0 && keyHash < 255);

    typename list< Entry<V>* >::iterator it;
    for (it = table[keyHash]->begin(); it != table[keyHash]->end(); ++it) {
        if ((*it)->getKey() == k) {
            return (*it)->getValue();
        }
    }

    return 0;
}

template <typename V>
void Hashmap<V>::remove(string k) {
    int keyHash = hash(k);
    assert(keyHash >= 0 && keyHash < 255);

    typename list< Entry<V>* >::iterator it;
    for (it = table[keyHash]->begin(); it != table[keyHash]->end(); ++it) {
        if ((*it)->getKey() == k) {
            delete (*it);
            table[keyHash]->erase(it);
            return;
        }
    }
}

template class Hashmap<int>;
template class Hashmap<double>;
template class Hashmap<string>;

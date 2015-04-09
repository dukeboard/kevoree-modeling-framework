
package org.kevoree.modeling.api.map;

/* From an original idea https://code.google.com/p/jdbm2/ */

import org.kevoree.modeling.api.KConfig;

public class IntHashMap<V> {

    protected int elementCount;

    protected Entry<V>[] elementData;

    private int elementDataSize;

    protected int threshold;

    transient int modCount = 0;

    transient Entry<V> reuseAfterDelete = null;

    private final int initalCapacity;

    private final float loadFactor;

    static final class Entry<V> {
        Entry<V> next;
        int key;
        V value;

        Entry(int theKey, V theValue) {
            this.key = theKey;
            this.value = theValue;
        }
    }

    @SuppressWarnings("unchecked")
    Entry<V>[] newElementArray(int s) {
        return new Entry[s];
    }

    public IntHashMap(int p_initalCapacity, float p_loadFactor) {
        this.initalCapacity = p_initalCapacity;
        this.loadFactor = p_loadFactor;
        elementCount = 0;
        elementData = newElementArray(initalCapacity);
        elementDataSize = initalCapacity;
        computeMaxSize();
    }

    public void clear() {
        if (elementCount > 0) {
            elementCount = 0;
            this.elementData = newElementArray(initalCapacity);
            this.elementDataSize = initalCapacity;
            modCount++;
        }
    }

    private void computeMaxSize() {
        threshold = (int) (elementDataSize * loadFactor);
    }

    public boolean containsKey(long key) {
        int hash = (int) (key);
        int index = (hash & 0x7FFFFFFF) % elementDataSize;
        Entry<V> m = findNonNullKeyEntry(key, index);
        return m != null;
    }

    public V get(long key) {
        Entry<V> m;
        int hash = (int) (key);
        int index = (hash & 0x7FFFFFFF) % elementDataSize;
        m = findNonNullKeyEntry(key, index);
        if (m != null) {
            return m.value;
        }
        return null;
    }

    final Entry<V> findNonNullKeyEntry(long key, int index) {
        Entry<V> m = elementData[index];
        while (m != null) {
            if (key == m.key) {
                return m;
            }
            m = m.next;
        }
        return null;
    }

    public void each(LongHashMapCallBack<V> callback) {
        for (int i = 0; i < elementDataSize; i++) {
            if (elementData[i] != null) {
                Entry<V> current = elementData[i];
                callback.on(elementData[i].key, elementData[i].value);
                while (current.next != null) {
                    current = current.next;
                    callback.on(current.key, current.value);
                }
            }
        }
    }

    public V put(int key, V value) {
        Entry<V> entry;
        int index = (key & 0x7FFFFFFF) % elementDataSize;
        entry = findNonNullKeyEntry(key, index);
        if (entry == null) {
            modCount++;
            if (++elementCount > threshold) {
                rehash();
                index = (key & 0x7FFFFFFF) % elementDataSize;
            }
            entry = createHashedEntry(key, index);
        }
        V result = entry.value;
        entry.value = value;
        return result;
    }

    Entry<V> createHashedEntry(int key, int index) {
        Entry<V> entry = reuseAfterDelete;
        if (entry == null) {
            entry = new Entry<V>(key, null);
        } else {
            reuseAfterDelete = null;
            entry.key = key;
            entry.value = null;
        }

        entry.next = elementData[index];
        elementData[index] = entry;
        return entry;
    }

    void rehashCapacity(int capacity) {
        int length = (capacity == 0 ? 1 : capacity << 1);
        Entry<V>[] newData = newElementArray(length);
        for (int i = 0; i < elementDataSize; i++) {
            Entry<V> entry = elementData[i];
            while (entry != null) {
                int index = ((int) entry.key & 0x7FFFFFFF) % length;
                Entry<V> next = entry.next;
                entry.next = newData[index];
                newData[index] = entry;
                entry = next;
            }
        }
        elementData = newData;
        elementDataSize = length;
        computeMaxSize();
    }

    void rehash() {
        rehashCapacity(elementDataSize);
    }

    public V remove(long key) {
        Entry<V> entry = removeEntry(key);
        if (entry == null) {
            return null;
        }
        V ret = entry.value;
        entry.value = null;
        entry.key = -1;
        reuseAfterDelete = entry;

        return ret;
    }

    Entry<V> removeEntry(long key) {
        Entry<V> entry;
        Entry<V> last = null;
        int hash = (int) key;
        int index = (hash & 0x7FFFFFFF) % elementDataSize;
        entry = elementData[index];
        while (entry != null && !(/*((int)entry.key) == hash &&*/ key == entry.key)) {
            last = entry;
            entry = entry.next;
        }
        if (entry == null) {
            return null;
        }
        if (last == null) {
            elementData[index] = entry.next;
        } else {
            last.next = entry.next;
        }
        modCount++;
        elementCount--;
        return entry;
    }

    public int size() {
        return elementCount;
    }

}




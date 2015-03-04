
package org.kevoree.modeling.api.map;

/* From an original idea https://code.google.com/p/jdbm2/ */

import org.kevoree.modeling.api.KConfig;

public class LongLongHashMap {

    protected int elementCount;

    protected Entry[] elementData;

    private int elementDataSize;

    protected int threshold;

    transient int modCount = 0;

    transient Entry reuseAfterDelete = null;

    private final int initalCapacity;

    private final float loadFactor;

    static final class Entry {
        Entry next;
        long key;
        long value;

        Entry(long theKey, long theValue) {
            this.key = theKey;
            this.value = theValue;
        }
    }

    public LongLongHashMap(int p_initalCapacity, float p_loadFactor) {
        this.initalCapacity = p_initalCapacity;
        this.loadFactor = p_loadFactor;
        elementCount = 0;
        elementData = new Entry[initalCapacity];
        elementDataSize = initalCapacity;
        computeMaxSize();
    }

    public void clear() {
        if (elementCount > 0) {
            elementCount = 0;
            this.elementData = new Entry[initalCapacity];
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
        Entry m = findNonNullKeyEntry(key, index);
        return m != null;
    }

    public long get(long key) {
        Entry m;
        int hash = (int) (key);
        int index = (hash & 0x7FFFFFFF) % elementDataSize;
        m = findNonNullKeyEntry(key, index);
        if (m != null) {
            return m.value;
        }
        return KConfig.NULL_LONG;
    }

    final Entry findNonNullKeyEntry(long key, int index) {
        Entry m = elementData[index];
        while (m != null) {
            if (key == m.key) {
                return m;
            }
            m = m.next;
        }
        return null;
    }

    public void each(LongLongHashMapCallBack callback) {
        for (int i = 0; i < elementDataSize; i++) {
            if (elementData[i] != null) {
                Entry current = elementData[i];
                callback.on(elementData[i].key, elementData[i].value);
                while (current.next != null) {
                    current = current.next;
                    callback.on(current.key, current.value);
                }
            }
        }
    }

    public long put(long key, long value) {
        Entry entry;
        int hash = (int) (key);
        int index = (hash & 0x7FFFFFFF) % elementDataSize;
        entry = findNonNullKeyEntry(key, index);
        if (entry == null) {
            modCount++;
            if (++elementCount > threshold) {
                rehash();
                index = (hash & 0x7FFFFFFF) % elementDataSize;
            }
            entry = createHashedEntry(key, index);
        }
        long result = entry.value;
        entry.value = value;
        return result;
    }

    Entry createHashedEntry(long key, int index) {
        Entry entry = reuseAfterDelete;
        if (entry == null) {
            entry = new Entry(key, KConfig.NULL_LONG);
        } else {
            reuseAfterDelete = null;
            entry.key = key;
            entry.value = KConfig.NULL_LONG;
        }

        entry.next = elementData[index];
        elementData[index] = entry;
        return entry;
    }

    void rehashCapacity(int capacity) {
        int length = (capacity == 0 ? 1 : capacity << 1);
        Entry[] newData = new Entry[length];
        for (int i = 0; i < elementDataSize; i++) {
            Entry entry = elementData[i];
            while (entry != null) {
                int index = ((int) entry.key & 0x7FFFFFFF) % length;
                Entry next = entry.next;
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

    public long remove(long key) {
        Entry entry = removeEntry(key);
        if (entry == null) {
            return KConfig.NULL_LONG;
        }
        long ret = entry.value;
        entry.value = KConfig.NULL_LONG;
        entry.key = KConfig.BEGINNING_OF_TIME;
        reuseAfterDelete = entry;
        return ret;
    }

    Entry removeEntry(long key) {
        int index = 0;
        Entry entry;
        Entry last = null;
        int hash = (int) (key);
        index = (hash & 0x7FFFFFFF) % elementDataSize;
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




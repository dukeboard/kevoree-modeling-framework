
package org.kevoree.modeling.api.util;

/* From an original idea https://code.google.com/p/jdbm2/ */
public class LongHashMap<V> {

    protected int elementCount;

    protected Entry<V>[] elementData;

    private final float loadFactor;

    protected int threshold;

    transient int modCount = 0;

    private static final int DEFAULT_SIZE = 16;

    transient Entry<V> reuseAfterDelete = null;

    static final class Entry<V> {

        Entry<V> next;

        long key;
        V value;

        public boolean equals(Object object) {
            if (this == object) {
                return true;
            }
            if (object instanceof Entry) {
                Entry<?> entry = (Entry) object;
                return (key == entry.key)
                        && (value == null ? entry.value == null : value
                        .equals(entry.value));
            }
            return false;
        }

        public int hashCode() {
            return (int) (key) ^ (value == null ? 0 : value.hashCode());
        }

        Entry(long theKey, V theValue) {
            this.key = theKey;
            this.value = theValue;
        }

    }

    @SuppressWarnings("unchecked")
    Entry<V>[] newElementArray(int s) {
        return new Entry[s];
    }

    public LongHashMap() {
        elementCount = 0;
        elementData = newElementArray(DEFAULT_SIZE);
        loadFactor = 0.75f;
        computeMaxSize();
    }

    public void clear() {
        if (elementCount > 0) {
            elementCount = 0;
            java.util.Arrays.fill(elementData, null);
            modCount++;
        }
    }

    private void computeMaxSize() {
        threshold = (int) (elementData.length * loadFactor);
    }

    public boolean containsKey(long key) {
        int hash = (int) (key);
        int index = (hash & 0x7FFFFFFF) % elementData.length;
        Entry<V> m = findNonNullKeyEntry(key, index);
        return m != null;
    }

    public V get(long key) {
        Entry<V> m;
        int hash = (int) (key);
        int index = (hash & 0x7FFFFFFF) % elementData.length;
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

    public V put(long key, V value) {
        Entry<V> entry;
        int hash = (int) (key);
        int index = (hash & 0x7FFFFFFF) % elementData.length;
        entry = findNonNullKeyEntry(key, index);
        if (entry == null) {
            modCount++;
            if (++elementCount > threshold) {
                rehash();
                index = (hash & 0x7FFFFFFF) % elementData.length;
            }
            entry = createHashedEntry(key, index);
        }
        V result = entry.value;
        entry.value = value;
        return result;
    }

    Entry<V> createEntry(long key, int index, V value) {
        Entry<V> entry = reuseAfterDelete;
        if (entry == null) {
            entry = new Entry<V>(key, value);
        } else {
            reuseAfterDelete = null;
            entry.key = key;
            entry.value = value;
        }

        entry.next = elementData[index];
        elementData[index] = entry;
        return entry;
    }

    Entry<V> createHashedEntry(long key, int index) {
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

    void rehash(int capacity) {
        int length = (capacity == 0 ? 1 : capacity << 1);
        Entry<V>[] newData = newElementArray(length);
        for (int i = 0; i < elementData.length; i++) {
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
        computeMaxSize();
    }

    void rehash() {
        rehash(elementData.length);
    }

    public V remove(long key) {
        Entry<V> entry = removeEntry(key);
        if (entry == null)
            return null;
        V ret = entry.value;
        entry.value = null;
        entry.key = Long.MIN_VALUE;
        reuseAfterDelete = entry;

        return ret;
    }

    Entry<V> removeEntry(long key) {
        int index = 0;
        Entry<V> entry;
        Entry<V> last = null;
        int hash = (int) (key);
        index = (hash & 0x7FFFFFFF) % elementData.length;
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




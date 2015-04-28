
package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;

public class HashMemoryCache implements KCache {

    protected Entry<KCacheObject>[] elementData;

    private int elementCount;

    private int elementDataSize;

    private final float loadFactor;

    private final int initalCapacity;

    private int threshold;

    transient int modCount = 0;

    transient Entry<KCacheObject> reuseAfterDelete = null;

    private int hashKey(KContentKey p_key) {
        return (int) (p_key.segment() ^ p_key.universe() ^ p_key.time() ^ p_key.obj());
    }

    @Override
    public KCacheObject get(KContentKey p_key) {
        if (elementDataSize == 0) {
            return null;
        }
        int index = (hashKey(p_key) & 0x7FFFFFFF) % elementDataSize;
        Entry<KCacheObject> m = findNonNullKeyEntry(index, p_key);
        if (m != null) {
            return m.value;
        }
        return null;
    }

    @Override
    public void put(KContentKey p_key, KCacheObject payload) {
        Entry<KCacheObject> entry = null;
        int hash = hashKey(p_key);
        int index = (hash & 0x7FFFFFFF) % elementDataSize;
        if (elementDataSize != 0) {
            entry = findNonNullKeyEntry(index, p_key);
        }
        if (entry == null) {
            modCount++;
            if (++elementCount > threshold) {
                rehashCapacity(elementDataSize);
                index = (hash & 0x7FFFFFFF) % elementDataSize;
            }
            entry = createHashedEntry(index, p_key);
        }
        entry.value = payload;
    }

    @Override
    public KCacheDirty[] dirties() {
        int nbDirties = 0;
        for (int i = 0; i < elementDataSize; i++) {
            if (elementData[i] != null) {
                Entry<KCacheObject> current = elementData[i];
                if (elementData[i].value.isDirty()) {
                    nbDirties++;
                }
                while (current.next != null) {
                    current = current.next;
                    if (current.value.isDirty()) {
                        nbDirties++;
                    }
                }
            }
        }
        KCacheDirty[] collectedDirties = new KCacheDirty[nbDirties];
        nbDirties = 0;
        for (int i = 0; i < elementDataSize; i++) {
            if (elementData[i] != null) {
                Entry<KCacheObject> current = elementData[i];
                if (elementData[i].value.isDirty()) {
                    KCacheDirty dirty = new KCacheDirty(elementData[i].key, elementData[i].value);
                    collectedDirties[nbDirties] = dirty;
                    nbDirties++;
                }
                while (current.next != null) {
                    current = current.next;
                    if (current.value.isDirty()) {
                        KCacheDirty dirty = new KCacheDirty(current.key, current.value);
                        collectedDirties[nbDirties] = dirty;
                        nbDirties++;
                    }
                }
            }
        }
        return collectedDirties;
    }

    @Override
    public void clean() {

    }

    @Override
    public void monitor(KObject origin) {

    }

    static final class Entry<V> {
        Entry<V> next;
        KContentKey key;
        V value;

        Entry(KContentKey theKey, V theValue) {
            this.key = theKey;
            this.value = theValue;
        }
    }

    @SuppressWarnings("unchecked")
    Entry<KCacheObject>[] newElementArray(int s) {
        return new Entry[s];
    }

    public HashMemoryCache() {
        this.initalCapacity = KConfig.CACHE_INIT_SIZE;
        this.loadFactor = KConfig.CACHE_LOAD_FACTOR;
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

    final Entry<KCacheObject> findNonNullKeyEntry(int index, KContentKey p_key) {
        Entry<KCacheObject> m = elementData[index];
        while (m != null) {
            if (p_key.equals(m.key)) {
                return m;
            }
            m = m.next;
        }
        return null;
    }

    Entry<KCacheObject> createHashedEntry(int index, KContentKey p_key) {
        Entry<KCacheObject> entry = reuseAfterDelete;
        if (entry == null) {
            entry = new Entry<KCacheObject>(p_key, null);
        } else {
            reuseAfterDelete = null;
            entry.key = p_key;
            entry.value = null;
        }
        entry.next = elementData[index];
        elementData[index] = entry;
        return entry;
    }

    void rehashCapacity(int capacity) {
        int length = (capacity == 0 ? 1 : capacity << 1);
        Entry<KCacheObject>[] newData = newElementArray(length);
        for (int i = 0; i < elementDataSize; i++) {
            Entry<KCacheObject> entry = elementData[i];
            while (entry != null) {
                int index = (hashKey(entry.key) & 0x7FFFFFFF) % length;
                Entry<KCacheObject> next = entry.next;
                entry.next = newData[index];
                newData[index] = entry;
                entry = next;
            }
        }
        elementData = newData;
        elementDataSize = length;
        computeMaxSize();
    }

}




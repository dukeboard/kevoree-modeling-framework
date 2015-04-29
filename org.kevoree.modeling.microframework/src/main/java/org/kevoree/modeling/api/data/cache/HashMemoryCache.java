
package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;

public class HashMemoryCache implements KCache {

    protected Entry[] elementData;

    private int elementCount;

    private int elementDataSize;

    private final float loadFactor;

    private final int initalCapacity;

    private int threshold;

    transient int modCount = 0;

    private int hashKey(KContentKey p_key) {
        return (int) (p_key.universe ^ p_key.time ^ p_key.obj);
    }

    @Override
    public KCacheObject get(long universe, long time, long obj) {
        if (elementDataSize == 0) {
            return null;
        }
        int index = (((int) (universe ^ time ^ obj)) & 0x7FFFFFFF) % elementDataSize;
        Entry m = elementData[index];
        while (m != null) {
            if (m.universe == universe && m.time == time && m.obj == obj) {
                return m.value;
            }
            m = m.next;
        }
        return null;
    }

    @Override
    public void put(long universe, long time, long obj, KCacheObject payload) {
        Entry entry = null;
        int hash = (int) (universe ^ time ^ obj);
        int index = (hash & 0x7FFFFFFF) % elementDataSize;
        if (elementDataSize != 0) {
            Entry m = elementData[index];
            while (m != null) {
                if (m.universe == universe && m.time == time && m.obj == obj) {
                    entry = m;
                    break;
                }
                m = m.next;
            }
        }
        if (entry == null) {
            modCount++;
            if (++elementCount > threshold) {
                rehashCapacity(elementDataSize);
                index = (hash & 0x7FFFFFFF) % elementDataSize;
            }
            entry = new Entry();
            entry.universe = universe;
            entry.time = time;
            entry.obj = obj;
            entry.next = elementData[index];
            elementData[index] = entry;
        }
        entry.value = payload;
    }

    @Override
    public KCacheDirty[] dirties() {
        int nbDirties = 0;
        for (int i = 0; i < elementDataSize; i++) {
            if (elementData[i] != null) {
                Entry current = elementData[i];
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
                Entry current = elementData[i];
                if (elementData[i].value.isDirty()) {
                    KCacheDirty dirty = new KCacheDirty(new KContentKey(current.universe,current.time,current.obj), elementData[i].value);
                    collectedDirties[nbDirties] = dirty;
                    nbDirties++;
                }
                while (current.next != null) {
                    current = current.next;
                    if (current.value.isDirty()) {
                        KCacheDirty dirty = new KCacheDirty(new KContentKey(current.universe,current.time,current.obj), current.value);
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

    static final class Entry {
        Entry next;
        long universe;
        long time;
        long obj;
        KCacheObject value;
    }

    public HashMemoryCache() {
        this.initalCapacity = KConfig.CACHE_INIT_SIZE;
        this.loadFactor = KConfig.CACHE_LOAD_FACTOR;
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

    void rehashCapacity(int capacity) {
        int length = (capacity == 0 ? 1 : capacity << 1);
        Entry[] newData = new Entry[length];
        for (int i = 0; i < elementDataSize; i++) {
            Entry entry = elementData[i];
            while (entry != null) {
                int index = ((int) (entry.universe ^ entry.time ^ entry.obj) & 0x7FFFFFFF) % length;
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

}




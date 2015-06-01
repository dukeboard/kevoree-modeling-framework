
package org.kevoree.modeling.memory.cache;

import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.memory.KCache;
import org.kevoree.modeling.memory.KCacheElement;
import org.kevoree.modeling.memory.KContentKey;
import org.kevoree.modeling.memory.manager.ResolutionHelper;
import org.kevoree.modeling.memory.manager.ResolutionResult;
import org.kevoree.modeling.memory.struct.segment.HeapCacheSegment;

public class HashMemoryCache implements KCache {

    private Entry[] elementData;

    private int elementCount;

    private int elementDataSize;

    private final float loadFactor;

    private final int initalCapacity;

    private int threshold;

    /**
     * @ignore ts
     */
    private KObjectWeakReference rootReference = null;

    @Override
    public KCacheElement get(long universe, long time, long obj) {
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
    public void put(long universe, long time, long obj, KCacheElement payload) {
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
            entry = complex_insert(index, hash, universe, time, obj);
        }
        entry.value = payload;
    }

    private synchronized Entry complex_insert(int previousIndex, int hash, long universe, long time, long obj) {
        int index = previousIndex;
        if (++elementCount > threshold) {
            int length = (elementDataSize == 0 ? 1 : elementDataSize << 1);
            Entry[] newData = new Entry[length];
            for (int i = 0; i < elementDataSize; i++) {
                Entry entry = elementData[i];
                while (entry != null) {
                    index = ((int) (entry.universe ^ entry.time ^ entry.obj) & 0x7FFFFFFF) % length;
                    Entry next = entry.next;
                    entry.next = newData[index];
                    newData[index] = entry;
                    entry = next;
                }
            }
            elementData = newData;
            elementDataSize = length;
            threshold = (int) (elementDataSize * loadFactor);
            index = (hash & 0x7FFFFFFF) % elementDataSize;
        }
        Entry entry = new Entry();
        entry.universe = universe;
        entry.time = time;
        entry.obj = obj;
        entry.next = elementData[index];
        elementData[index] = entry;
        return entry;
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
            if (nbDirties < collectedDirties.length) { //the rest will saved next round due to concurrent tagged values
                if (elementData[i] != null) {
                    Entry current = elementData[i];
                    if (elementData[i].value.isDirty()) {
                        KCacheDirty dirty = new KCacheDirty(new KContentKey(current.universe, current.time, current.obj), elementData[i].value);
                        collectedDirties[nbDirties] = dirty;
                        elementData[i].value.setClean();
                        nbDirties++;
                    }
                    while (current.next != null) {
                        current = current.next;
                        if (current.value.isDirty()) {
                            KCacheDirty dirty = new KCacheDirty(new KContentKey(current.universe, current.time, current.obj), current.value);
                            collectedDirties[nbDirties] = dirty;
                            current.value.setClean();
                            nbDirties++;
                        }
                    }
                }
            }
        }
        return collectedDirties;
    }

    /**
     * @native ts
     */
    @Override
    public void clean() {
        common_clean_monitor(null);
    }

    /**
     * @native ts
     */
    @Override
    public void monitor(KObject origin) {
        common_clean_monitor(origin);
    }

    @Override
    public int size() {
        return elementCount;
    }

    private void remove(long universe, long time, long obj) {
        int hash = (int) (universe ^ time ^ obj);
        int index = (hash & 0x7FFFFFFF) % elementDataSize;
        if (elementDataSize != 0) {
            Entry previous = null;
            Entry m = elementData[index];
            while (m != null) {
                if (m.universe == universe && m.time == time && m.obj == obj) {
                    elementCount--;
                    if (previous == null) {
                        elementData[index] = m.next;
                    } else {
                        previous.next = m.next;
                    }
                }
                previous = m;
                m = m.next;
            }
        }
    }

    /**
     * @ignore ts
     */
    private synchronized void common_clean_monitor(KObject origin) {
        if (origin != null) {
            if (rootReference != null) {
                rootReference.next = new KObjectWeakReference(origin);
            } else {
                rootReference = new KObjectWeakReference(origin);
            }
        } else {
            KObjectWeakReference current = rootReference;
            KObjectWeakReference previous = null;
            while (current != null) {
                //process current
                if (current.get() == null) {
                    //check is dirty
                    HeapCacheSegment currentEntry = (HeapCacheSegment) this.get(current.universe, current.time, current.uuid);
                    if (currentEntry == null || !currentEntry.isDirty()) {
                        //call the clean sub process for universe/time/uuid
                        ResolutionResult resolved = ResolutionHelper.resolve_trees(current.universe, current.time, current.uuid, this);
                        resolved.universeTree.dec();
                        if (resolved.universeTree.counter() <= 0) {
                            remove(KConfig.NULL_LONG, KConfig.NULL_LONG, resolved.uuid);
                        }
                        resolved.timeTree.dec();
                        if (resolved.timeTree.counter() <= 0) {
                            remove(resolved.universe, KConfig.NULL_LONG, resolved.uuid);
                        }
                        resolved.segment.dec();
                        if (resolved.segment.counter() <= 0) {
                            remove(resolved.universe, resolved.time, resolved.uuid);
                        }
                        //change chaining
                        if (previous == null) { //first case
                            rootReference = current.next;
                        } else { //in the middle case
                            previous.next = current.next;
                        }
                    }
                }
                previous = current;
                current = current.next;
            }
        }
    }

    static final class Entry {
        Entry next;
        long universe;
        long time;
        long obj;
        KCacheElement value;
    }

    public HashMemoryCache() {
        this.initalCapacity = KConfig.CACHE_INIT_SIZE;
        this.loadFactor = KConfig.CACHE_LOAD_FACTOR;
        elementCount = 0;
        elementData = new Entry[initalCapacity];
        elementDataSize = initalCapacity;
        threshold = (int) (elementDataSize * loadFactor);
    }

    public void clear() {
        if (elementCount > 0) {
            elementCount = 0;
            this.elementData = new Entry[initalCapacity];
            this.elementDataSize = initalCapacity;
        }
    }

}




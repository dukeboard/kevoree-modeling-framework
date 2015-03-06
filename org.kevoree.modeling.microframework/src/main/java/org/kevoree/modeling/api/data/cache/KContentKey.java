package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KConfig;

/**
 * Created by duke on 18/02/15.
 */
public class KContentKey {

    private long[] elem;

    private static long GLOBAL_SEGMENT_META = 0;

    public static long GLOBAL_SEGMENT_DATA_RAW = 1;

    public static long GLOBAL_SEGMENT_DATA_INDEX = 2;

    public static long GLOBAL_SEGMENT_DATA_HASH_INDEX = 3;

    public static long GLOBAL_SEGMENT_DATA_ROOT = 4;

    public static long GLOBAL_SEGMENT_DATA_ROOT_INDEX = 5;

    public static long GLOBAL_SEGMENT_UNIVERSE_TREE = 6;

    private static long GLOBAL_SEGMENT_PREFIX = 7;

    private static long GLOBAL_SUB_SEGMENT_PREFIX_OBJ = 0;

    private static long GLOBAL_SUB_SEGMENT_PREFIX_UNI = 1;

    public KContentKey(long p_prefixID, long p_universeID, long p_timeID, long p_objID) {
        elem = new long[KConfig.KEY_SIZE];
        elem[0] = p_prefixID;
        elem[1] = p_universeID;
        elem[2] = p_timeID;
        elem[3] = p_objID;
    }

    public long segment() {
        return elem[0];
    }

    public long universe() {
        return elem[1];
    }

    public long time() {
        return elem[2];
    }

    public long obj() {
        return elem[3];
    }

    public long part(int i) {
        if (i >= 0 && i < KConfig.KEY_SIZE) {
            return elem[i];
        } else {
            return KConfig.NULL_LONG;
        }
    }

    public static KContentKey createGlobal(long p_prefixID) {
        return new KContentKey(p_prefixID, KConfig.NULL_LONG, KConfig.NULL_LONG, KConfig.NULL_LONG);
    }

    private static KContentKey cached_global_universeTree = null;

    public static KContentKey createGlobalUniverseTree() {
        if (cached_global_universeTree == null) {
            cached_global_universeTree = new KContentKey(GLOBAL_SEGMENT_UNIVERSE_TREE, KConfig.NULL_LONG, KConfig.NULL_LONG, KConfig.NULL_LONG);
        }
        return cached_global_universeTree;
    }

    public static KContentKey createUniverseTree(long p_objectID) {
        return new KContentKey(GLOBAL_SEGMENT_DATA_HASH_INDEX, KConfig.NULL_LONG, KConfig.NULL_LONG, p_objectID);
    }

    private static KContentKey cached_root_universeTree = null;

    public static KContentKey createRootUniverseTree() {
        if (cached_root_universeTree == null) {
            cached_root_universeTree = new KContentKey(GLOBAL_SEGMENT_DATA_ROOT, KConfig.NULL_LONG, KConfig.NULL_LONG, KConfig.NULL_LONG);
        }
        return cached_root_universeTree;
    }

    public static KContentKey createRootTimeTree(long universeID) {
        return new KContentKey(GLOBAL_SEGMENT_DATA_ROOT_INDEX, universeID, KConfig.NULL_LONG, KConfig.NULL_LONG);
    }

    public static KContentKey createTimeTree(long p_universeID, long p_objectID) {
        return new KContentKey(GLOBAL_SEGMENT_DATA_INDEX, p_universeID, KConfig.NULL_LONG, p_objectID);
    }

    public static KContentKey createObject(long p_universeID, long p_quantaID, long p_objectID) {
        return new KContentKey(GLOBAL_SEGMENT_DATA_RAW, p_universeID, p_quantaID, p_objectID);
    }

    public static KContentKey createLastPrefix() {
        return new KContentKey(GLOBAL_SEGMENT_PREFIX, KConfig.NULL_LONG, KConfig.NULL_LONG, KConfig.NULL_LONG);
    }

    public static KContentKey createLastObjectIndexFromPrefix(Short prefix) {
        return new KContentKey(GLOBAL_SEGMENT_PREFIX, GLOBAL_SUB_SEGMENT_PREFIX_OBJ, KConfig.NULL_LONG, Long.parseLong(prefix.toString()));
    }

    public static KContentKey createLastUniverseIndexFromPrefix(Short prefix) {
        return new KContentKey(GLOBAL_SEGMENT_PREFIX, GLOBAL_SUB_SEGMENT_PREFIX_UNI, KConfig.NULL_LONG, Long.parseLong(prefix.toString()));
    }

    public static KContentKey create(String payload) {
        if (payload == null || payload.length() == 0) {
            return null;
        } else {
            long[] temp = new long[KConfig.KEY_SIZE];
            for (int i = 0; i < KConfig.KEY_SIZE; i++) {
                temp[i] = KConfig.NULL_LONG;
            }
            int maxRead = payload.length();
            int indexStartElem = -1;
            int indexElem = 0;
            for (int i = 0; i < maxRead; i++) {
                if (payload.charAt(i) == KConfig.KEY_SEP) {
                    if (indexStartElem != -1) {
                        try {
                            temp[indexElem] = Long.parseLong(payload.substring(indexStartElem, i));
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    indexStartElem = -1;
                    indexElem = indexElem + 1;
                } else {
                    if (indexStartElem == -1) {
                        indexStartElem = i;
                    }
                }
            }
            if (indexStartElem != -1) {
                try {
                    temp[indexElem] = Long.parseLong(payload.substring(indexStartElem, maxRead));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            return new KContentKey(temp[0], temp[1], temp[2], temp[3]);
        }
    }

    @Override
    public String toString() {
        StringBuilder buffer = new StringBuilder();
        for (int i = 0; i < KConfig.KEY_SIZE; i++) {
            if (i != 0) {
                buffer.append(KConfig.KEY_SEP);
            }
            if (elem[i] != KConfig.NULL_LONG) {
                buffer.append(elem[i]);
            }
        }
        return buffer.toString();
    }

}

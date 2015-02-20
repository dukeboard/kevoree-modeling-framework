package org.kevoree.modeling.api.data.cache;

/**
 * Created by duke on 18/02/15.
 */
public class KContentKey {

    private static final int ELEM_SIZE = 4;

    private Long[] elem = new Long[ELEM_SIZE];

    public static final char KEY_SEP = '/';

    private static long GLOBAL_SEGMENT_META = 0;

    private static long GLOBAL_SEGMENT_DATA = 1;

    private static long GLOBAL_SEGMENT_UNIVERSE_TREE = 2;

    private static long GLOBAL_SEGMENT_PREFIX = 3;

    private static long GLOBAL_SEGMENT_ROOT = 4;

    private static long GLOBAL_SUB_SEGMENT_PREFIX_OBJ = 0;

    private static long GLOBAL_SUB_SEGMENT_PREFIX_UNI = 1;

    public KContentKey(Long p_prefixID, Long p_universeID, Long p_timeID, Long p_objID) {
        elem[0] = p_prefixID;
        elem[1] = p_universeID;
        elem[2] = p_timeID;
        elem[3] = p_objID;
    }

    public Long segmentID() {
        return elem[0];
    }

    public Long universeID() {
        return elem[1];
    }

    public Long timeID() {
        return elem[2];
    }

    public Long objID() {
        return elem[3];
    }

    public static KContentKey createGlobal(Long p_prefixID) {
        return new KContentKey(p_prefixID, null, null, null);
    }

    public static KContentKey createGlobalUniverseTree() {
        return new KContentKey(GLOBAL_SEGMENT_UNIVERSE_TREE, null, null, null);
    }

    public static KContentKey createUniverseTree(Long p_objectID) {
        return new KContentKey(GLOBAL_SEGMENT_DATA, null, null, p_objectID);
    }

    public static KContentKey createRootUniverseTree() {
        return new KContentKey(GLOBAL_SEGMENT_ROOT, null, null, null);
    }

    public static KContentKey createRootTimeTree(Long universeID) {
        return new KContentKey(GLOBAL_SEGMENT_ROOT, universeID, null, null);
    }

    public static KContentKey createTimeTree(Long p_universeID, Long p_objectID) {
        return new KContentKey(GLOBAL_SEGMENT_DATA, p_universeID, null, p_objectID);
    }

    public static KContentKey createObject(Long p_universeID, Long p_quantaID, Long p_objectID) {
        return new KContentKey(GLOBAL_SEGMENT_DATA, p_universeID, p_quantaID, p_objectID);
    }

    public static KContentKey createLastPrefix() {
        return new KContentKey(GLOBAL_SEGMENT_PREFIX, null, null, null);
    }

    public static KContentKey createLastObjectIndexFromPrefix(Short prefix) {
        return new KContentKey(GLOBAL_SEGMENT_PREFIX, GLOBAL_SUB_SEGMENT_PREFIX_OBJ, null, Long.parseLong(prefix.toString()));
    }

    public static KContentKey createLastUniverseIndexFromPrefix(Short prefix) {
        return new KContentKey(GLOBAL_SEGMENT_PREFIX, GLOBAL_SUB_SEGMENT_PREFIX_UNI, null, Long.parseLong(prefix.toString()));
    }

    public static KContentKey create(String payload) {
        if (payload == null || payload.length() == 0) {
            return null;
        } else {
            Long[] temp = new Long[ELEM_SIZE];
            int maxRead = payload.length();
            int indexStartElem = -1;
            int indexElem = 0;
            for (int i = 0; i < maxRead; i++) {
                if (payload.charAt(i) == KEY_SEP) {
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
        for (int i = 0; i < ELEM_SIZE; i++) {
            if (i != 0) {
                buffer.append(KEY_SEP);
            }
            if (elem[i] != null) {
                buffer.append(elem[i]);
            }
        }
        return buffer.toString();
    }

}
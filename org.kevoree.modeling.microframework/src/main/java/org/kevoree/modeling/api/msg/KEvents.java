package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;

/**
 * Created by duke on 09/03/15.
 */
public class KEvents implements KMessage {

    protected KContentKey[] _objIds;

    protected int[][] _metaindexes;

    private int _size;

    public KContentKey[] allKeys() {
        return _objIds;
    }

    public KEvents(int nbObject) {
        this._objIds = new KContentKey[nbObject];
        this._metaindexes = new int[nbObject][];
        this._size = nbObject;
    }

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        KMessageHelper.printJsonStart(buffer);
        KMessageHelper.printType(buffer, type());
        buffer.append(",");
        buffer.append("\"");
        buffer.append(KMessageLoader.KEYS_NAME).append("\":[");
        for (int i = 0; i < _objIds.length; i++) {
            if (i != 0) {
                buffer.append(",");
            }
            buffer.append("\"");
            buffer.append(_objIds[i]);
            buffer.append("\"");
        }
        buffer.append("]\n");
        if (_metaindexes != null) {
            buffer.append(",");
            buffer.append("\"");
            buffer.append(KMessageLoader.VALUES_NAME).append("\":[");
            for (int i = 0; i < _metaindexes.length; i++) {
                if (i != 0) {
                    buffer.append(",");
                }
                buffer.append("\"");
                int[] metaModified = _metaindexes[i];
                for (int j = 0; j < metaModified.length; j++) {
                    if (j != 0) {
                        buffer.append("%");
                    }
                    buffer.append(metaModified[j]);
                }
                buffer.append("\"");
            }
            buffer.append("]\n");
        }
        KMessageHelper.printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.EVENTS_TYPE;
    }

    public int size() {
        return _size;
    }

    public void setEvent(int index, KContentKey p_objId, int[] p_metaIndexes) {
        this._objIds[index] = p_objId;
        this._metaindexes[index] = p_metaIndexes;
    }

    public KContentKey getKey(int index) {
        return _objIds[index];
    }


    public int[] getIndexes(int index) {
        return _metaindexes[index];
    }

}

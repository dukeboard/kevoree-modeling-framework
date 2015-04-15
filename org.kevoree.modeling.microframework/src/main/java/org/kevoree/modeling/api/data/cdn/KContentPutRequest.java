package org.kevoree.modeling.api.data.cdn;

import org.kevoree.modeling.api.data.cache.KContentKey;

public class KContentPutRequest {

    private Object[][] _content;

    private static final int KEY_INDEX = 0;

    private static final int CONTENT_INDEX = 1;

    private static final int SIZE_INDEX = 2;

    private int _size = 0;

    public KContentPutRequest(int requestSize) {
        _content = new Object[requestSize][];
    }

    public void put(KContentKey p_key, String p_payload) {
        Object[] newLine = new Object[SIZE_INDEX];
        newLine[KEY_INDEX] = p_key;
        newLine[CONTENT_INDEX] = p_payload;
        _content[_size] = newLine;
        _size = _size + 1;
    }

    public KContentKey getKey(int index) {
        if (index < _content.length) {
            return (KContentKey) _content[index][0];
        } else {
            return null;
        }
    }

    public String getContent(int index) {
        if (index < _content.length) {
            return (String) _content[index][1];
        } else {
            return null;
        }
    }

    public int size() {
        return _size;
    }

}

package org.kevoree.modeling.api.data.cdn;

import org.kevoree.modeling.api.data.cache.KContentKey;

/**
 * Created by duke on 19/02/15.
 */
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
        if (_size < _content.length) {
            Object[] newLine = new Object[SIZE_INDEX];
            newLine[KEY_INDEX] = p_key;
            newLine[CONTENT_INDEX] = p_payload;
            _content[_size] = newLine;
            _size = _size + 1;
        } else {
            throw new RuntimeException("Insert over the limit of the request");
        }
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

    public int size(){
        return _size;
    }

}

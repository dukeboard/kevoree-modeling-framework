package org.kevoree.modeling.api.data;

/**
 * Created by gregory.nain on 02/12/14.
 */
public class KeyCalculator {

    // Limit long lengths to 53 bits because of JS limitation
    public static final long LONG_LIMIT_JS = 0x001FFFFFFFFFFFFFl;
    // Limit limit local index to LONG limit - prefix size
    public static final long INDEX_LIMIT = 0x0000001FFFFFFFFFl;


    private long _prefix;
    private long _currentIndex;

    public KeyCalculator(short prefix, long currentIndex) {
        this._prefix = ((long)prefix) << 53-16;
        this._currentIndex = currentIndex;
    }

    public long nextKey() {
        if(_currentIndex == INDEX_LIMIT) {
            throw new IndexOutOfBoundsException("Object Index could not be created because it exceeded the capacity of the current prefix. Ask for a new prefix.");
        }
        _currentIndex ++;
        //moves the prefix 53-size(short) times to the left;
        long objectKey = _prefix + _currentIndex;

        if(objectKey > LONG_LIMIT_JS) {
            throw new IndexOutOfBoundsException("Object Index exceeds teh maximum JavaScript number capacity. (2^53)");
        }
        return objectKey;

    }

    public long lastComputedIndex() {
        return _currentIndex;
    }

    public short prefix() {
        return (short)(_prefix >> 53-16);
    }

}

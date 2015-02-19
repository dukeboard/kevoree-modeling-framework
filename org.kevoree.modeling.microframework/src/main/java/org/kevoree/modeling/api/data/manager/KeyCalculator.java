package org.kevoree.modeling.api.data.manager;

/**
 * Created by gregory.nain on 02/12/14.
 */
// TODO must be synchronized
public class KeyCalculator {

    // Limit long lengths to 53 bits because of JS limitation
    public static final long LONG_LIMIT_JS = 0x001FFFFFFFFFFFFFl;
    // Limit limit local index to LONG limit - prefix size
    public static final long INDEX_LIMIT = 0x0000001FFFFFFFFFl;

    /**
     * @native:ts
     * {@code
     * private _prefix: string;
     * }
     */
    private long _prefix;
    private long _currentIndex;

    /**
     * @native:ts
     * {@code
     * this._prefix = "0x" + prefix.toString(16);
     * this._currentIndex = currentIndex;
     * }
     * @param currentIndex
     * @param prefix
     */
    public KeyCalculator(short prefix, long currentIndex) {
        this._prefix = ((long) prefix) << 53 - 16;
        this._currentIndex = currentIndex;
    }

    /**@native:ts
     * {@code
     * if (this._currentIndex == KeyCalculator.INDEX_LIMIT) {
     * throw new java.lang.IndexOutOfBoundsException("Object Index could not be created because it exceeded the capacity of the current prefix. Ask for a new prefix.");
     * }
     * this._currentIndex++;
     * var indexHex = this._currentIndex.toString(16);
     * var objectKey = parseInt(this._prefix + "000000000".substring(0,9-indexHex.length) + indexHex, 16);
     * if (objectKey > KeyCalculator.LONG_LIMIT_JS) {
     * throw new java.lang.IndexOutOfBoundsException("Object Index exceeds teh maximum JavaScript number capacity. (2^53)");
     * }
     * return objectKey;
     * }
     *
     */
    public long nextKey() {
        if (_currentIndex == INDEX_LIMIT) {
            throw new IndexOutOfBoundsException("Object Index could not be created because it exceeded the capacity of the current prefix. Ask for a new prefix.");
        }
        _currentIndex++;
        //moves the prefix 53-size(short) times to the left;
        long objectKey = _prefix + _currentIndex;
        if (objectKey > LONG_LIMIT_JS) {
            throw new IndexOutOfBoundsException("Object Index exceeds teh maximum JavaScript number capacity. (2^53)");
        }
        return objectKey;
    }

    public long lastComputedIndex() {
        return _currentIndex;
    }

    /**
     * @native:ts
     * {@code
     * return parseInt(this._prefix,16);
     * }
     */
    public short prefix() {
        return (short) (_prefix >> 53 - 16);
    }

}

package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.KConfig;

/**
 * Created by gregory.nain on 02/12/14.
 */
public class KeyCalculator {

    /**
     * @native:ts {@code
     * private _prefix: string;
     * }
     */
    private long _prefix;
    private long _currentIndex;

    /**
     * @param currentIndex
     * @param prefix
     * @native:ts {@code
     * this._prefix = "0x" + prefix.toString(16);
     * this._currentIndex = currentIndex;
     * }
     */
    public KeyCalculator(short prefix, long currentIndex) {
        this._prefix = ((long) prefix) << 53 - 16;
        this._currentIndex = currentIndex;
    }

    /**
     * @native:ts {@code
     * if (this._currentIndex == org.kevoree.modeling.api.KConfig.KEY_PREFIX_SIZE) {
     * throw new java.lang.IndexOutOfBoundsException("Object Index could not be created because it exceeded the capacity of the current prefix. Ask for a new prefix.");
     * }
     * this._currentIndex++;
     * var indexHex = this._currentIndex.toString(16);
     * var objectKey = parseInt(this._prefix + "000000000".substring(0,9-indexHex.length) + indexHex, 16);
     * if (objectKey >= org.kevoree.modeling.api.KConfig.NULL_LONG) {
     * throw new java.lang.IndexOutOfBoundsException("Object Index exceeds teh maximum JavaScript number capacity. (2^53)");
     * }
     * return objectKey;
     * }
     */
    public long nextKey() {
        if (_currentIndex == KConfig.KEY_PREFIX_SIZE) {
            throw new IndexOutOfBoundsException("Object Index could not be created because it exceeded the capacity of the current prefix. Ask for a new prefix.");
        }
        _currentIndex++;
        //moves the prefix 53-size(short) times to the left;
        long objectKey = _prefix + _currentIndex;
        if (objectKey >= KConfig.NULL_LONG) {
            throw new IndexOutOfBoundsException("Object Index exceeds teh maximum JavaScript number capacity. (2^53)");
        }
        return objectKey;
    }

    public long lastComputedIndex() {
        return _currentIndex;
    }

    /**
     * @native:ts {@code
     * return parseInt(this._prefix,16);
     * }
     */
    public short prefix() {
        return (short) (_prefix >> 53 - 16);
    }

}

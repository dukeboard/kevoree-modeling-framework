package org.kevoree.modeling.api.util;

import java.util.Set;

/**
 * Created by duke on 02/03/15.
 */
public class ArrayUtils {

    public static long[] add(long[] previous, long toAdd) {
        if (contains(previous, toAdd) != -1) {
            return previous;
        }
        long[] newArray = new long[previous.length + 1];
        System.arraycopy(previous, 0, newArray, 0, previous.length);
        newArray[previous.length] = toAdd;
        return newArray;
    }

    public static long[] remove(long[] previous, long toAdd) {
        int indexToRemove = contains(previous, toAdd);
        if (indexToRemove == -1) {
            return previous;
        } else {
            long[] newArray = new long[previous.length - 1];
            System.arraycopy(previous, 0, newArray, 0, indexToRemove);
            System.arraycopy(previous, indexToRemove + 1, newArray, indexToRemove, previous.length - indexToRemove - 1);
            return newArray;
        }
    }

    public static long[] clone(long[] previous) {
        long[] newArray = new long[previous.length];
        System.arraycopy(previous, 0, newArray, 0, previous.length);
        return newArray;
    }

    public static int contains(long[] previous, long value) {
        for (int i = 0; i < previous.length; i++) {
            if (previous[i] == value) {
                return i;
            }
        }
        return -1;
    }

}

package org.kevoree.modeling.api.data;

/**
 * Created by gregory.nain on 13/11/14.
 */
public class IDRange {

    private long min = 0;
    private long current = 0;
    private long max = 0;
    private int threshold;

    public IDRange(long min, long max, int threshold) {
        this.min = min;
        this.current = min;
        this.max = max;
        this.threshold = threshold;
    }

    public long newUuid() {
        long res = current;
        current++;
        return res;
    }

    public boolean isThresholdReached() {
        return (max - min) <= threshold;
    }

    public boolean isEmpty() {
        return current > max;
    }
}

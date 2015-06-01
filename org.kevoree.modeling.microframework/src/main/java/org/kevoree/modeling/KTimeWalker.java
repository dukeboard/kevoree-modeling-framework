package org.kevoree.modeling;

public interface KTimeWalker {

    void allTimes(Callback<long[]> cb);

    void timesBefore(long endOfSearch,Callback<long[]> cb);

    void timesAfter(long beginningOfSearch,Callback<long[]> cb);

    void timesBetween(long beginningOfSearch,long endOfSearch,Callback<long[]> cb);

}

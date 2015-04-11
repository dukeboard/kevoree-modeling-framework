package org.kevoree.modeling.api;

public interface KTimeWalker {

    KDefer<long[]> allTimes();

    KDefer<long[]> timesBefore(long endOfSearch);

    KDefer<long[]> timesAfter(long beginningOfSearch);

    KDefer<long[]> timesBetween(long beginningOfSearch,long endOfSearch);

}

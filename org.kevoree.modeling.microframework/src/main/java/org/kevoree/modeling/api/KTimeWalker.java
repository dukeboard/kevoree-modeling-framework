package org.kevoree.modeling.api;

/**
 * Created by duke on 05/03/15.
 */
public interface KTimeWalker {

    public KDefer<long[]> allTimes();

    public KDefer<long[]> timesBefore(long endOfSearch);

    public KDefer<long[]> timesAfter(long beginningOfSearch);

    public KDefer<long[]> timesBetween(long beginningOfSearch,long endOfSearch);

}

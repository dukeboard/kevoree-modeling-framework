package org.kevoree.modeling.api;

import java.util.List;

public interface KUniverse<A extends KView, B extends KUniverse, C extends KModel> {

    long key();

    A time(long timePoint);

    C model();

    boolean equals(Object other);

    B diverge();

    B origin();

    List<B> descendants();

    KDefer<Throwable> delete();

    KDefer<KObject[]> lookupAllTimes(long uuid, long[] times);

    void listenAll(long groupId, long[] objects, KEventMultiListener multiListener);

}

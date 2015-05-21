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

    void delete(Callback cb);

    void lookupAllTimes(long uuid, long[] times, Callback<KObject[]> cb);

    void listenAll(long groupId, long[] objects, KEventMultiListener multiListener);

}

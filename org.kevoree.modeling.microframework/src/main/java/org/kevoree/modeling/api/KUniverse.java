package org.kevoree.modeling.api;

import java.util.List;

/**
 * Created by duke on 9/30/14.
 */

public interface KUniverse<A extends KView, B extends KUniverse, C extends KModel> {

    public long key();

    public A time(long timePoint);

    public C model();

    public boolean equals(Object other);

    public void listen(ModelListener listener);

    public void listenAllTimes(KObject target, ModelListener listener);

    public B diverge();

    public B origin();

    public List<B> descendants();

    public void delete(Callback<Throwable> callback);

    public void discard(Callback<Throwable> callback);

    public KTask<Throwable> taskDelete();

    public KTask<Throwable> taskDiscard();

}

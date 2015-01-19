package org.kevoree.modeling.api;

/**
 * Created by duke on 9/30/14.
 */

public interface KUniverse<A extends KView, B extends KUniverse, C extends KModel> {

    public long key();

    public void split(Callback<B> callback);

    public void origin(Callback<B> callback);

    public void descendants(Callback<B[]> callback);

    public void save(Callback<Throwable> callback);

    public void saveUnload(Callback<Throwable> callback);

    public void delete(Callback<Throwable> callback);

    public void discard(Callback<Throwable> callback);

    public A time(long timePoint);

    public C model();

    public boolean equals(Object other);

    public void listen(ModelListener listener);

    public void listenAllTimes(KObject target, ModelListener listener);

}

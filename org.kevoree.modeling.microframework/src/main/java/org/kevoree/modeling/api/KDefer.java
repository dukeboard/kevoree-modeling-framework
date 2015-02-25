package org.kevoree.modeling.api;

/**
 * Created by duke on 20/01/15.
 */
public interface KDefer<A> {

    public KDefer<A> wait(KDefer previous);

    public A getResult() throws Exception;

    public boolean isDone();

    public KDefer<A> setJob(KJob kjob);

    public KDefer<A> ready();

    public KDefer<Object> next();

    public void then(Callback<A> callback);

    public KDefer<A> setName(String taskName);

    public String getName();

    public KDefer<Object> chain(KDeferBlock block);

}

package org.kevoree.modeling.api;

public interface KDefer<A> {

    KDefer<A> wait(KDefer previous);

    A getResult() throws Exception;

    boolean isDone();

    KDefer<A> setJob(KJob kjob);

    KDefer<A> ready();

    KDefer<Object> next();

    void then(Callback<A> callback);

    KDefer<A> setName(String taskName);

    String getName();

    KDefer<Object> chain(KDeferBlock block);

}

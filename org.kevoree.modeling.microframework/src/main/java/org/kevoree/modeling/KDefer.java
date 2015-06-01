package org.kevoree.modeling;

public interface KDefer {

    Callback wait(String resultName);

    KDefer waitDefer(KDefer previous);

    boolean isDone();

    Object getResult(String resultName) throws Exception;

    /**
     * @ignore ts
     */
    <A> A getResult(String resultName, Class<A> casted) throws Exception;

    void then(Callback cb);

    KDefer next();

}

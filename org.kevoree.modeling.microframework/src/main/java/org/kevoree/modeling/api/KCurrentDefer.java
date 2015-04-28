package org.kevoree.modeling.api;

public interface KCurrentDefer<A> extends KDefer<A> {

    Object resultByDefer(KDefer defer);

    void setResult(A result);

}

package org.kevoree.modeling.api;

public interface KCurrentDefer<A> extends KDefer<A> {

    String[] resultKeys();

    Object resultByName(String name);

    Object resultByDefer(KDefer defer);

    void addDeferResult(A result);

    void clearResults();

}

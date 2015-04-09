package org.kevoree.modeling.api;

/**
 * Created by duke on 21/01/15.
 */
public interface KCurrentDefer<A> extends KDefer<A> {

    String[] resultKeys();

    Object resultByName(String name);

    Object resultByDefer(KDefer defer);

    void addDeferResult(A result);

    void clearResults();

}

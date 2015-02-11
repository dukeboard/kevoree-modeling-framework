package org.kevoree.modeling.api;

/**
 * Created by duke on 21/01/15.
 */
public interface KCurrentTask<A> extends KTask<A> {

    public String[] resultKeys();

    public Object resultByName(String name);

    public Object resultByTask(KTask task);

    public void addTaskResult(A result);

    public void clearResults();

}

package org.kevoree.modeling.api;

/**
 * Created by duke on 20/01/15.
 */
public interface KTask<A> {

    public void wait(KTask previous);

    public A getResult() throws Exception;

    public boolean isDone();

    public void setJob(KJob kjob);

    public void ready();

}

package org.kevoree.modeling.api;

/**
 * Created by duke on 23/01/15.
 */
public interface KScheduler {

    void dispatch(Runnable runnable);

    void stop();

}

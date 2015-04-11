package org.kevoree.modeling.api;

public interface KScheduler {

    void dispatch(Runnable runnable);

    void stop();

}

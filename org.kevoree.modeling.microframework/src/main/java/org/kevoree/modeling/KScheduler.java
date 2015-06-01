package org.kevoree.modeling;

public interface KScheduler {

    void dispatch(Runnable runnable);

    void stop();

}

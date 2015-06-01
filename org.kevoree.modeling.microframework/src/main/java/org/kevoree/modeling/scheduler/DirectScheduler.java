package org.kevoree.modeling.scheduler;

import org.kevoree.modeling.KScheduler;

public class DirectScheduler implements KScheduler {

    @Override
    public void dispatch(Runnable runnable) {
        runnable.run();
    }

    @Override
    public void stop() {
    }

}

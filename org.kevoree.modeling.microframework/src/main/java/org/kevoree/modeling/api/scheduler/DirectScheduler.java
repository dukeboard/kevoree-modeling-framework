package org.kevoree.modeling.api.scheduler;

import org.kevoree.modeling.api.KScheduler;

public class DirectScheduler implements KScheduler {

    @Override
    public void dispatch(Runnable runnable) {
        runnable.run();
    }

    @Override
    public void stop() {
    }

}

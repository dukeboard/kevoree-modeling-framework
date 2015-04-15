package org.kevoree.modeling.api.scheduler;

import org.kevoree.modeling.api.KScheduler;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorServiceScheduler implements KScheduler {

    /**
     * @ignore ts
     */
    private ExecutorService _service = Executors.newCachedThreadPool();

    /**
     * @native ts
     * p_runnable.run();
     */
    @Override
    public void dispatch(Runnable p_runnable) {
        _service.submit(p_runnable);
    }

    /**
     * @native ts
     */
    @Override
    public void stop() {
        _service.shutdown();
    }

}

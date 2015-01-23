package org.kevoree.modeling.api.scheduler;

import org.kevoree.modeling.api.KScheduler;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by duke on 23/01/15.
 */
public class ExecutorServiceScheduler implements KScheduler {

    /**
     * @native:ts {@code
     * }
     */
    private ExecutorService _service = Executors.newCachedThreadPool();

    /**
     * @native:ts {@code
     * p_runnable.run();
     * }
     */
    @Override
    public void dispatch(Runnable p_runnable) {
        _service.submit(p_runnable);
    }

    /**
     * @native:ts {@code
     * }
     */
    @Override
    public void stop() {
        _service.shutdown();
    }

}

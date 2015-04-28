package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KJob;
import org.kevoree.modeling.api.KDefer;

public class AbstractKDeferWrapper<A> extends AbstractKDefer<A> {

    private Callback<A> _callback = null;

    private static final String FORBIDDEN_TASK = "Await and SetJob actions are forbidden on wrapped tasks, please create a sub defer";

    public AbstractKDeferWrapper() {
        super();
        final AbstractKDeferWrapper<A> selfPointer = this;
        _callback = new Callback<A>() {
            @Override
            public void on(A a) {
                selfPointer._isReady = true;
                selfPointer.setResult(a);
                selfPointer.setDoneOrRegister(null);
            }
        };
    }

    public Callback<A> initCallback() {
        return _callback;
    }

    @Override
    public KDefer<A> wait(KDefer previous) {
        throw new RuntimeException(FORBIDDEN_TASK);
    }

    @Override
    public KDefer<A> setJob(KJob p_kjob) {
        throw new RuntimeException(FORBIDDEN_TASK);
    }

    @Override
    public KDefer<A> ready() {
        return this;
    }

}

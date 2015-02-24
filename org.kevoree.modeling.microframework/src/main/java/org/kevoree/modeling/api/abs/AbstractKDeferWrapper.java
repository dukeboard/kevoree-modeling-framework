package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KJob;
import org.kevoree.modeling.api.KDefer;

/**
 * Created by duke on 21/01/15.
 */
public class AbstractKDeferWrapper<A> extends AbstractKDefer<A> {

    private Callback<A> _callback = null;

    public AbstractKDeferWrapper() {
        super();
        final AbstractKDeferWrapper<A> selfPointer = this;
        _callback = new Callback<A>() {
            @Override
            public void on(A a) {
                selfPointer._isReady = true;
                selfPointer.addDeferResult(a);
                selfPointer.setDoneOrRegister(null);
            }
        };
    }

    public Callback<A> initCallback() {
        return _callback;
    }

    @Override
    public KDefer<A> wait(KDefer previous) {
        throw new RuntimeException("Wait action is forbidden on wrapped tasks, please create a sub defer");
    }

    @Override
    public KDefer<A> setJob(KJob p_kjob) {
        throw new RuntimeException("setJob action is forbidden on wrapped tasks, please create a sub defer");
    }

    @Override
    public KDefer<A> ready() {
        return this;
    }

}

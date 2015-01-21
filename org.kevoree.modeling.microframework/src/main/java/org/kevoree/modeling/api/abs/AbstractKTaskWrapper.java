package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KJob;
import org.kevoree.modeling.api.KTask;

/**
 * Created by duke on 21/01/15.
 */
public class AbstractKTaskWrapper<A> extends AbstractKTask<A> {

    private Callback<A> _callback = null;

    public AbstractKTaskWrapper() {
        super();
        final AbstractKTaskWrapper<A> selfPointer = this;
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
    public void wait(KTask previous) {
        throw new RuntimeException("Wait action is forbidden on wrapped tasks, please create a sub task");
    }

    @Override
    public void setJob(KJob p_kjob) {
        throw new RuntimeException("setJob action is forbidden on wrapped tasks, please create a sub task");
    }

    @Override
    public void ready() {
    }

}

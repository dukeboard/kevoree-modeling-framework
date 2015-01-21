package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KTask;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 20/01/15.
 */
public class AbstractKTask<A> implements KTask<A> {

    private Map<KTask, Object> _results = new HashMap<KTask, Object>();
    private Map<KTask, Boolean> _executed = new HashMap<KTask, Boolean>();
    private boolean _isDone = false;
    private Callback<KTask<A>> _core;
    private Set<KTask> _nextTasks = new HashSet<KTask>();

    @Override
    public void wait(KTask previous) {
        ((AbstractKTask) previous)._nextTasks.add(this);
        _executed.put(previous, previous.isDone());
    }

    @Override
    public void next(KTask previous) {
        _nextTasks.add(previous);
        if (_isDone) {
            ((AbstractKTask) previous).propagateResult(this, true);
        } else {
            ((AbstractKTask) previous)._executed.put(this, false);
        }
    }

    @Override
    public void done(Callback<A> callback) {
        AbstractKTask leafTask = new AbstractKTask();
        leafTask._core = new Callback<KTask>() {
            @Override
            public void on(KTask kTask) {
                callback.on((A) kTask.getResult());
            }
        };
        next(leafTask);
        tryExecution();
    }

    @Override
    public synchronized void setResult(A result) {
        if (!_isDone) {
            _isDone = true;
            _results.put(this, result);
            KTask[] subTasks = _nextTasks.toArray(new KTask[_nextTasks.size()]);
            for (int i = 0; i < subTasks.length; i++) {
                ((AbstractKTask) subTasks[i]).propagateResult(this, result);
            }
        } else {
            throw new RuntimeException("Task has been already setted to done state");
        }
    }

    @Override
    public A getResult() {
        return (A) _results.get(this);
    }

    @Override
    public boolean isDone() {
        return _isDone;
    }

    @Override
    public Map<KTask, Object> previousResults() {
        return _results;
    }

    @Override
    public void execute(Callback<KTask<A>> p_core) {
        this._core = p_core;
        tryExecution();
    }

    private synchronized void propagateResult(KTask parent, Object result) {
        _results.put(parent, result);
        _executed.put(parent, true);
        //check if every parent has been executed
        tryExecution();
    }

    private synchronized void tryExecution() {
        if (!_isDone) {
            KTask[] parentTasks = _executed.keySet().toArray(new KTask[_executed.size()]);
            boolean allTrue = true;
            for (int i = 0; i < parentTasks.length; i++) {
                if (!_executed.get(parentTasks[i])) {
                    allTrue = false;
                    break;
                }
            }
            if (allTrue) {
                if (_core != null) {
                    _core.on(this);
                } else {
                    setResult(null);
                }
            }
        }
    }

}

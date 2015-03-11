package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KCurrentDefer;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.KDeferBlock;
import org.kevoree.modeling.api.KJob;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 20/01/15.
 */
//TODO OPTIMIZE THIS CLASS
public class AbstractKDefer<A> implements KCurrentDefer<A> {

    private String _name = null;
    private boolean _isDone = false;
    protected boolean _isReady = false;
    private int _nbRecResult = 0;
    private int _nbExpectedResult = 0;
    private Map<String, Object> _results = new HashMap<String, Object>();
    private Set<KDefer> _nextTasks = new HashSet<KDefer>();
    private KJob _job;
    private A _result = null;

    protected synchronized boolean setDoneOrRegister(KDefer next) {
        if (next != null) {
            _nextTasks.add(next);
            return _isDone;
        } else {
            _isDone = true;
            //inform child to decrease
            KDefer[] childrenTasks = _nextTasks.toArray(new KDefer[_nextTasks.size()]);
            for (int i = 0; i < childrenTasks.length; i++) {
                ((AbstractKDefer) childrenTasks[i]).informParentEnd(this);
            }
            return _isDone;
        }
    }

    private synchronized void informParentEnd(KDefer end) {
        if (end == null) {
            //initCase
            _nbRecResult = _nbRecResult + _nbExpectedResult;
        } else {
            if (end != this) {
                AbstractKDefer castedEnd = (AbstractKDefer) end;
                String[] keys = (String[]) castedEnd._results.keySet().toArray(new String[castedEnd._results.size()]);
                for (int i = 0; i < keys.length; i++) {
                    _results.put(keys[i], castedEnd._results.get(keys[i]));
                }
                _results.put(end.getName(), castedEnd._result);
                _nbRecResult--;
            }
        }
        if (_nbRecResult == 0 && _isReady) {
            //real execution
            if (_job != null) {
                _job.run(this);
            }
            setDoneOrRegister(null);
        }
    }

    @Override
    public synchronized KDefer<A> wait(KDefer p_previous) {
        if (p_previous != this) {
            if (!((AbstractKDefer) p_previous).setDoneOrRegister(this)) {
                _nbExpectedResult++;
            } else {
                //previous is already finished, no need to count, copy the result
                AbstractKDefer castedEnd = (AbstractKDefer) p_previous;
                String[] keys = (String[]) castedEnd._results.keySet().toArray(new String[castedEnd._results.size()]);
                for (int i = 0; i < keys.length; i++) {
                    _results.put(keys[i], castedEnd._results.get(keys[i]));
                }
                _results.put(p_previous.getName(), castedEnd._result);
            }
        }
        return this;
    }

    @Override
    public synchronized KDefer<A> ready() {
        if (!_isReady) {
            _isReady = true;
            informParentEnd(null);
        }
        return this;
    }

    @Override
    public KDefer<Object> next() {
        AbstractKDefer<Object> nextTask = new AbstractKDefer<Object>();
        nextTask.wait(this);
        return nextTask;
    }

    @Override
    public void then(final Callback<A> p_callback) {
        next().setJob(new KJob() {
            @Override
            public void run(KCurrentDefer currentTask) {
                if (p_callback != null) {
                    try {
                        p_callback.on(getResult());
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }).ready();
    }

    @Override
    public KDefer<A> setName(String p_taskName) {
        _name = p_taskName;
        return this;
    }

    @Override
    public String getName() {
        if (_name == null) {
            return this.toString();
        } else {
            return _name;
        }
    }

    @Override
    public KDefer<Object> chain(final KDeferBlock p_block) {
        KDefer<Object> nextDefer = next();
        final KDefer<Object> potentialNext = new AbstractKDefer<Object>();
        nextDefer.setJob(new KJob() {
            @Override
            public void run(KCurrentDefer currentTask) {
                KDefer nextNextDefer = p_block.exec(currentTask);
                potentialNext.wait(nextNextDefer);
                potentialNext.ready();
                nextNextDefer.ready();
            }
        });
        nextDefer.ready();
        return potentialNext;
    }

    @Override
    public String[] resultKeys() {
        return _results.keySet().toArray(new String[_results.keySet().size()]);
    }

    @Override
    public Object resultByName(String p_name) {
        return _results.get(p_name);
    }

    @Override
    public Object resultByDefer(KDefer defer) {
        return _results.get(defer.getName());
    }

    @Override
    public void addDeferResult(A p_result) {
        _result = p_result;
    }

    @Override
    public void clearResults() {
        _results.clear();
    }

    @Override
    public A getResult() throws Exception {
        if (_isDone) {
            return _result;
        } else {
            throw new Exception("Task is not executed yet !");
        }
    }

    @Override
    public boolean isDone() {
        return _isDone;
    }

    @Override
    public KDefer<A> setJob(KJob p_kjob) {
        this._job = p_kjob;
        return this;
    }

}

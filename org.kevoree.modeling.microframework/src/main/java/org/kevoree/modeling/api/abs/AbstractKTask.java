package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.KCurrentTask;
import org.kevoree.modeling.api.KJob;
import org.kevoree.modeling.api.KTask;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 20/01/15.
 */
public class AbstractKTask<A> implements KCurrentTask<A> {

    private boolean _isDone = false;
    protected boolean _isReady = false;
    private int _nbRecResult = 0;
    private int _nbExpectedResult = 0;
    private Map<KTask, Object> _results = new HashMap<KTask, Object>();
    private Set<KTask> _previousTasks = new HashSet<KTask>();
    private Set<KTask> _nextTasks = new HashSet<KTask>();
    private KJob _job;
    private A _result = null;

    protected synchronized boolean setDoneOrRegister(KTask next) {
        if (next != null) {
            _nextTasks.add(next);
            return _isDone;
        } else {
            _isDone = true;
            //inform child to decrease
            KTask[] childrenTasks = _nextTasks.toArray(new KTask[_nextTasks.size()]);
            for (int i = 0; i < childrenTasks.length; i++) {
                ((AbstractKTask) childrenTasks[i]).informParentEnd(this);
            }
            return _isDone;
        }
    }

    private synchronized void informParentEnd(KTask end) {
        if (end == null) {
            //initCase
            _nbRecResult = _nbRecResult + _nbExpectedResult;
        } else {
            if (end != this) {
                AbstractKTask castedEnd = (AbstractKTask) end;
                KTask[] keys = (KTask[]) castedEnd._results.keySet().toArray(new KTask[castedEnd._results.size()]);
                for (int i = 0; i < keys.length; i++) {
                    _results.put(keys[i], castedEnd._results.get(keys[i]));
                }
                _results.put(end, castedEnd._result);
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
    public synchronized void wait(KTask p_previous) {
        if (p_previous != this) {
            _previousTasks.add(p_previous);
            if (!((AbstractKTask) p_previous).setDoneOrRegister(this)) {
                _nbExpectedResult++;
            } else {
                //previous is already finished, no need to count, copy the result
                AbstractKTask castedEnd = (AbstractKTask) p_previous;
                KTask[] keys = (KTask[]) castedEnd._results.keySet().toArray(new KTask[castedEnd._results.size()]);
                for (int i = 0; i < keys.length; i++) {
                    _results.put(keys[i], castedEnd._results.get(keys[i]));
                }
                _results.put(p_previous, castedEnd._result);
            }
        }
    }

    @Override
    public synchronized void ready() {
        if (!_isReady) {
            _isReady = true;
            informParentEnd(null);
        }
    }

    @Override
    public Map<KTask, Object> results() {
        return _results;
    }

    @Override
    public void setResult(A p_result) {
        _result = p_result;
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
    public void setJob(KJob p_kjob) {
        this._job = p_kjob;
    }

}

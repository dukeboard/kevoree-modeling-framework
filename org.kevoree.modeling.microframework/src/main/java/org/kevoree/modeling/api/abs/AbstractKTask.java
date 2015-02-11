package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
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

    private String _name = null;
    private boolean _isDone = false;
    protected boolean _isReady = false;
    private int _nbRecResult = 0;
    private int _nbExpectedResult = 0;
    private Map<String, Object> _results = new HashMap<String, Object>();
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
                    _results.put(keys[i].getName(), castedEnd._results.get(keys[i]));
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
    public synchronized KTask<A> wait(KTask p_previous) {
        if (p_previous != this) {
            if (!((AbstractKTask) p_previous).setDoneOrRegister(this)) {
                _nbExpectedResult++;
            } else {
                //previous is already finished, no need to count, copy the result
                AbstractKTask castedEnd = (AbstractKTask) p_previous;
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
    public synchronized KTask<A> ready() {
        if (!_isReady) {
            _isReady = true;
            informParentEnd(null);
        }
        return this;
    }

    @Override
    public KTask<Object> next() {
        AbstractKTask<Object> nextTask = new AbstractKTask<Object>();
        nextTask.wait(this);
        return nextTask;
    }

    @Override
    public void then(Callback<A> p_callback) {
        next().setJob(new KJob() {
            @Override
            public void run(KCurrentTask currentTask) {
                try {
                    p_callback.on(getResult());
                } catch (Exception e) {
                    e.printStackTrace();
                    p_callback.on(null);
                }
            }
        }).ready();
    }

    @Override
    public KTask<A> setName(String p_taskName) {
        _name = p_taskName;
        return this;
    }

    @Override
    public String getName() {
        if (_name == null) {
            return hashCode() + "";
        } else {
            return _name;
        }
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
    public Object resultByTask(KTask p_task) {
        return _results.get(p_task.getName());
    }

    @Override
    public void addTaskResult(A p_result) {
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
    public KTask<A> setJob(KJob p_kjob) {
        this._job = p_kjob;
        return this;
    }

}

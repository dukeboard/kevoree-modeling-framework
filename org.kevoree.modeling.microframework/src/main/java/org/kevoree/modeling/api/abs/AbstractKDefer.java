package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KCurrentDefer;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.KDeferBlock;
import org.kevoree.modeling.api.KJob;

import java.util.ArrayList;

public class AbstractKDefer<A> implements KCurrentDefer<A> {

    private boolean _isDone = false;
    protected boolean _isReady = false;
    private int _nbRecResult = 0;
    private int _nbExpectedResult = 0;
    private ArrayList<KDefer> _nextTasks = null;
    private KJob _job = null;
    private A _result = null;
    private ArrayList<AbstractKDefer> _parentResults = null;

    protected synchronized boolean setDoneOrRegister(KDefer next) {
        if (next != null) {
            if (_nextTasks == null) {
                _nextTasks = new ArrayList<KDefer>();
            }
            _nextTasks.add(next);
            return _isDone;
        } else {
            _isDone = true;
            //inform child to decrease
            if (_nextTasks != null) {
                for (int i = 0; i < _nextTasks.size(); i++) {
                    ((AbstractKDefer) _nextTasks.get(i)).informParentEnd(this);
                }
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
                if (castedEnd._result != null) {
                    if (_parentResults == null) {
                        _parentResults = new ArrayList<AbstractKDefer>();
                    }
                    _parentResults.add(castedEnd);
                }
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
                if (_parentResults == null) {
                    _parentResults = new ArrayList<AbstractKDefer>();
                }
                _parentResults.add((AbstractKDefer) p_previous);
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
    public Object resultByDefer(KDefer defer) {
        if (defer == this) {
            return _result;
        } else {
            ArrayList<AbstractKDefer> loopParents = _parentResults;
            while (loopParents != null && loopParents.size() > 0) {
                ArrayList<AbstractKDefer> loopParentsCopy = loopParents;
                loopParents = null;
                for (int i = 0; i < loopParentsCopy.size(); i++) {
                    if(loopParentsCopy.get(i).equals(defer)){
                        return loopParentsCopy.get(i)._result;
                    } else {
                        if(loopParents==null){
                            loopParents = new ArrayList<AbstractKDefer>();
                        }
                        loopParents.add(loopParentsCopy.get(i));
                    }
                }
            }
        }
        return null;
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
    public KDefer<A> setJob(KJob p_kjob) {
        this._job = p_kjob;
        return this;
    }

}

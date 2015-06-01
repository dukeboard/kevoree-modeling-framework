package org.kevoree.modeling.abs;

import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.KDefer;
import org.kevoree.modeling.memory.struct.map.StringHashMap;

import java.util.ArrayList;

public class AbstractKDefer implements KDefer {

    private boolean _isDone = false;
    protected boolean _isReady = false;
    private int _nbRecResult = 0;
    private int _nbExpectedResult = 0;
    private ArrayList<KDefer> _nextTasks = null;
    private StringHashMap<Object> _results = null;
    private Callback _thenCB = null;

    public AbstractKDefer() {
        _results = new StringHashMap<Object>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
    }

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

    @Override
    public boolean equals(Object obj) {
        return obj == this;
    }

    private synchronized void informParentEnd(KDefer end) {
        if (end == null) {
            //initCase
            _nbRecResult = _nbRecResult + _nbExpectedResult;
        } else {
            if (end != this) {
                _nbRecResult--;
            }
        }
        if (_nbRecResult == 0 && _isReady) {
            setDoneOrRegister(null);
            //execute the last callback
            if (_thenCB != null) {
                _thenCB.on(null);
            }
        }
    }

    @Override
    public synchronized KDefer waitDefer(KDefer p_previous) {
        if (p_previous != this) {
            if (!((AbstractKDefer) p_previous).setDoneOrRegister(this)) {
                _nbExpectedResult++;
            }
        }
        return this;
    }

    @Override
    public KDefer next() {
        AbstractKDefer nextTask = new AbstractKDefer();
        nextTask.waitDefer(this);
        return nextTask;
    }

    @Override
    public Callback wait(String resultName) {
        return new Callback() {
            @Override
            public void on(Object o) {
                //TODO check synchronization
                _results.put(resultName, o);
            }
        };
    }

    @Override
    public boolean isDone() {
        return _isDone;
    }

    @Override
    public Object getResult(String resultName) throws Exception {
        if (_isDone) {
            return _results.get(resultName);
        } else {
            throw new Exception("Task is not executed yet !");
        }
    }

    /**
     * @ignore ts
     */
    @Override
    public <A> A getResult(String resultName, Class<A> casted) throws Exception {
        return (A) getResult(resultName);
    }

    @Override
    public synchronized void then(Callback cb) {
        _thenCB = cb;
        _isReady = true;
        informParentEnd(null);
    }

}

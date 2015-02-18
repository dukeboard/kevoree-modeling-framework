package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KTask;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKUniverse<A extends KView, B extends KUniverse, C extends KModel> implements KUniverse<A, B, C> {

    private KModel _model;

    private long _key;

    protected AbstractKUniverse(KModel p_model, long p_key) {
        this._model = p_model;
        this._key = p_key;
    }

    @Override
    public long key() {
        return _key;
    }

    @Override
    public C model() {
        return (C) _model;
    }

    @Override
    public void delete(Callback<Throwable> callback) {
        model().storage().delete(this, callback);
    }

    @Override
    public void discard(Callback<Throwable> callback) {
        model().storage().discard(this, callback);
    }

    @Override
    public synchronized A time(long timePoint) {
        return internal_create(timePoint);
    }

    @Override
    public void listen(ModelListener listener) {
        model().storage().eventBroker().registerListener(this, listener, null);
    }

    @Override
    public void listenAllTimes(KObject target, ModelListener listener) {
        //TODO invert this and target to fix a potential bug
        model().storage().eventBroker().registerListener(this, listener, target);
    }

    protected abstract A internal_create(Long timePoint);

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof AbstractKUniverse)) {
            return false;
        } else {
            AbstractKUniverse casted = (AbstractKUniverse) obj;
            return casted._key == _key;
        }
    }

    @Override
    public B origin() {
        return (B) _model.universe(_model.storage().parentUniverseKey(_key));
    }

    @Override
    public B diverge() {
        AbstractKModel casted = (AbstractKModel) _model;
        long nextKey = _model.storage().nextUniverseKey();
        B newUniverse = (B) casted.internal_create(nextKey);
        _model.storage().initUniverse(newUniverse, this);
        return newUniverse;
    }

    @Override
    public List<B> descendants() {
        Long[] descendentsKey = _model.storage().descendantsUniverseKeys(_key);
        List<B> childs = new ArrayList<B>();
        for (int i = 0; i < descendentsKey.length; i++) {
            childs.add((B) _model.universe(descendentsKey[i]));
        }
        return childs;
    }

    @Override
    public KTask<Throwable> taskDelete() {
        AbstractKTaskWrapper<Throwable> task = new AbstractKTaskWrapper<Throwable>();
        delete(task.initCallback());
        return task;
    }

    @Override
    public KTask<Throwable> taskDiscard() {
        AbstractKTaskWrapper<Throwable> task = new AbstractKTaskWrapper<Throwable>();
        discard(task.initCallback());
        return task;
    }
}

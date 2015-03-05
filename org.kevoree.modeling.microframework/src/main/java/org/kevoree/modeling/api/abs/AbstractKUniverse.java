package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;

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
    public KDefer<Throwable> delete() {
        AbstractKDeferWrapper<Throwable> task = new AbstractKDeferWrapper<Throwable>();
        model().manager().delete(this, task.initCallback());
        return task;
    }

    @Override
    public A time(long timePoint) {
        if(timePoint <= KConfig.END_OF_TIME && timePoint >= KConfig.BEGINNING_OF_TIME){
            return internal_create(timePoint);
        } else {
            throw new RuntimeException("The selected Time "+timePoint+" is out of the range of KMF managed time");
        }
    }

    protected abstract A internal_create(long timePoint);

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
        return (B) _model.universe(_model.manager().parentUniverseKey(_key));
    }

    @Override
    public B diverge() {
        AbstractKModel casted = (AbstractKModel) _model;
        long nextKey = _model.manager().nextUniverseKey();
        B newUniverse = (B) casted.internal_create(nextKey);
        _model.manager().initUniverse(newUniverse, this);
        return newUniverse;
    }

    @Override
    public List<B> descendants() {
        long[] descendentsKey = _model.manager().descendantsUniverseKeys(_key);
        List<B> childs = new ArrayList<B>();
        for (int i = 0; i < descendentsKey.length; i++) {
            childs.add((B) _model.universe(descendentsKey[i]));
        }
        return childs;
    }

}

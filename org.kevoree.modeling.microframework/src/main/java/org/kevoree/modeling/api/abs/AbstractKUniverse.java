package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.manager.KDataManager;

import java.util.ArrayList;
import java.util.List;

public abstract class AbstractKUniverse<A extends KView, B extends KUniverse, C extends KModel> implements KUniverse<A, B, C> {

    final protected long _universe;

    final protected KDataManager _manager;

    protected AbstractKUniverse(long p_key, KDataManager p_manager) {
        this._universe = p_key;
        this._manager = p_manager;
    }

    @Override
    public long key() {
        return _universe;
    }

    @Override
    public C model() {
        return (C) this._manager.model();
    }

    @Override
    public KDefer<Throwable> delete() {
        AbstractKDeferWrapper<Throwable> task = new AbstractKDeferWrapper<Throwable>();
        model().manager().delete(this, task.initCallback());
        return task;
    }

    @Override
    public A time(long timePoint) {
        if (timePoint <= KConfig.END_OF_TIME && timePoint >= KConfig.BEGINNING_OF_TIME) {
            return internal_create(timePoint);
        } else {
            throw new RuntimeException("The selected Time " + timePoint + " is out of the range of KMF managed time");
        }
    }

    protected abstract A internal_create(long timePoint);

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof AbstractKUniverse)) {
            return false;
        } else {
            AbstractKUniverse casted = (AbstractKUniverse) obj;
            return casted._universe == _universe;
        }
    }

    @Override
    public B origin() {
        return (B) _manager.model().universe(_manager.parentUniverseKey(_universe));
    }

    @Override
    public B diverge() {
        AbstractKModel casted = (AbstractKModel) _manager.model();
        long nextKey = _manager.nextUniverseKey();
        B newUniverse = (B) casted.internalCreateUniverse(nextKey);
        _manager.initUniverse(newUniverse, this);
        return newUniverse;
    }

    @Override
    public List<B> descendants() {
        long[] descendentsKey = _manager.descendantsUniverseKeys(_universe);
        List<B> childs = new ArrayList<B>();
        for (int i = 0; i < descendentsKey.length; i++) {
            childs.add((B) _manager.model().universe(descendentsKey[i]));
        }
        return childs;
    }

    @Override
    public KDefer<KObject[]> lookupAllTimes(long uuid, long[] times) {
        AbstractKDeferWrapper<KObject[]> deferWrapper = new AbstractKDeferWrapper<KObject[]>();
        //TODO
        return deferWrapper;
    }

    @Override
    public void listenAll(long groupId, long[] objects, KEventMultiListener multiListener) {
        model().manager().cdn().registerMultiListener(groupId, this, objects, multiListener);
    }
}

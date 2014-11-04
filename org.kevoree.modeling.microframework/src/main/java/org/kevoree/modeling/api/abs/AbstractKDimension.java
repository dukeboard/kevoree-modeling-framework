package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.ModelListener;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKDimension<A extends KView, B extends KDimension, C extends KUniverse> implements KDimension<A, B, C> {

    private KUniverse _universe;

    private long _key;

    private Map<Long, A> _timesCache = new HashMap<Long, A>();

    protected AbstractKDimension(KUniverse p_universe, long p_key) {
        this._universe = p_universe;
        this._key = p_key;
    }

    @Override
    public long key() {
        return _key;
    }

    @Override
    public C universe() {
        return (C) _universe;
    }

    @Override
    public void save(Callback<Throwable> callback) {
        universe().storage().save(this, callback);
    }

    @Override
    public void saveUnload(Callback<Throwable> callback) {
        universe().storage().saveUnload(this, callback);
    }

    @Override
    public void delete(Callback<Throwable> callback) {
        universe().storage().delete(this, callback);
    }

    @Override
    public void discard(Callback<Throwable> callback) {
        universe().storage().discard(this, callback);
    }

    public void timeTrees(long[] keys, Callback<TimeTree[]> callback) {
        universe().storage().timeTrees(this, keys, callback);
    }

    public void timeTree(long key, Callback<TimeTree> callback) {
        universe().storage().timeTree(this, key, callback);
    }

    @Override
    public void parent(Callback<B> callback) {
        //TODO
    }

    @Override
    public void children(Callback<B[]> callback) {
        //TODO
    }

    @Override
    public void fork(Callback<B> callback) {
        //TODO
    }

    @Override
    public synchronized A time(Long timePoint) {
        if (_timesCache.containsKey(timePoint)) {
            return _timesCache.get(timePoint);
        } else {
            A newCreatedTime = internal_create(timePoint);
            _timesCache.put(timePoint, newCreatedTime);
            return newCreatedTime;
        }
    }

    public void listen(ModelListener listener) {
        universe().storage().registerListener(this, listener);
    }

    protected abstract A internal_create(Long timePoint);

}

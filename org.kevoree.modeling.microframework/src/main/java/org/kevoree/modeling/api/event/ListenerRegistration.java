package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.ModelListener;

/**
 * Created by gregory.nain on 26/11/14.
 */
public class ListenerRegistration {

    ListenerScope _scope;
    ModelListener _listener;
    long _dim, _time, _uuid;

    public ListenerRegistration(ModelListener plistener, ListenerScope pscope, long pdim, long ptime, long puuid) {
        this._listener = plistener;
        this._scope = pscope;
        this._dim = pdim;
        this._time = ptime;
        this._uuid = puuid;
    }

    public ListenerScope scope() {
        return _scope;
    }

    public ModelListener listener() {
        return _listener;
    }

    public long dimension() {return this._dim;}
    public long time() {return this._time;}
    public long uuid() {return this._uuid;}

}

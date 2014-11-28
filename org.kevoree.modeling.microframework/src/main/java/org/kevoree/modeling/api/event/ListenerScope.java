package org.kevoree.modeling.api.event;

/**
 * Created by gregory.nain on 26/11/14.
 */
public enum ListenerScope {

    TIME(1),
    DIMENSION(2),
    UNIVERSE(4);

    private int _value;
    private ListenerScope(int pvalue) {
        this._value=pvalue;
    }
    public int value(){return _value;}

}

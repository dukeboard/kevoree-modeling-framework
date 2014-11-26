package org.kevoree.modeling.api.event;

/**
 * Created by gregory.nain on 26/11/14.
 */
public class ListenerScope {

    private int _value;
    private ListenerScope(int pvalue) {
        this._value=pvalue;
    }
    public int value(){return _value;}

    public static final ListenerScope TIME = new ListenerScope(1);
    public static final ListenerScope DIMENSION = new ListenerScope(2);
    public static final ListenerScope UNIVERSE = new ListenerScope(4);

}

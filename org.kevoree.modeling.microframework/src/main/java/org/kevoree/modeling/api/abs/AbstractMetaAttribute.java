package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.extrapolation.Extrapolation;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaType;

/**
 * Created by duke on 07/12/14.
 */
public class AbstractMetaAttribute implements MetaAttribute {

    private String _name;

    private int _index;

    private double _precision;

    private boolean _key;

    private MetaType _metaType;

    private Extrapolation _extrapolation;


    @Override
    public MetaType metaType() {
        return _metaType;
    }

    @Override
    public int index() {
        return _index;
    }

    @Override
    public String metaName() {
        return _name;
    }

    @Override
    public double precision() {
        return _precision;
    }

    @Override
    public boolean key() {
        return _key;
    }

    @Override
    public Extrapolation strategy() {
        return _extrapolation;
    }

    @Override
    public void setExtrapolation(Extrapolation extrapolation) {
        this._extrapolation = extrapolation;
    }

    public AbstractMetaAttribute(String p_name, int p_index, double p_precision, boolean p_key, MetaType p_metaType, Extrapolation p_extrapolation) {
        this._name = p_name;
        this._index = p_index;
        this._precision = p_precision;
        this._key = p_key;
        this._metaType = p_metaType;
        this._extrapolation = p_extrapolation;
    }

}

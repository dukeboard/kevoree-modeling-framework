package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;

/**
 * Created by duke on 07/12/14.
 */
public class AbstractMetaReference implements MetaReference {

    private String _name;

    private int _index;

    private boolean _contained;

    private boolean _single;

    private MetaClass _metaType;

    private MetaReference _opposite;

    private MetaClass _origin;

    public boolean single() {
        return _single;
    }

    public MetaClass metaType() {
        return _metaType;
    }

    public MetaReference opposite() {
        return _opposite;
    }

    public int index() {
        return _index;
    }

    public String metaName() {
        return _name;
    }

    public boolean contained() {
        return _contained;
    }

    public MetaClass origin() {
        return _origin;
    }

    public AbstractMetaReference(String p_name, int p_index, boolean p_contained, boolean p_single, MetaClass p_metaType, MetaReference p_opposite, MetaClass p_origin) {
        this._name = p_name;
        this._index = p_index;
        this._contained = p_contained;
        this._single = p_single;
        this._metaType = p_metaType;
        this._opposite = p_opposite;
        this._origin = p_origin;
    }

}

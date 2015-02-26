package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.meta.MetaType;

/**
 * Created by duke on 07/12/14.
 */
public class AbstractMetaReference implements MetaReference {

    private String _name;

    private int _index;

    private boolean _contained;

    private boolean _single;

    private LazyResolver _lazyMetaType;

    private LazyResolver _lazyMetaOpposite;

    private LazyResolver _lazyMetaOrigin;

    public boolean single() {
        return _single;
    }

    public MetaClass attributeType() {
        if (_lazyMetaType != null) {
            return (MetaClass) _lazyMetaType.meta();
        } else {
            return null;
        }
    }

    public MetaReference opposite() {
        if (_lazyMetaOpposite != null) {
            return (MetaReference) _lazyMetaOpposite.meta();
        }
        return null;
    }

    @Override
    public MetaClass origin() {
        if (_lazyMetaOrigin != null) {
            return (MetaClass) _lazyMetaOrigin.meta();
        }
        return null;
    }

    public int index() {
        return _index;
    }

    public String metaName() {
        return _name;
    }

    @Override
    public MetaType metaType() {
        return MetaType.REFERENCE;
    }

    public boolean contained() {
        return _contained;
    }

    public AbstractMetaReference(String p_name, int p_index, boolean p_contained, boolean p_single, LazyResolver p_lazyMetaType, LazyResolver p_lazyMetaOpposite, LazyResolver p_lazyMetaOrigin) {
        this._name = p_name;
        this._index = p_index;
        this._contained = p_contained;
        this._single = p_single;
        this._lazyMetaType = p_lazyMetaType;
        this._lazyMetaOpposite = p_lazyMetaOpposite;
        this._lazyMetaOrigin = p_lazyMetaOrigin;
    }

}

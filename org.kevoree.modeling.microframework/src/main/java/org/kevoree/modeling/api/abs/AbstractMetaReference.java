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

    private Integer _metaType_index;

    private Integer _opposite_index;

    private Integer _opposite_ref_index;

    private MetaClass _origin;

    public boolean single() {
        return _single;
    }

    public MetaClass metaType() {
        return _origin.origin().metaClasses()[_metaType_index];
    }

    public MetaReference opposite() {
        if (this._opposite_index != null && _opposite_ref_index != null) {
            MetaClass resolvedMeta = _origin.origin().metaClasses()[this._opposite_index];
            if (resolvedMeta != null) {
                return resolvedMeta.metaReferences()[_opposite_ref_index];
            }
        }
        return null;
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

    public AbstractMetaReference(String p_name, int p_index, boolean p_contained, boolean p_single, Integer p_metaType_index, Integer p_opposite_index, Integer p_opposite_ref_index, MetaClass p_origin) {
        this._name = p_name;
        this._index = p_index;
        this._contained = p_contained;
        this._single = p_single;
        this._metaType_index = p_metaType_index;
        this._opposite_index = p_opposite_index;
        this._opposite_ref_index = p_opposite_ref_index;
        this._origin = p_origin;
    }

}

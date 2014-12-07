package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;

/**
 * Created by duke on 07/12/14.
 */
public class AbstractMetaOperation implements MetaOperation {

    private String _name;

    private int _index;

    private MetaClass _origin;

    public int index() {
        return _index;
    }

    public String metaName() {
        return _name;
    }

    public MetaClass origin() {
        return _origin;
    }

    public AbstractMetaOperation(String p_name, int p_index, MetaClass p_origin) {
        this._name = p_name;
        this._index = p_index;
        this._origin = p_origin;
    }

}

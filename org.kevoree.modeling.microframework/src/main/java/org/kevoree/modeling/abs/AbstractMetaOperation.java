package org.kevoree.modeling.abs;

import org.kevoree.modeling.meta.MetaClass;
import org.kevoree.modeling.meta.MetaOperation;
import org.kevoree.modeling.meta.MetaType;

public class AbstractMetaOperation implements MetaOperation {

    private String _name;

    private int _index;

    private LazyResolver _lazyMetaClass;

    @Override
    public int index() {
        return _index;
    }

    @Override
    public String metaName() {
        return _name;
    }

    @Override
    public MetaType metaType() {
        return MetaType.OPERATION;
    }

    public AbstractMetaOperation(String p_name, int p_index,LazyResolver p_lazyMetaClass) {
        this._name = p_name;
        this._index = p_index;
        this._lazyMetaClass = p_lazyMetaClass;
    }

    @Override
    public MetaClass origin() {
        if(_lazyMetaClass!=null){
            return (MetaClass) _lazyMetaClass.meta();
        }
        return null;
    }
}

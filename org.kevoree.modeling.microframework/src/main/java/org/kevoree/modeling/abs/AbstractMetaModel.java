package org.kevoree.modeling.abs;

import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.memory.struct.map.StringHashMap;
import org.kevoree.modeling.meta.MetaClass;
import org.kevoree.modeling.meta.MetaModel;
import org.kevoree.modeling.meta.MetaType;

public class AbstractMetaModel implements MetaModel {

    private String _name;

    private int _index;

    private MetaClass[] _metaClasses;

    private StringHashMap<Integer> _metaClasses_indexes = null;

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
        return MetaType.MODEL;
    }

    public AbstractMetaModel(String p_name, int p_index) {
        this._name = p_name;
        this._index = p_index;
    }

    public MetaClass[] metaClasses() {
        return _metaClasses;
    }

    public MetaClass metaClass(String name) {
        if(_metaClasses_indexes == null){
            return null;
        }
        Integer resolved = _metaClasses_indexes.get(name);
        if (resolved == null) {
            return null;
        } else {
            return _metaClasses[resolved];
        }
    }

    public void init(MetaClass[] p_metaClasses) {
        _metaClasses_indexes = new StringHashMap<Integer>(p_metaClasses.length, KConfig.CACHE_LOAD_FACTOR);
        _metaClasses = p_metaClasses;
        for (int i = 0; i < _metaClasses.length; i++) {
            _metaClasses_indexes.put(_metaClasses[i].metaName(), i);
        }
    }

}
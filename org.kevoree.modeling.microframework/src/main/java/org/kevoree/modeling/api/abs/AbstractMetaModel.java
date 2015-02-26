package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.meta.MetaType;

import java.util.HashMap;

/**
 * Created by duke on 07/12/14.
 */
public class AbstractMetaModel implements MetaModel {

    private String _name;

    private int _index;

    private MetaClass[] _metaClasses;

    private HashMap<String, Integer> _metaClasses_indexes = new HashMap<String, Integer>();

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
        Integer resolved = _metaClasses_indexes.get(name);
        if (resolved == null) {
            return null;
        } else {
            return _metaClasses[resolved];
        }
    }

    public void init(MetaClass[] p_metaClasses) {
        _metaClasses_indexes.clear();
        _metaClasses = p_metaClasses;
        for (int i = 0; i < _metaClasses.length; i++) {
            _metaClasses_indexes.put(_metaClasses[i].metaName(), i);
        }
    }

}

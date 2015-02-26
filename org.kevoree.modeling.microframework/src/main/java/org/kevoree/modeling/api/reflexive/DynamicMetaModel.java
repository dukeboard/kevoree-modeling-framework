package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.meta.MetaType;

import java.util.HashMap;

/**
 * Created by duke on 16/01/15.
 */
public class DynamicMetaModel implements MetaModel {

    private String _metaName = null;

    private HashMap<String, MetaClass> _classes = new HashMap<String, MetaClass>();

    public DynamicMetaModel(String p_metaName) {
        this._metaName = p_metaName;
    }

    @Override
    public MetaClass[] metaClasses() {
        MetaClass[] tempResult = new MetaClass[_classes.size()];
        String[] keys = _classes.keySet().toArray(new String[_classes.keySet().size()]);
        for (int i = 0; i < keys.length; i++) {
            MetaClass res = _classes.get(keys[i]);
            tempResult[res.index()] = res;
        }
        return tempResult;
    }

    @Override
    public MetaClass metaClass(String name) {
        return _classes.get(name);
    }

    @Override
    public String metaName() {
        return _metaName;
    }

    @Override
    public MetaType metaType() {
        return MetaType.MODEL;
    }

    @Override
    public int index() {
        return -1;
    }

    synchronized public DynamicMetaClass createMetaClass(String name) {
        if (_classes.containsKey(name)) {
            return (DynamicMetaClass) _classes.get(name);
        } else {
            DynamicMetaClass dynamicMetaClass = new DynamicMetaClass(name, _classes.keySet().size());
            _classes.put(name, dynamicMetaClass);
            return dynamicMetaClass;
        }
    }

    public KModel model() {
        DynamicKModel universe = new DynamicKModel();
        universe.setMetaModel(this);
        return universe;
    }


}

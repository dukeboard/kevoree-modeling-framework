package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.map.StringHashMap;
import org.kevoree.modeling.api.map.StringHashMapCallBack;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.meta.MetaType;

/**
 * Created by duke on 16/01/15.
 */
public class DynamicMetaModel implements MetaModel {

    private String _metaName = null;

    private StringHashMap<MetaClass> _classes = null;

    public DynamicMetaModel(String p_metaName) {
        this._metaName = p_metaName;
        this._classes = new StringHashMap<MetaClass>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
    }

    @Override
    public MetaClass[] metaClasses() {
        MetaClass[] tempResult = new MetaClass[_classes.size()];
        int[] loopI = new int[1];
        _classes.each(new StringHashMapCallBack<MetaClass>() {
            @Override
            public void on(String key, MetaClass value) {
                tempResult[value.index()] = value;
                loopI[0]++;
            }
        });
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
            DynamicMetaClass dynamicMetaClass = new DynamicMetaClass(name, _classes.size());
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

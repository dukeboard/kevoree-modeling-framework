package org.kevoree.modeling.meta.reflexive;

import org.kevoree.modeling.KType;
import org.kevoree.modeling.abs.*;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.extrapolation.DiscreteExtrapolation;
import org.kevoree.modeling.memory.struct.map.StringHashMap;
import org.kevoree.modeling.memory.struct.map.StringHashMapCallBack;
import org.kevoree.modeling.meta.Meta;
import org.kevoree.modeling.meta.MetaClass;

public class DynamicMetaClass extends AbstractMetaClass {

    private StringHashMap<Meta> cached_meta = new StringHashMap<Meta>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
    private int _globalIndex = 0;

    public DynamicMetaClass(String p_name, int p_index) {
        super(p_name, p_index);
        internalInit();
    }

    public DynamicMetaClass addAttribute(String p_name, KType p_type) {
        AbstractMetaAttribute tempAttribute = new AbstractMetaAttribute(p_name, _globalIndex, -1, false, p_type, DiscreteExtrapolation.instance());
        cached_meta.put(tempAttribute.metaName(), tempAttribute);
        _globalIndex = _globalIndex + 1;
        internalInit();
        return this;
    }

    private AbstractMetaReference getOrCreate(String p_name, String p_oppositeName, MetaClass p_oppositeClass, boolean p_visible, boolean p_single) {
        AbstractMetaReference previous = (AbstractMetaReference) reference(p_name);
        if(previous != null){
            return previous;
        }
        final MetaClass tempOrigin = this;
        AbstractMetaReference tempReference = new AbstractMetaReference(p_name, _globalIndex, p_visible, p_single, new LazyResolver() {
            @Override
            public Meta meta() {
                return p_oppositeClass;
            }
        }, p_oppositeName, new LazyResolver() {
            @Override
            public Meta meta() {
                return tempOrigin;
            }
        });
        cached_meta.put(tempReference.metaName(), tempReference);
        _globalIndex = _globalIndex + 1;
        internalInit();
        return tempReference;
    }

    public DynamicMetaClass addReference(String p_name, final MetaClass p_metaClass, String oppositeName) {
        final MetaClass tempOrigin = this;
        String opName = oppositeName;
        if (opName == null) {
            opName = "op_" + p_name;
            ((DynamicMetaClass) p_metaClass).getOrCreate(opName, p_name, this, false, false);
        } else {
            ((DynamicMetaClass) p_metaClass).getOrCreate(opName, p_name, this, true, false);
        }
        AbstractMetaReference tempReference = new AbstractMetaReference(p_name, _globalIndex, false, false, new LazyResolver() {
            @Override
            public Meta meta() {
                return p_metaClass;
            }
        }, opName, new LazyResolver() {
            @Override
            public Meta meta() {
                return tempOrigin;
            }
        });
        cached_meta.put(tempReference.metaName(), tempReference);
        _globalIndex = _globalIndex + 1;
        internalInit();
        return this;
    }

    public DynamicMetaClass addOperation(String p_name) {
        final MetaClass tempOrigin = this;
        AbstractMetaOperation tempOperation = new AbstractMetaOperation(p_name, _globalIndex, new LazyResolver() {
            @Override
            public Meta meta() {
                return tempOrigin;
            }
        });
        cached_meta.put(tempOperation.metaName(), tempOperation);
        _globalIndex = _globalIndex + 1;
        internalInit();
        return this;
    }

    private void internalInit() {
        Meta[] tempMeta = new Meta[cached_meta.size()];
        int[] loopKey = new int[1];
        cached_meta.each(new StringHashMapCallBack<Meta>() {
            @Override
            public void on(String key, Meta value) {
                tempMeta[value.index()] = value;
            }
        });
        init(tempMeta);
    }

}

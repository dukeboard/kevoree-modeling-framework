package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KType;
import org.kevoree.modeling.api.abs.*;
import org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;
import org.kevoree.modeling.api.map.StringHashMap;
import org.kevoree.modeling.api.map.StringHashMapCallBack;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.meta.MetaClass;

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

    public DynamicMetaClass addReference(String p_name, final MetaClass p_metaClass, boolean contained) {
        final MetaClass tempOrigin = this;
        AbstractMetaReference tempReference = new AbstractMetaReference(p_name, _globalIndex, contained, false, new LazyResolver() {
            @Override
            public Meta meta() {
                return p_metaClass;
            }
        }, null, new LazyResolver() {
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
        loopKey[0] = 0;
        cached_meta.each(new StringHashMapCallBack<Meta>() {
            @Override
            public void on(String key, Meta value) {
                tempMeta[loopKey[0]] = value;
                loopKey[0]++;
            }
        });
        init(tempMeta);
    }

}

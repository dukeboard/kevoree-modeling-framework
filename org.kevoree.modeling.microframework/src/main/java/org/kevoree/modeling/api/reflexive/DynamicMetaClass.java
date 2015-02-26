package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.KMetaType;
import org.kevoree.modeling.api.abs.*;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;
import org.kevoree.modeling.api.meta.*;

import java.util.HashMap;

/**
 * Created by duke on 16/01/15.
 */
public class DynamicMetaClass extends AbstractMetaClass {

    private HashMap<String, Meta> cached_meta = new HashMap<String, Meta>();
    private int _globalIndex = -1;

    public DynamicMetaClass(String p_name, int p_index) {
        super(p_name, p_index);
        _globalIndex = Index.RESERVED_INDEXES;
    }

    public DynamicMetaClass addAttribute(String p_name, KMetaType p_type) {
        AbstractMetaAttribute tempAttribute = new AbstractMetaAttribute(p_name, _globalIndex, -1, false, p_type, DiscreteExtrapolation.instance());
        cached_meta.put(tempAttribute.metaName(), tempAttribute);
        _globalIndex = _globalIndex + 1;
        internalInit();
        return this;
    }

    public DynamicMetaClass addReference(String p_name, MetaClass p_metaClass, boolean contained) {
        MetaClass tempOrigin = this;
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
        MetaClass tempOrigin = this;
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
        String[] keysMeta = cached_meta.keySet().toArray(new String[cached_meta.keySet().size()]);
        for (int i = 0; i < keysMeta.length; i++) {
            Meta resAtt = cached_meta.get(keysMeta[i]);
            tempMeta[i] = resAtt;
        }
        init(tempMeta);
    }

}

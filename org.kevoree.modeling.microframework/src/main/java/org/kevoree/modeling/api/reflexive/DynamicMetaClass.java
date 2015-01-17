package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.KMetaType;
import org.kevoree.modeling.api.abs.*;
import org.kevoree.modeling.api.data.Index;
import org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;
import org.kevoree.modeling.api.meta.*;

import java.util.HashMap;

/**
 * Created by duke on 16/01/15.
 */
public class DynamicMetaClass extends AbstractMetaClass {

    private HashMap<String, MetaAttribute> cached_attributes = new HashMap<String, MetaAttribute>();
    private HashMap<String, MetaReference> cached_references = new HashMap<String, MetaReference>();
    private HashMap<String, MetaOperation> cached_methods = new HashMap<String, MetaOperation>();
    private int _globalIndex = -1;

    protected DynamicMetaClass(String p_name, int p_index) {
        super(p_name, p_index);
        _globalIndex = Index.RESERVED_INDEXES;
    }

    public DynamicMetaClass addAttribute(String p_name, KMetaType p_type) {
        AbstractMetaAttribute tempAttribute = new AbstractMetaAttribute(p_name, _globalIndex, -1, false, p_type, DiscreteExtrapolation.instance());
        cached_attributes.put(tempAttribute.metaName(), tempAttribute);
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
        cached_references.put(tempReference.metaName(), tempReference);
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
        cached_methods.put(tempOperation.metaName(), tempOperation);
        _globalIndex = _globalIndex + 1;
        internalInit();
        return this;
    }

    private void internalInit() {
        MetaAttribute[] tempAttributes = new MetaAttribute[cached_attributes.size()];
        MetaReference[] tempReference = new MetaReference[cached_references.size()];
        MetaOperation[] tempOperation = new MetaOperation[cached_methods.size()];
        String[] keysAttributes = cached_attributes.keySet().toArray(new String[cached_attributes.keySet().size()]);
        for (int i = 0; i < keysAttributes.length; i++) {
            MetaAttribute resAtt = cached_attributes.get(keysAttributes[i]);
            tempAttributes[i] = resAtt;
        }
        String[] keysReferences = cached_references.keySet().toArray(new String[cached_references.keySet().size()]);
        for (int i = 0; i < keysReferences.length; i++) {
            MetaReference resRef = cached_references.get(keysReferences[i]);
            tempReference[i] = resRef;
        }
        String[] keysOperations = cached_methods.keySet().toArray(new String[cached_methods.keySet().size()]);
        for (int i = 0; i < keysOperations.length; i++) {
            MetaOperation resOp = cached_methods.get(keysOperations[i]);
            tempOperation[i] = resOp;
        }
        init(tempAttributes, tempReference, tempOperation);
    }

}

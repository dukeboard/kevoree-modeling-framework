package org.kevoree.modeling.api.meta;

import org.kevoree.modeling.api.abs.AbstractMetaAttribute;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;

/**
 * Created by duke on 10/02/15.
 */
public class MetaInferClass implements MetaClass {

    private static MetaInferClass _INSTANCE = null;

    public static MetaInferClass getInstance() {
        if (_INSTANCE == null) {
            _INSTANCE = new MetaInferClass();
        }
        return _INSTANCE;
    }

    private MetaAttribute[] _attributes = null;

    private MetaReference[] _metaReferences = new MetaReference[0];

    public MetaAttribute getRaw() {
        return _attributes[0];
    }

    public MetaAttribute getCache() {
        return _attributes[1];
    }

    private MetaInferClass() {
        _attributes = new MetaAttribute[2];
        _attributes[0] = new AbstractMetaAttribute("RAW", Index.RESERVED_INDEXES, -1, false, PrimitiveMetaTypes.STRING, new DiscreteExtrapolation());
        _attributes[1] = new AbstractMetaAttribute("CACHE", Index.RESERVED_INDEXES + 1, -1, false, PrimitiveMetaTypes.TRANSIENT, new DiscreteExtrapolation());
    }

    @Override
    public Meta[] metaElements() {
        return new Meta[0];
    }

    @Override
    public Meta meta(int index) {
        int offset = index - Index.RESERVED_INDEXES;
        if (offset == 0 || offset == 1) {
            return _attributes[offset];
        } else {
            return null;
        }
    }

    @Override
    public MetaAttribute[] metaAttributes() {
        return _attributes;
    }

    @Override
    public MetaReference[] metaReferences() {
        return _metaReferences;
    }

    @Override
    public Meta metaByName(String name) {
        return null;
    }

    @Override
    public String metaName() {
        return "KInfer";
    }

    @Override
    public int index() {
        return -1;
    }

}

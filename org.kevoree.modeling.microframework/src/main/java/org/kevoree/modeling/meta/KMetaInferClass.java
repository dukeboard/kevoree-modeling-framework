package org.kevoree.modeling.meta;

import org.kevoree.modeling.KType;
import org.kevoree.modeling.extrapolation.Extrapolation;
import org.kevoree.modeling.meta.impl.MetaAttribute;
import org.kevoree.modeling.extrapolation.DiscreteExtrapolation;

public class KMetaInferClass implements KMetaClass {

    private static KMetaInferClass _INSTANCE = null;

    public static KMetaInferClass getInstance() {
        if (_INSTANCE == null) {
            _INSTANCE = new KMetaInferClass();
        }
        return _INSTANCE;
    }

    private KMetaAttribute[] _attributes = null;

    private KMetaReference[] _metaReferences = new KMetaReference[0];

    public KMetaAttribute getRaw() {
        return _attributes[0];
    }

    public KMetaAttribute getCache() {
        return _attributes[1];
    }

    private KMetaInferClass() {
        _attributes = new KMetaAttribute[2];
        _attributes[0] = new MetaAttribute("RAW", 0, -1, false, KPrimitiveTypes.STRING, new DiscreteExtrapolation());
        _attributes[1] = new MetaAttribute("CACHE", 1, -1, false, KPrimitiveTypes.TRANSIENT, new DiscreteExtrapolation());
    }

    @Override
    public KMeta[] metaElements() {
        return new KMeta[0];
    }

    @Override
    public KMeta meta(int index) {
        if (index == 0 || index == 1) {
            return _attributes[index];
        } else {
            return null;
        }
    }

    @Override
    public KMeta metaByName(String name) {
        return attribute(name);
    }

    @Override
    public KMetaAttribute attribute(String name) {
        if (name == null) {
            return null;
        } else {
            if (name.equals(_attributes[0].metaName())) {
                return _attributes[0];
            } else if (name.equals(_attributes[1].metaName())) {
                return _attributes[1];
            } else {
                return null;
            }
        }
    }

    @Override
    public KMetaReference reference(String name) {
        return null;
    }

    @Override
    public KMetaOperation operation(String name) {
        return null;
    }

    @Override
    public KMetaAttribute addAttribute(String attributeName, KType p_type, Double p_precision, Extrapolation extrapolation) {
        return null;
    }

    @Override
    public KMetaReference addReference(String referenceName, KMetaClass metaClass, String oppositeName, boolean toMany) {
        return null;
    }

    @Override
    public KMetaOperation addOperation(String operationName) {
        return null;
    }

    @Override
    public String metaName() {
        return "KInfer";
    }

    @Override
    public MetaType metaType() {
        return MetaType.CLASS;
    }

    @Override
    public int index() {
        return -1;
    }

}

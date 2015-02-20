package org.kevoree.modeling.microframework.test.cloud.meta;

import org.kevoree.modeling.api.abs.*;
import org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;
import org.kevoree.modeling.api.meta.*;

/**
 * Created by duke on 07/12/14.
 */
public class MetaNode extends AbstractMetaClass {

    private static MetaNode INSTANCE = null;

    public static MetaNode getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new MetaNode();
        }
        return INSTANCE;
    }

    public static final MetaAttribute ATT_NAME = new AbstractMetaAttribute("name", 4, 5, true, PrimitiveMetaTypes.STRING, DiscreteExtrapolation.instance());

    public static final MetaAttribute ATT_VALUE = new AbstractMetaAttribute("value", 5, 5, false, PrimitiveMetaTypes.STRING, DiscreteExtrapolation.instance());

    public static final MetaReference REF_CHILDREN = new AbstractMetaReference("children", 6, true, false, new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaNode.getInstance();
        }
    }, null, new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaNode.getInstance();
        }
    });

    public static final MetaReference REF_ELEMENT = new AbstractMetaReference("element", 7, true, true, null, null, new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaNode.getInstance();
        }
    });

    public static final MetaOperation OP_TRIGGER = new AbstractMetaOperation("trigger", 8, new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaNode.getInstance();
        }
    });

    public MetaNode() {
        super("org.kevoree.modeling.microframework.test.cloud.Node", 0);
        MetaAttribute[] temp_attributes = new MetaAttribute[2];
        temp_attributes[0] = ATT_NAME;
        temp_attributes[1] = ATT_VALUE;
        MetaReference[] temp_references = new MetaReference[2];
        temp_references[0] = REF_CHILDREN;
        temp_references[1] = REF_ELEMENT;
        MetaOperation[] temp_operations = new MetaOperation[1];
        temp_operations[0] = OP_TRIGGER;
        init(temp_attributes, temp_references, temp_operations);
    }

}

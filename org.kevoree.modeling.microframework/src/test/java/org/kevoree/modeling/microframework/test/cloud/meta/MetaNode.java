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

    public static final MetaAttribute ATT_NAME = new AbstractMetaAttribute("name", 0, 5, true, PrimitiveTypes.STRING, DiscreteExtrapolation.instance());

    public static final MetaAttribute ATT_VALUE = new AbstractMetaAttribute("value", 1, 5, false, PrimitiveTypes.STRING, DiscreteExtrapolation.instance());

    public static final MetaReference REF_CHILDREN = new AbstractMetaReference("children", 2, true, false, new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaNode.getInstance();
        }
    }, "children", new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaNode.getInstance();
        }
    });

    public static final MetaReference REF_OP_CHILDREN = new AbstractMetaReference("op_children", 3, true, false, new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaNode.getInstance();
        }
    }, "children", new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaNode.getInstance();
        }
    });

    public static final MetaReference REF_ELEMENT = new AbstractMetaReference("element", 4, true, true, new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaElement.getInstance();
        }
    }, "op_element", new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaNode.getInstance();
        }
    });

    public static final MetaOperation OP_TRIGGER = new AbstractMetaOperation("trigger", 5, new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaNode.getInstance();
        }
    });

    public MetaNode() {
        super("org.kevoree.modeling.microframework.test.cloud.Node", 0);
        Meta[] temp = new Meta[6];
        temp[0] = ATT_NAME;
        temp[1] = ATT_VALUE;
        temp[2] = REF_CHILDREN;
        temp[3] = REF_OP_CHILDREN;
        temp[4] = REF_ELEMENT;
        temp[5] = OP_TRIGGER;
        init(temp);
    }

}

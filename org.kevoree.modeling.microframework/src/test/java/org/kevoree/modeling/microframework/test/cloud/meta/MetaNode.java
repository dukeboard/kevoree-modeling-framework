package org.kevoree.modeling.microframework.test.cloud.meta;

import org.kevoree.modeling.api.abs.AbstractMetaAttribute;
import org.kevoree.modeling.api.abs.AbstractMetaClass;
import org.kevoree.modeling.api.abs.AbstractMetaOperation;
import org.kevoree.modeling.api.abs.AbstractMetaReference;
import org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;
import org.kevoree.modeling.api.meta.*;

/**
 * Created by duke on 07/12/14.
 */
public class MetaNode extends AbstractMetaClass {

    public static MetaNode build(MetaModel p_origin) {
        return new MetaNode(p_origin);
    }

    public final MetaAttribute ATT_NAME;

    public final MetaAttribute ATT_VALUE;

    public final MetaReference REF_CHILDREN;

    public final MetaReference REF_ELEMENT;

    public final MetaOperation OP_TRIGGER;

    private MetaNode(MetaModel p_origin) {
        super("org.kevoree.modeling.microframework.test.cloud.Node", 0, p_origin);
        ATT_NAME = new AbstractMetaAttribute("name", 5, 5, true, MetaType.STRING, DiscreteExtrapolation.instance(), this);
        ATT_VALUE = new AbstractMetaAttribute("value", 6, 5, false, MetaType.STRING, DiscreteExtrapolation.instance(), this);
        MetaAttribute[] temp_attributes = new MetaAttribute[2];
        temp_attributes[0] = ATT_NAME;
        temp_attributes[1] = ATT_VALUE;
        REF_CHILDREN = new AbstractMetaReference("children", 7, true, false, null, null, this);
        REF_ELEMENT = new AbstractMetaReference("element", 8, true, true, null, null, this);
        MetaReference[] temp_references = new MetaReference[2];
        temp_references[0] = REF_CHILDREN;
        temp_references[1] = REF_ELEMENT;
        OP_TRIGGER = new AbstractMetaOperation("trigger", 9, this);
        MetaOperation[] temp_operations = new MetaOperation[1];
        temp_operations[0] = OP_TRIGGER;
        init(temp_attributes, temp_references, temp_operations);
    }

}

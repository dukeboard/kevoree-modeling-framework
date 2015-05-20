package org.kevoree.modeling.microframework.test.cloud.meta;

import org.kevoree.modeling.api.abs.AbstractMetaAttribute;
import org.kevoree.modeling.api.abs.AbstractMetaClass;
import org.kevoree.modeling.api.abs.AbstractMetaReference;
import org.kevoree.modeling.api.abs.LazyResolver;
import org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;
import org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation;
import org.kevoree.modeling.api.meta.*;

/**
 * Created by duke on 07/12/14.
 */
public class MetaElement extends AbstractMetaClass {

    private static MetaElement INSTANCE = null;

    public static MetaElement getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new MetaElement();
        }
        return INSTANCE;
    }

    public static final MetaAttribute ATT_NAME = new AbstractMetaAttribute("name", 0, 5, true, PrimitiveTypes.STRING, DiscreteExtrapolation.instance());

    public static final MetaAttribute ATT_VALUE = new AbstractMetaAttribute("value", 1, 5, false, PrimitiveTypes.DOUBLE, PolynomialExtrapolation.instance());

    public static final MetaReference REF_OP_ELEMENT = new AbstractMetaReference("op_element", 2, false, false, new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaNode.getInstance();
        }
    }, "element", new LazyResolver() {
        @Override
        public Meta meta() {
            return MetaElement.getInstance();
        }
    });

    public MetaElement() {
        super("org.kevoree.modeling.microframework.test.cloud.Element", 1);
        Meta[] temp = new Meta[3];
        temp[0] = ATT_NAME;
        temp[1] = ATT_VALUE;
        temp[2] = REF_OP_ELEMENT;
        init(temp);
    }

}

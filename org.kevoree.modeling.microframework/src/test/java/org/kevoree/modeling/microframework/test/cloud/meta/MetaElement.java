package org.kevoree.modeling.microframework.test.cloud.meta;

import org.kevoree.modeling.api.abs.AbstractMetaAttribute;
import org.kevoree.modeling.api.abs.AbstractMetaClass;
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

    public static final MetaAttribute ATT_NAME = new AbstractMetaAttribute("name", 4, 5, true, PrimitiveMetaTypes.STRING, DiscreteExtrapolation.instance());

    public static final MetaAttribute ATT_VALUE = new AbstractMetaAttribute("value", 5, 5, false, PrimitiveMetaTypes.DOUBLE, PolynomialExtrapolation.instance());

    public MetaElement() {
        super("org.kevoree.modeling.microframework.test.cloud.Element", 1);
        MetaAttribute[] temp_attributes = new MetaAttribute[2];
        temp_attributes[0] = ATT_NAME;
        temp_attributes[1] = ATT_VALUE;
        MetaReference[] temp_references = new MetaReference[0];
        MetaOperation[] temp_operations = new MetaOperation[0];
        init(temp_attributes, temp_references, temp_operations);
    }

}

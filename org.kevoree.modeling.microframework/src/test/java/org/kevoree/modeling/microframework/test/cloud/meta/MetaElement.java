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

    public static MetaElement build(MetaModel p_origin) {
        return new MetaElement(p_origin);
    }

    public final MetaAttribute ATT_NAME;

    public final MetaAttribute ATT_VALUE;

    private MetaElement(MetaModel p_origin) {
        super("org.kevoree.modeling.microframework.test.cloud.Element", 1, p_origin);
        ATT_NAME = new AbstractMetaAttribute("name", 5, 5, true, MetaType.STRING, DiscreteExtrapolation.instance(), this);
        ATT_VALUE = new AbstractMetaAttribute("value", 6, 5, false, MetaType.DOUBLE, PolynomialExtrapolation.instance(), this);
        MetaAttribute[] temp_attributes = new MetaAttribute[2];
        temp_attributes[0] = ATT_NAME;
        temp_attributes[1] = ATT_VALUE;
        MetaReference[] temp_references = new MetaReference[0];
        MetaOperation[] temp_operations = new MetaOperation[0];
        init(temp_attributes, temp_references, temp_operations);
    }

}

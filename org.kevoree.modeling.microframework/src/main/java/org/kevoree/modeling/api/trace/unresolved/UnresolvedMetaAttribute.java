package org.kevoree.modeling.api.trace.unresolved;

import org.kevoree.modeling.api.meta.MetaType;
import org.kevoree.modeling.api.strategy.ExtrapolationStrategy;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;

/**
 * Created by duke on 10/16/14.
 */
public class UnresolvedMetaAttribute implements MetaAttribute {

    private String metaName;

    public UnresolvedMetaAttribute(String metaName) {
        this.metaName = metaName;
    }

    @Override
    public boolean key() {
        return false;
    }

    @Override
    public MetaClass origin() {
        return null;
    }

    @Override
    public MetaType metaType() {
        return null;
    }

    @Override
    public ExtrapolationStrategy strategy() {
        return null;
    }

    @Override
    public double precision() {
        return 0;
    }

    @Override
    public void setExtrapolationStrategy(ExtrapolationStrategy extrapolationStrategy) {

    }

    @Override
    public String metaName() {
        return metaName;
    }

    @Override
    public int index() {
        return -1;
    }
}

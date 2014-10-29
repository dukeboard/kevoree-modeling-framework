package org.kevoree.modeling.api.meta;

import org.kevoree.modeling.api.strategy.ExtrapolationStrategy;

/**
 * Created by duke on 10/9/14.
 */
public interface MetaAttribute extends Meta {

    boolean learned();

    boolean key();

    MetaClass origin();

    public enum MetaType {
        STRING, LONG, INT, BOOL, SHORT, DOUBLE, FLOAT;
    }

    MetaType metaType();

    ExtrapolationStrategy strategy();

    public void setExtrapolationStrategy(ExtrapolationStrategy extrapolationStrategy);

}

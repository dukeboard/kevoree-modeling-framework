package org.kevoree.modeling.api.meta;

/**
 * Created by duke on 10/9/14.
 */
public interface MetaAttribute extends Meta {

    boolean learned();

    boolean key();

    MetaClass origin();

    public enum MetaType {
        String, Long, Int, Bool, Short, Double, Float;
    }

    MetaType metaType();

}

package org.kevoree.modeling.api.meta;

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

}

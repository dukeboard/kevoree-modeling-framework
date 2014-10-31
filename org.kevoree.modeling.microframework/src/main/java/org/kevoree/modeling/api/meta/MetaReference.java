package org.kevoree.modeling.api.meta;

/**
 * Created by duke on 10/9/14.
 */
public interface MetaReference extends Meta {

    boolean contained();

    boolean single();

    MetaClass metaType();

    MetaReference opposite();

    MetaClass origin();

}

package org.kevoree.modeling.api;

/**
 * Created by duke on 12/01/15.
 */
public interface KType {

    String name();

    boolean isEnum();

    String save(Object src);

    Object load(String payload);

}

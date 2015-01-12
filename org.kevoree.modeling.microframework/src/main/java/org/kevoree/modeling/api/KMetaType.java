package org.kevoree.modeling.api;

/**
 * Created by duke on 12/01/15.
 */
public interface KMetaType {

    public String name();

    public boolean isEnum();

    public String save(Object src);

    public Object load(String payload);

}

package org.kevoree.modeling.api.meta;

import org.kevoree.modeling.api.KMetaType;
import org.kevoree.modeling.api.abs.AbstractKDataType;

public class PrimitiveMetaTypes {

    public static final KMetaType STRING = new AbstractKDataType("STRING", false);
    public static final KMetaType LONG = new AbstractKDataType("LONG", false);
    public static final KMetaType INT = new AbstractKDataType("INT", false);
    public static final KMetaType BOOL = new AbstractKDataType("BOOL", false);
    public static final KMetaType SHORT = new AbstractKDataType("SHORT", false);
    public static final KMetaType DOUBLE = new AbstractKDataType("DOUBLE", false);
    public static final KMetaType FLOAT = new AbstractKDataType("FLOAT", false);
    public static final KMetaType TRANSIENT = new AbstractKDataType("TRANSIENT", false);
}
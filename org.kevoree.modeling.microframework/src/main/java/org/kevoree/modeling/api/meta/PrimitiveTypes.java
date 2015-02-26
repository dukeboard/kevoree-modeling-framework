package org.kevoree.modeling.api.meta;

import org.kevoree.modeling.api.KType;
import org.kevoree.modeling.api.abs.AbstractKDataType;

public class PrimitiveTypes {

    public static final KType STRING = new AbstractKDataType("STRING", false);
    public static final KType LONG = new AbstractKDataType("LONG", false);
    public static final KType INT = new AbstractKDataType("INT", false);
    public static final KType BOOL = new AbstractKDataType("BOOL", false);
    public static final KType SHORT = new AbstractKDataType("SHORT", false);
    public static final KType DOUBLE = new AbstractKDataType("DOUBLE", false);
    public static final KType FLOAT = new AbstractKDataType("FLOAT", false);
    public static final KType TRANSIENT = new AbstractKDataType("TRANSIENT", false);
}
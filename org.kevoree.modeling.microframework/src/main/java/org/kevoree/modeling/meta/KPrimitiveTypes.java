package org.kevoree.modeling.meta;

import org.kevoree.modeling.KType;
import org.kevoree.modeling.meta.impl.DataType;

public class KPrimitiveTypes {

    public static final KType STRING = new DataType("STRING", false);
    public static final KType LONG = new DataType("LONG", false);
    public static final KType INT = new DataType("INT", false);
    public static final KType BOOL = new DataType("BOOL", false);
    public static final KType SHORT = new DataType("SHORT", false);
    public static final KType DOUBLE = new DataType("DOUBLE", false);
    public static final KType FLOAT = new DataType("FLOAT", false);
    public static final KType TRANSIENT = new DataType("TRANSIENT", false);

}
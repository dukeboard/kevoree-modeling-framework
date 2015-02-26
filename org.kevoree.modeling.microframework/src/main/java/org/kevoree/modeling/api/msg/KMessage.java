package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 23/02/15.
 */
public abstract class KMessage {

    public static String TYPE_NAME = "type";
    public static String OPERATION_NAME = "op";
    public static String KEY_NAME = "key";
    public static String KEYS_NAME = "keys";
    public static String ID_NAME = "id";
    public static String VALUE_NAME = "value";
    public static String VALUES_NAME = "values";

    public abstract String json();

    public abstract int type();

    protected void printJsonStart(StringBuilder builder) {
        builder.append("{\n");
    }

    protected void printJsonEnd(StringBuilder builder) {
        builder.append("}\n");
    }

    protected void printType(StringBuilder builder) {
        builder.append("\"");
        builder.append(TYPE_NAME);
        builder.append("\":\"");
        builder.append(type());
        builder.append("\"\n");
    }

    protected void printElem(Object elem, String name, StringBuilder builder) {
        if (elem != null) {
            builder.append(",");
            builder.append("\"");
            builder.append(name);
            builder.append("\":\"");
            builder.append(elem.toString());
            builder.append("\"\n");
        }
    }

}

package org.kevoree.modeling.util;

/**
 * Created by duke on 7/11/14.
 */
public enum PrimitiveTypes {

    String, Long, Int, Bool, Short, Double, Float;

    public static boolean isPrimitive(String originalName) {
        for (PrimitiveTypes p : PrimitiveTypes.values()) {
            if (p.name().equals(originalName)) {
                return true;
            }
        }
        return false;
    }

    public static String toEcoreType(String originalName) {
        if (originalName.equals("String")) {
            return "java.lang.String";
        }
        if (originalName.equals("Bool")) {
            return "java.lang.Boolean";
        }
        if (originalName.equals("Int")) {
            return "java.lang.Integer";
        }
        if (originalName.equals("Long")) {
            return "java.lang.Long";
        }
        if (originalName.equals("Short")) {
            return "java.lang.Short";
        }
        if (originalName.equals("Double")) {
            return "java.lang.Double";
        }
        if (originalName.equals("Float")) {
            return "java.lang.Float";
        }
        return originalName;
    }

    public static String convert(String originalNameFull) {
        String originalName = originalNameFull;
        if (originalName.startsWith("ecore.")) {
            originalName = originalName.substring(6);
        }
        if (originalName.startsWith("java.lang.")) {
            originalName = originalName.substring(10);
        }
        if (originalName.equals("String") || originalName.equals("EString") || originalName.equals("EStringObject")) {
            return "String";
        }
        if (originalName.equals("Boolean") || originalName.equals("EBoolean") || originalName.equals("EBooleanObject")) {
            return "Bool";
        }
        if (originalName.equals("Integer") || originalName.equals("EInt") || originalName.equals("EIntegerObject")) {
            return "Int";
        }
        if (originalName.equals("Long") || originalName.equals("ELong") || originalName.equals("ELongObject")) {
            return "Long";
        }
        if (originalName.equals("Short") || originalName.equals("EShort") || originalName.equals("EShortObject")) {
            return "Short";
        }
        if (originalName.equals("Double") || originalName.equals("EDouble") || originalName.equals("EDoubleObject")) {
            return "Double";
        }
        if (originalName.equals("Float") || originalName.equals("EFloat") || originalName.equals("EFloatObject")) {
            return "Float";
        }
        return originalName;
    }

}

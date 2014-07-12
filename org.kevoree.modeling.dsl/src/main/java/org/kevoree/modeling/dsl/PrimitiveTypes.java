package org.kevoree.modeling.dsl;

/**
 * Created by duke on 7/11/14.
 */
public enum PrimitiveTypes {

    String, Long, Int, Bool, Short, Double, Float;

    public static boolean isPrimitive(String originalName) {
        for(PrimitiveTypes p : PrimitiveTypes.values()){
            if(p.name().equals(originalName)){
                return true;
            }
        }
        return false;
    }

    public static String convert(String originalName) {
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

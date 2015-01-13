package org.kevoree.modeling.api.util;

/**
 * Created by duke on 13/01/15.
 */
public class Checker {

    /**
     * @native:ts
     * {@code
     *   return param != undefined && param != null;
     * }
     * @param param
     * @return
     */
    public static boolean isDefined(Object param){
        return param != null;
    }

}

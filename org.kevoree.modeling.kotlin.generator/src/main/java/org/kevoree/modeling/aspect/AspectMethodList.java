package org.kevoree.modeling.aspect;

import java.util.ArrayList;

/**
 * Created by gregory.nain on 24/01/2014.
 */
public class AspectMethodList<T extends AspectMethod> extends ArrayList<T> {
    public T findByName(String methodName) {
        for(T method : this) {
            if(method.name.equals(methodName)) {
                return method;
            }
        }
        return null;
    }
}

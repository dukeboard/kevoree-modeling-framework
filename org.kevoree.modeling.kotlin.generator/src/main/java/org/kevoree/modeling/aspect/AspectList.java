package org.kevoree.modeling.aspect;

import java.util.ArrayList;

/**
 * Created by gregory.nain on 24/01/2014.
 */
public class AspectList<T extends AspectClass> extends ArrayList<T> {
    public T findByFqn(String aspectFqn) {
        for(T aspect : this) {
            if(aspectFqn.equals(aspect.packageName + "." + aspect.name)) {
                return aspect;
            }
        }
        return null;
    }
}

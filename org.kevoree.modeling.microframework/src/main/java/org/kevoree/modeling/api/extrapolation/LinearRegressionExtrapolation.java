package org.kevoree.modeling.api.extrapolation;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;

/**
 * Created by duke on 10/28/14.
 */
public class LinearRegressionExtrapolation implements Extrapolation {
    @Override
    public Long[] timedDependencies(KObject current) {
        //TODO ASSAD HERE, thinks about the case that the object
        return new Long[0];
    }

    @Override
    public Object extrapolate(KObject current, MetaAttribute attribute, KObject[] dependencies) {

        return null;
    }

    @Override
    public void mutate(KObject current, MetaAttribute attribute, Object payload, KObject[] dependencies) {
        
    }

    private static LinearRegressionExtrapolation INSTANCE;

    public static Extrapolation instance(){
        if(INSTANCE==null){
            INSTANCE = new LinearRegressionExtrapolation();
        }
        return INSTANCE;
    }

}

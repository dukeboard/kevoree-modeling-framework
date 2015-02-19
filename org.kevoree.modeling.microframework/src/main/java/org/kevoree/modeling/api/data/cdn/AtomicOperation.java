package org.kevoree.modeling.api.data.cdn;

/**
 * Created by duke on 19/02/15.
 */
public interface AtomicOperation {

    public String mutate(String previous);

}

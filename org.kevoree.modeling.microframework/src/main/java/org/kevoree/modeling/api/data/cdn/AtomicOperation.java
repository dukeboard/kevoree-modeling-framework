package org.kevoree.modeling.api.data.cdn;

/**
 * Created by duke on 19/02/15.
 */
public interface AtomicOperation {

    public int operationKey();

    public String mutate(String previous);

}

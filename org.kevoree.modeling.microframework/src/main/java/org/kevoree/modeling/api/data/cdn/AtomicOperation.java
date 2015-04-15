package org.kevoree.modeling.api.data.cdn;

public interface AtomicOperation {

    int operationKey();

    String mutate(String previous);

}

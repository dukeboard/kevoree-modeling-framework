package org.kevoree.modeling.memory.cdn;

public interface AtomicOperation {

    int operationKey();

    String mutate(String previous);

}

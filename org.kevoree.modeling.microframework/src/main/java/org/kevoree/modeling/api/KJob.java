package org.kevoree.modeling.api;

public interface KJob {

    void run(KCurrentDefer currentTask);

}

package org.kevoree.modeling.api;

public interface ModelFormat {

    KDefer<String> save(KObject model);

    KDefer<String> saveRoot();

    KDefer<Throwable> load(String payload);

}
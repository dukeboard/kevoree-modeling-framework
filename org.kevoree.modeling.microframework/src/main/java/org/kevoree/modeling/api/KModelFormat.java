package org.kevoree.modeling.api;

public interface KModelFormat {

    void save(KObject model, Callback<String> cb);

    void saveRoot(Callback<String> cb);

    void load(String payload, Callback cb);

}
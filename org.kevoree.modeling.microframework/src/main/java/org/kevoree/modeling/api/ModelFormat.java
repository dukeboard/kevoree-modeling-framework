package org.kevoree.modeling.api;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:21
 */

public interface ModelFormat {

    public void save(KObject model, ThrowableCallback<String> callback);

    public void load(String payload, Callback<Throwable> callback);

}
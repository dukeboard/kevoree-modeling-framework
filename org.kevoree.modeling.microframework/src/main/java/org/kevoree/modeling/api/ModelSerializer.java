package org.kevoree.modeling.api;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:21
 */

public interface ModelSerializer {

    public void serialize(KObject model, ThrowableCallback<String> callback);

}
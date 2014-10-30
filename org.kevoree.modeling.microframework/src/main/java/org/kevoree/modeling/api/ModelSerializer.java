package org.kevoree.modeling.api;

import java.io.OutputStream;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:21
 */

public interface ModelSerializer {

    public void serializeToStream(KObject model, OutputStream raw, Callback<Throwable> result);

    public void serialize(KObject model, Callback<String> callback);

}
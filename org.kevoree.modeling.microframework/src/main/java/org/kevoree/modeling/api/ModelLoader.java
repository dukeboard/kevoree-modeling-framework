package org.kevoree.modeling.api;

import java.io.InputStream;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:19
 */

public interface ModelLoader {

    public void loadModelFromString(String str, Callback<Throwable> callback);

    public void loadModelFromStream(InputStream inputStream, Callback<Throwable> callback);

}
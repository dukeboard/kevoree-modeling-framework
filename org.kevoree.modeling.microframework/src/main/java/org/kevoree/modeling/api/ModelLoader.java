package org.kevoree.modeling.api;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:19
 */

public interface ModelLoader {

    public void load(String payload, Callback<Throwable> callback);


}
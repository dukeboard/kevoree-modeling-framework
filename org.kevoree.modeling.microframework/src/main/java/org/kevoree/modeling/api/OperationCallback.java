package org.kevoree.modeling.api;

/**
 * Created by gregory.nain on 27/11/14.
 */
public interface OperationCallback {
    //TODO check name on params
    void onCall(KObject _this, Callback<Object> result, Object... parameters);
}

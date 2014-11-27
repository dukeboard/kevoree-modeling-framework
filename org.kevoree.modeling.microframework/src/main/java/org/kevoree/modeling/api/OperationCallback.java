package org.kevoree.modeling.api;

/**
 * Created by gregory.nain on 27/11/14.
 */
public interface OperationCallback {
    void onCall(KObject _this, Callback<Object> result, Object... parameters);
}

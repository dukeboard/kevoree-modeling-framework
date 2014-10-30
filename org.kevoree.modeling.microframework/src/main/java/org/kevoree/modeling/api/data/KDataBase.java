package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.event.DefaultKEvent;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:30
 */

public interface KDataBase {

    public void get(String[] keys, ThrowableCallback<String[]> callback);

    public void put(String[][] payloads, Callback<Throwable> error);

    public void remove(String[] keys, Callback<Throwable> error);

    public void commit(Callback<Throwable> error);

    public void close(Callback<Throwable> error);

}
package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.events.ModelEvent;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:30
 */

public interface DataStore {

    public void get(String key, Callback<String> callback, Callback<Exception> error);

    public void put(String key, String value, Callback<Boolean> callback, Callback<Exception> error);

    public void remove(String key, Callback<Boolean> callback, Callback<Exception> error);

    public void commit(Callback<String> callback, Callback<Exception> error);

    public void close(Callback<String> callback, Callback<Exception> error);

    public void notify(ModelEvent event);

    public void register(ModelElementListener listener, long from, long to, String path);

    public void unregister(ModelElementListener listener);

}
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

public interface KDataBase {

    public void get(String[] keys, Callback<String[]> callback, Callback<Throwable> error);

    public void put(String[][] payloads, Callback<Throwable> error);

    public void remove(String[] keys, Callback<Throwable> error);

    public void commit(Callback<Throwable> error);

    public void close(Callback<Throwable> error);

    public void notify(ModelEvent event);

    public void register(ModelElementListener listener, long from, long to, String path);

    public void unregister(ModelElementListener listener);


}
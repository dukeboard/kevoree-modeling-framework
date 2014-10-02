package org.kevoree.modeling.api;

import org.kevoree.modeling.api.events.ModelElementListener;

/**
 * Created by duke on 9/30/14.
 */

public interface Manager {

    public Dimension create();

    public Dimension get(String key);

    public void saveAll(Callback<Boolean> callback);

    public void deleteAll(Callback<Boolean> callback);

    public void unloadAll(Callback<Boolean> callback);


    public void listen(ModelElementListener listener, Long from, Long to, String path);

    public void disable(ModelElementListener listener);

    public void stream(String query, Callback<KObject> callback);

}
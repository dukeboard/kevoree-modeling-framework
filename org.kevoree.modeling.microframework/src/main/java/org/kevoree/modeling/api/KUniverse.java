package org.kevoree.modeling.api;

import org.kevoree.modeling.api.data.KStore;

/**
 * Created by duke on 9/30/14.
 */

public interface KUniverse<A extends KDimension> {

    public void newDimension(Callback<A> callback);

    public void dimension(long key, Callback<A> callback);

    public void saveAll(Callback<Boolean> callback);

    public void deleteAll(Callback<Boolean> callback);

    public void unloadAll(Callback<Boolean> callback);

    public void disable(ModelListener listener);

    public void stream(String query, Callback<KObject> callback);

    public KStore storage();

    public void listen(ModelListener listener);

}
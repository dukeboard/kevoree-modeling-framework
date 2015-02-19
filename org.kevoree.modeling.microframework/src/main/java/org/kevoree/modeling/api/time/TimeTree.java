package org.kevoree.modeling.api.time;

import org.kevoree.modeling.api.data.cache.KCacheObject;

/**
 * Created by duke on 8/1/14.
 */

public interface TimeTree extends KCacheObject {

    public void walk(TimeWalker walker);

    public Long first();

    public Long last();

    public Long next(long from);

    public Long previous(long from);

    public Long resolve(long time);

    public TimeTree insert(long time);

    public TimeTree delete(long time);

    public int size();

}
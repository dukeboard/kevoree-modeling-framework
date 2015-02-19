package org.kevoree.modeling.api.time;

import org.kevoree.modeling.api.data.cache.KCacheObject;

/**
 * Created by duke on 8/1/14.
 */

public interface TimeTree extends KCacheObject {

    public void walk(TimeWalker walker);

    public void walkAsc(TimeWalker walker);

    public void walkDesc(TimeWalker walker);

    public void walkRangeAsc(TimeWalker walker, long from, long to);

    public void walkRangeDesc(TimeWalker walker, long from, long to);

    public Long first();

    public Long last();

    public Long next(long from);

    public Long previous(long from);

    public Long resolve(long time);

    public TimeTree insert(long time);

    public TimeTree delete(long time);
    
    public int size();

}
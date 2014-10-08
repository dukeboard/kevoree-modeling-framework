package org.kevoree.modeling.api.time;

/**
 * Created by duke on 8/1/14.
 */

public interface TimeTree {

    public void walk(TimeWalker walker);

    public void walkAsc(TimeWalker walker);

    public void walkDesc(TimeWalker walker);

    public void walkRangeAsc(TimeWalker walker, long from, long to);

    public void walkRangeDesc(TimeWalker walker, long from, long to);

    public long first();

    public long last();

    public long next(long from);

    public long previous(long from);

    //TODO nextGeneration
}
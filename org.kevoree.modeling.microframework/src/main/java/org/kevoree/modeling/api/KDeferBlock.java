package org.kevoree.modeling.api;

/**
 * Created by duke on 25/02/15.
 */
public interface KDeferBlock {

    public KDefer exec(KDefer previous);

}

package org.kevoree.modeling.api.traversal;

import org.kevoree.modeling.api.KObject;

/**
 * Created by duke on 18/12/14.
 */
public interface KTraversalFilter {

    public boolean filter(KObject obj);

}
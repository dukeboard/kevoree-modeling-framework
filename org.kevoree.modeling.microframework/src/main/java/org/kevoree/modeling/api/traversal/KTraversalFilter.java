package org.kevoree.modeling.api.traversal;

import org.kevoree.modeling.api.KObject;

public interface KTraversalFilter {

    boolean filter(KObject obj);

}

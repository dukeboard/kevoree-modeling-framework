package org.kevoree.modeling.api.traversal;

import org.kevoree.modeling.api.KObject;

public interface KTraversalAction {

    void chain(KTraversalAction next);

    void execute(KObject[] inputs);

}

package org.kevoree.modeling.api.promise;

import org.kevoree.modeling.api.KObject;

/**
 * Created by duke on 18/12/14.
 */
public interface KTraversalAction {

    public void chain(KTraversalAction next);

    public void execute(KObject[] inputs);

}

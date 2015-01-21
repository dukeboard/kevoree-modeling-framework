package org.kevoree.modeling.api;

import java.util.Map;

/**
 * Created by duke on 21/01/15.
 */
public interface KCurrentTask<A> extends KTask<A> {

    public Map<KTask, Object> results();

    public void setResult(A result);

}

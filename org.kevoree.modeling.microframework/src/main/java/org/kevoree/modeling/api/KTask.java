package org.kevoree.modeling.api;

import java.util.Map;

/**
 * Created by duke on 20/01/15.
 */
public interface KTask<A> {

    public void wait(KTask previous);

    public void next(KTask previous);

    public void done(Callback<A> callback);

    public void setResult(A result);

    public A getResult();

    public boolean isDone();

    public Map<KTask, Object> previousResults();

    public void execute(Callback<KTask<A>> core);

}

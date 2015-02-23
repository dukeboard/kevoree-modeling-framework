package org.kevoree.modeling.api;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:21
 */

public interface ModelFormat {

    public KTask<String> save(KObject model);

    public KTask<String> saveRoot();

    public KTask<Throwable> load(String payload);

}
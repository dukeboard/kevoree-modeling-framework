package org.kevoree.modeling.api;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:21
 */

public interface ModelFormat {

    public KDefer<String> save(KObject model);

    public KDefer<String> saveRoot();

    public KDefer<Throwable> load(String payload);

}
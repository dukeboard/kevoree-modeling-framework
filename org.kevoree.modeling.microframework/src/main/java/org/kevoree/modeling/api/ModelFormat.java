package org.kevoree.modeling.api;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 15:21
 */

public interface ModelFormat {

    KDefer<String> save(KObject model);

    KDefer<String> saveRoot();

    KDefer<Throwable> load(String payload);

}
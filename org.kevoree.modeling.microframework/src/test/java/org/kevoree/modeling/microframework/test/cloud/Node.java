package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaNode;

/**
 * Created by duke on 10/9/14.
 */
public interface Node extends KObject {

    String getName();

    Node setName(String name);

    String getValue();

    Node setValue(String name);

    Node addChildren(Node obj);

    Node removeChildren(Node obj);

    void getChildren(Callback<Node[]> callback);

    Node setElement(Element obj);

    void getElement(Callback<Element> obj);

    void trigger(String param, Callback<String> callback);

}

package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaNode;

/**
 * Created by duke on 10/9/14.
 */
public interface Node extends KObject {

    public String getName();

    public Node setName(String name);

    public String getValue();

    public Node setValue(String name);

    public Node addChildren(Node obj);

    public Node removeChildren(Node obj);

    public void getChildren(Callback<Node[]> callback);

    public Node setElement(Element obj);

    public void getElement(Callback<Element> obj);

    public void trigger(String param, Callback<String> callback);

    @Override
    public CloudView view();

}

package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.KView;

/**
 * Created by duke on 10/9/14.
 */
public interface CloudView extends KView {

    Node createNode();

    Element createElement();

}

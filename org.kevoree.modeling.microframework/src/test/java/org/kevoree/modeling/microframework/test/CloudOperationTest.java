package org.kevoree.modeling.microframework.test;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KOperation;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudModel;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaNode;

/**
 * Created by gregory.nain on 27/11/14.
 */
public class CloudOperationTest {

    public static void main(String[] args) {
        CloudModel universe = new CloudModel();
        universe.connect(null);

        universe.setOperation(MetaNode.OP_TRIGGER, new KOperation() {
            @Override
            public void on(KObject source, Object[] params, Callback<Object> result) {
                String parameters = "[";
                for (int i = 0; i < params.length; i++) {
                    if (i != 0) {
                        parameters = parameters + ", ";
                    }
                    parameters = parameters + params[i].toString();
                }
                parameters = parameters + "]";
                result.on("Hey. I received Parameter:" + parameters + " on element:(" + source.dimension() + "," + source.now() + "," + source.uuid() + ")");
            }
        });
        CloudUniverse dimension = universe.newDimension();
        CloudView view = dimension.time(0L);
        Node n = view.createNode();
        n.trigger("MyParam", new Callback<String>() {
            @Override
            public void on(String s) {
                System.out.println("Operation execution result :  " + s);
            }
        });


    }

}

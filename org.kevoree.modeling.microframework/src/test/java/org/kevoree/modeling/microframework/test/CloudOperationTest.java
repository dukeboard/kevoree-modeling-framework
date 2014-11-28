package org.kevoree.modeling.microframework.test;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KOperation;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

import java.util.Arrays;

/**
 * Created by gregory.nain on 27/11/14.
 */
public class CloudOperationTest {

    public static void main(String[] args) {
        CloudUniverse universe = new CloudUniverse();
        universe.setOperation(Node.METAOPERATIONS.TRIGGER, new KOperation() {
            @Override
            public void on(KObject source, Object[] params, Callback<Object> result) {
                result.on("Hey. I received Parameter:" + Arrays.toString(params) + " on element:(" + source.dimension() + "," + source.now() + "," + source.uuid() + ")");
            }
        });
        CloudDimension dimension = universe.newDimension();
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

package org.kevoree.modeling.microframework.test;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.OperationCallback;
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
        universe.setOperation(CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE, Node.METAOPERATIONS.TRIGGER, new OperationCallback(){
            @Override
            public void onCall(KObject _this, Callback<Object> result, Object... parameters) {
                result.on("Hey. I received Parameter:" + Arrays.toString(parameters) + " on element:("+_this.dimension()+","+_this.now()+","+_this.uuid()+")");
            }
        });

        universe.newDimension(dimension->{
            CloudView view = dimension.time(0L);
            Node n = view.createNode();
            n.trigger(new Callback<Object>() {
                @Override
                public void on(Object o) {
                    System.out.println((String)o);
                }
            }, "Parameter1");
        });

    }

}

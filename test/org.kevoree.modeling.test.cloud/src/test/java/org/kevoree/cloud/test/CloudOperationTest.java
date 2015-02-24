package org.kevoree.cloud.test;

import cloud.CloudModel;
import cloud.CloudUniverse;
import cloud.CloudView;
import cloud.Element;
import cloud.meta.MetaElement;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KOperation;

import java.util.Arrays;

import static org.junit.Assert.assertEquals;

/**
 * Created by gregory.nain on 27/11/14.
 */
public class CloudOperationTest {

    @Test
    public void operationTest() {
        CloudModel model = new CloudModel();
        model.connect();
        CloudUniverse universe = model.newUniverse();
        CloudView view = universe.time(0L);
        model.setOperation(MetaElement.OP_TRIGGER, new KOperation() {
            public void on(KObject source, Object[] params, Callback<Object> result) {
                result.on("Hey. I received Parameter:" + Arrays.toString(params) + " on element:(" + source.universe().key() + "," + source.now() + "," + source.uuid() + ")");
            }
        });

        Element elem = view.createElement();
        elem.trigger("StringParam", 100, new Callback<String>() {
            @Override
            public void on(String s) {
                System.out.println("Operation execution result :  " + s);
                assertEquals("Hey. I received Parameter:[StringParam, 100] on element:(1,0,1)", s);
            }
        });
    }


    public static void main(String[] args) {
        new CloudOperationTest().operationTest();
    }

}

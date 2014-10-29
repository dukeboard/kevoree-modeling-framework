package org.kevoree.modeling.microframework.test.polynomial;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.api.time.TimeWalker;
import org.kevoree.modeling.microframework.test.cloud.*;

import java.util.Random;

import static org.junit.Assert.assertEquals;

/**
 * Created by duke on 10/29/14.
 */
public class PolynomialKMFTest {

    @Test
    public void test() {
        MemoryKDataBase dataBase = new MemoryKDataBase();
        CloudUniverse universe = new CloudUniverse(dataBase);
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(CloudDimension dimension0) {
                CloudView t0 = dimension0.time(0l);
                Node node = t0.createNode();
                node.setName("n0");
                t0.setRoot(node);
                Element element = t0.createElement();
                element.setName("e0");
                node.setElement(element);
                element.setValue(0l);
                //insert 20 variations in time
                for (long i = 1; i <= 100; i++) {
                    final long finalI = i;
                    dimension0.time(finalI).lookup(element.uuid(), new Callback<KObject>() {
                        @Override
                        public void on(KObject kObject) {
                            Element casted = (Element) kObject;
                            casted.setValue(new Random().nextLong());
                            //casted.setValue(finalI);
                        }
                    });
                }
                
                System.err.println(element.timeTree().size());
            }
        });
    }

}

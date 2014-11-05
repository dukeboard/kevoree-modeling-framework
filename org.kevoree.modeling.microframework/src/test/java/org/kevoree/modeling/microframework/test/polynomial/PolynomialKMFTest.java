package org.kevoree.modeling.microframework.test.polynomial;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.api.time.TimeWalker;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;
import org.kevoree.modeling.microframework.test.cloud.Element;

import java.util.Random;

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

                final double[] val= new double[1000];
                double[] coef={2,2,3};


                CloudView t0 = dimension0.time(0l);
                Node node = t0.createNode();
                node.setName("n0");
                t0.setRoot(node);
                final Element element = t0.createElement();
                element.setName("e0");
                node.setElement(element);
                element.setValue(0l);
                //insert 20 variations in time
                for (int i = 0; i < 1000; i++) {
                    long temp=1;
                    for (int j=0; j<coef.length;j++) {
                        val[i] = val[i] + coef[j]*temp;
                        temp=temp*i;
                    }
                    final long vv = (long) val[i] ;
                    final long finalI = i;
                    dimension0.time(finalI).lookup(element.uuid(), new Callback<KObject>() {
                        @Override
                        public void on(KObject kObject) {
                            Element casted = (Element) kObject;
                            casted.setValue(vv);
                        }
                    });
                }

              System.out.println(element.timeTree().size());

                for (int i = 0; i < 1000; i++) {
                    element.timeTree().walk(new TimeWalker() {
                        @Override
                        public void walk(final long timePoint) {
                            element.jump(timePoint, new Callback<Element>() {
                                @Override
                                public void on(Element element) {
                                    assert ((element.getValue()- val[(int)timePoint])<5);
                                }
                            });
                        }
                    });
                }


            }
        });
    }

    @Test
    public void test2() {
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
                for (long i = 1; i <= 10000; i++) {
                    final long finalI = i;
                    dimension0.time(finalI).lookup(element.uuid(), new Callback<KObject>() {
                        @Override
                        public void on(KObject kObject) {
                            Element casted = (Element) kObject;
                            casted.setValue((long) new Random().nextInt(100000));
                        }
                    });
                }

                System.out.println(element.timeTree().size());


                /*
                element.timeTree().walk(new TimeWalker() {
                    @Override
                    public void walk(long timePoint) {
                        element.jump(timePoint, new Callback<Element>() {
                            @Override
                            public void on(Element element) {
                                element.getValue() == oracle
                            }
                        });
                    }
                });

                */

            }
        });
    }

}

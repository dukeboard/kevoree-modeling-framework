package org.kevoree.modeling.microframework.test.polynomial;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.*;

/**
 * Created by duke on 11/25/14.
 */
public class PolynomialSaveLoadTest {

    @Test
    public void test() {

        MemoryKDataBase.DEBUG = true;

        final int[] nbAssert = new int[1];
        nbAssert[0] = 0;
        CloudUniverse universe = new CloudUniverse();
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(CloudDimension d) {
                final CloudDimension[] dimension = {d};
                final double[] val = new double[1000];
                double[] coef = {2, 2, 3};
                CloudView t0 = dimension[0].time(0l);
                Node node = t0.createNode();
                node.setName("n0");
                t0.setRoot(node);
                final Element element = t0.createElement();
                element.setName("e0");
                node.setElement(element);
                element.setValue(0.0);
                //insert 20 variations in time
                for (int i = 200; i < 1000; i++) {



                    if ((i % 100) == 0) {
                        System.err.println("Save " + i);
                        dimension[0].save(new Callback<Throwable>() {
                            @Override
                            public void on(Throwable throwable) {
                                universe.dimension(dimension[0].key(), new Callback<CloudDimension>() {
                                    @Override
                                    public void on(CloudDimension cloudDimension) {
                                        dimension[0] = cloudDimension;
                                    }
                                });
                            }
                        });
                    }


                    long temp = 1;
                    val[i] = 0;
                    for (int j = 0; j < coef.length; j++) {
                        val[i] = val[i] + coef[j] * temp;
                        temp = temp * i;
                    }
                    final double vv = val[i];
                    final long finalI = i;
                    dimension[0].time(finalI).lookup(element.uuid(), new Callback<KObject>() {
                        @Override
                        public void on(KObject kObject) {
                            Element casted = (Element) kObject;
                            casted.setValue(vv);
                        }
                    });
                }
                Assert.assertEquals(element.timeTree().size(), 1);
                nbAssert[0]++;
                for (int i = 200; i < 1000; i++) {
                    final int finalI = i;
                    element.jump((long) finalI, new Callback<Element>() {
                        @Override
                        public void on(Element element) {
                            nbAssert[0]++;
                            //System.out.println(element.getValue());
                            Assert.assertTrue((element.getValue() - val[finalI]) < 5);
                        }
                    });
                }
                Assert.assertEquals(element.timeTree().size(), 1);

                dimension[0].save(new Callback<Throwable>() {
                    @Override
                    public void on(Throwable throwable) {
                        universe.dimension(dimension[0].key(), new Callback<CloudDimension>() {
                            @Override
                            public void on(CloudDimension cloudDimension) {
                                dimension[0] = cloudDimension;
                            }
                        });
                    }
                });


            }
        });
        Assert.assertEquals(nbAssert[0], 801);
    }

}

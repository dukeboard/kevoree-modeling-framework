package org.kevoree.modeling.microframework.test.gc;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KModel;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.meta.reflexive.DynamicMetaClass;
import org.kevoree.modeling.meta.reflexive.DynamicMetaModel;

/**
 * Created by duke on 27/03/15.
 */
public class KCacheCleanerTest {

    /**
     * @ignore ts
     */
    @Test
    public void test() {
        DynamicMetaModel dynamicMetaModel = new DynamicMetaModel("MyMetaModel");
        final DynamicMetaClass sensorMetaClass = dynamicMetaModel.createMetaClass("Sensor");
        final KModel universe = dynamicMetaModel.model();
        universe.connect(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                KObject sensor = universe.universe(0).time(0).create(sensorMetaClass);
                long sensorID = sensor.uuid();
                sensor = null;
                universe.save(null);
                System.gc();
                universe.manager().cache().clean();
                Assert.assertEquals(1, universe.manager().cache().size());
                universe.universe(0).time(0).lookup(sensorID, new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        Assert.assertNotNull(kObject);
                        Assert.assertEquals(4, universe.manager().cache().size());

                        kObject.jump(10, new Callback<KObject>() {
                            @Override
                            public void on(KObject kObject2) {
                                Assert.assertNotNull(kObject2);
                                Assert.assertEquals(4, universe.manager().cache().size());
                            }
                        });
                    }
                });
            }
        });
    }

}

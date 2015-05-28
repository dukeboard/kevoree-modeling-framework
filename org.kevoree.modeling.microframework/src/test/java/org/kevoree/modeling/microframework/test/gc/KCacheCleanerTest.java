package org.kevoree.modeling.microframework.test.gc;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.reflexive.DynamicMetaClass;
import org.kevoree.modeling.api.reflexive.DynamicMetaModel;

/**
 * Created by duke on 27/03/15.
 */
public class KCacheCleanerTest {

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

                System.err.println("Hello");

                universe.universe(0).time(0).lookup(sensorID,new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                       System.err.println(kObject);
                    }
                });
            }
        });
    }

}

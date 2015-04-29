package org.kevoree.modeling.microframework.test.util;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.meta.PrimitiveTypes;
import org.kevoree.modeling.api.reflexive.DynamicMetaClass;
import org.kevoree.modeling.api.reflexive.DynamicMetaModel;

/**
 * Created by duke on 29/04/15.
 */
public class SpeedTest {

    @Test
    public void test(){

        DynamicMetaModel dynamicMetaModel = new DynamicMetaModel("MyMetaModel");
        final DynamicMetaClass sensorMetaClass = dynamicMetaModel.createMetaClass("Sensor");
        sensorMetaClass
                .addAttribute("name", PrimitiveTypes.STRING)
                .addAttribute("value", PrimitiveTypes.FLOAT)
                .addReference("siblings", sensorMetaClass, false);
        DynamicMetaClass homeMetaClass = dynamicMetaModel.createMetaClass("Home");
        homeMetaClass
                .addAttribute("name", PrimitiveTypes.STRING)
                .addReference("sensors", sensorMetaClass, true);
        final KModel universe = dynamicMetaModel.model();
        universe.connect().then(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                KObject home = universe.universe(0).time(0).create(universe.metaModel().metaClass("Home"));
                home.set(home.metaClass().attribute("name"), "MainHome");

                KObject sensor = universe.universe(0).time(0).create(sensorMetaClass);
                sensor.set(sensor.metaClass().attribute("name"), "Sensor#1");

                home.mutate(KActionType.ADD, (MetaReference) home.metaClass().metaByName("sensors"), sensor);

                long before = System.currentTimeMillis();
                MetaAttribute att = sensor.metaClass().attribute("value");
                for(int i=0;i<5000000;i++){
                    sensor.jump2(i, new Callback<KObject>() {
                        @Override
                        public void on(KObject kObject) {
                            kObject.set(att,"hello_");
                        }
                    });
                }
                long after = System.currentTimeMillis();
                System.out.println(after-before);

            }
        });

    }

}

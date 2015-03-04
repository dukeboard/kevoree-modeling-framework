package org.kevoree.modeling.microframework.test.reflexive;

import org.junit.Test;
import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.meta.PrimitiveTypes;
import org.kevoree.modeling.api.reflexive.DynamicMetaClass;
import org.kevoree.modeling.api.reflexive.DynamicMetaModel;

/**
 * Created by duke on 16/01/15.
 */
public class ReflexiveTest {

    @Test
    public void test() {

        DynamicMetaModel dynamicMetaModel = new DynamicMetaModel("MyMetaModel");

        DynamicMetaClass sensorMetaClass = dynamicMetaModel.createMetaClass("Sensor");

        sensorMetaClass
                .addAttribute("name", PrimitiveTypes.STRING)
                .addAttribute("value", PrimitiveTypes.FLOAT)
                .addReference("siblings", sensorMetaClass, false);

        DynamicMetaClass homeMetaClass = dynamicMetaModel.createMetaClass("Home");
        homeMetaClass
                .addAttribute("name", PrimitiveTypes.STRING)
                .addReference("sensors", sensorMetaClass, true);

        KModel universe = dynamicMetaModel.model();
        universe.connect().then(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                KObject home = universe.universe(0).time(0).create(universe.metaModel().metaClass("Home"));
                home.set(home.metaClass().attribute("name"),"MainHome");

                KObject sensor = universe.universe(0).time(0).create(sensorMetaClass);
                sensor.set(sensor.metaClass().attribute("name"),"Sensor#1");

                home.mutate(KActionType.ADD, (MetaReference) home.metaClass().metaByName("sensors"),sensor);

                universe.universe(0).time(0).json().save(home).then(new Callback<String>() {
                    @Override
                    public void on(String s) {

                    }
                });

            }
        });


    }

}

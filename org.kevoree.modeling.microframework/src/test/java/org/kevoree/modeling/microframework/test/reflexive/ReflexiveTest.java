package org.kevoree.modeling.microframework.test.reflexive;

import org.junit.Test;
import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KActionType;
import org.kevoree.modeling.KModel;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.meta.MetaReference;
import org.kevoree.modeling.meta.PrimitiveTypes;
import org.kevoree.modeling.meta.reflexive.DynamicMetaClass;
import org.kevoree.modeling.meta.reflexive.DynamicMetaModel;

/**
 * Created by duke on 16/01/15.
 */
public class ReflexiveTest {

    @Test
    public void test() {

        DynamicMetaModel dynamicMetaModel = new DynamicMetaModel("MyMetaModel");

        final DynamicMetaClass sensorMetaClass = dynamicMetaModel.createMetaClass("Sensor");

        sensorMetaClass
                .addAttribute("name", PrimitiveTypes.STRING)
                .addAttribute("value", PrimitiveTypes.FLOAT)
                .addReference("siblings", sensorMetaClass,null);

        DynamicMetaClass homeMetaClass = dynamicMetaModel.createMetaClass("Home");
        homeMetaClass
                .addAttribute("name", PrimitiveTypes.STRING)
                .addReference("sensors", sensorMetaClass,null);

        final KModel universe = dynamicMetaModel.model();
        universe.connect(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                KObject home = universe.universe(0).time(0).create(universe.metaModel().metaClassByName("Home"));
                home.set(home.metaClass().attribute("name"), "MainHome");

                KObject sensor = universe.universe(0).time(0).create(sensorMetaClass);
                sensor.set(sensor.metaClass().attribute("name"), "Sensor#1");

                home.mutate(KActionType.ADD, (MetaReference) home.metaClass().metaByName("sensors"), sensor);

                universe.universe(0).time(0).json().save(home,new Callback<String>() {
                    @Override
                    public void on(String s) {

                    }
                });

            }
        });


    }

}

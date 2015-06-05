package org.kevoree.modeling.memory.struct.segment;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.KActionType;
import org.kevoree.modeling.KCallback;
import org.kevoree.modeling.KModel;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation;
import org.kevoree.modeling.memory.struct.segment.KMemorySegment;
import org.kevoree.modeling.meta.KMetaClass;
import org.kevoree.modeling.meta.KMetaModel;
import org.kevoree.modeling.meta.KMetaReference;
import org.kevoree.modeling.meta.KPrimitiveTypes;
import org.kevoree.modeling.meta.impl.MetaModel;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;


public abstract class BaseMemorySegmentTest {

    public abstract KMemorySegment createMemorySegment();

    @Test
    public void attributeTest() {
        final KMetaModel dynamicMetaModel = new MetaModel("MyMetaModel");
        final KMetaClass sensorMetaClass = dynamicMetaModel.addMetaClass("Sensor");

        sensorMetaClass.addAttribute("name", KPrimitiveTypes.STRING, null, DiscreteExtrapolation.instance());
        sensorMetaClass.addAttribute("value", KPrimitiveTypes.FLOAT, null, DiscreteExtrapolation.instance());
        sensorMetaClass.addReference("siblings", sensorMetaClass, null, true);

        KMetaClass homeMetaClass = dynamicMetaModel.addMetaClass("Home");
        homeMetaClass.addAttribute("attr_long", KPrimitiveTypes.LONG, null, DiscreteExtrapolation.instance());
        homeMetaClass.addAttribute("name", KPrimitiveTypes.STRING, null, DiscreteExtrapolation.instance());
        homeMetaClass.addReference("sensors", sensorMetaClass, null, true);

        final KModel model = dynamicMetaModel.model();

        model.connect(new KCallback<Throwable>() {
            @Override
            public void on(Throwable throwable) {

                // set and read attributes
                KObject home = model.universe(0).time(0).create(model.metaModel().metaClassByName("Home"));
                home.set(home.metaClass().attribute("name"), "MainHome");

                KObject sensor = model.universe(0).time(0).create(sensorMetaClass);
                sensor.set(sensor.metaClass().attribute("name"), "Sensor#1");

                KObject sensor2 = model.universe(0).time(0).create(sensorMetaClass);
                sensor2.set(sensor.metaClass().attribute("name"), "Sensor#2");

                home.mutate(KActionType.ADD, (KMetaReference) home.metaClass().metaByName("sensors"), sensor);

                KMemorySegment cacheEntry = createMemorySegment();
                cacheEntry.init(homeMetaClass);

                cacheEntry.set(homeMetaClass.attribute("attr_long").index(), 10l, homeMetaClass);
                long attr = (long) cacheEntry.get(homeMetaClass.attribute("attr_long").index(), homeMetaClass);
                Assert.assertEquals(10l, attr);

                cacheEntry.set(homeMetaClass.attribute("name").index(), "test", homeMetaClass);
                String name = (String) cacheEntry.get(homeMetaClass.attribute("name").index(), homeMetaClass);
                Assert.assertEquals("test", name);

                // add and remove attributes
                cacheEntry.addRef(homeMetaClass.reference("sensors").index(), sensor.uuid(), homeMetaClass);
                cacheEntry.addRef(homeMetaClass.reference("sensors").index(), sensor2.uuid(), homeMetaClass);
                long[] ref = cacheEntry.getRef(homeMetaClass.reference("sensors").index(), homeMetaClass);
                Assert.assertArrayEquals(ref, new long[]{sensor.uuid(), sensor2.uuid()});

                cacheEntry.removeRef(homeMetaClass.reference("sensors").index(), sensor.uuid(), homeMetaClass);
                long[] ref2 = cacheEntry.getRef(homeMetaClass.reference("sensors").index(), homeMetaClass);
                Assert.assertArrayEquals(ref2, new long[]{sensor2.uuid()});

                cacheEntry.removeRef(homeMetaClass.reference("sensors").index(), sensor2.uuid(), homeMetaClass);
                long[] ref3 = cacheEntry.getRef(homeMetaClass.reference("sensors").index(), homeMetaClass);
                Assert.assertArrayEquals(ref3, null);

                // free cache entry
                cacheEntry.free(dynamicMetaModel);

            }
        });
    }

    @Test
    public void referenceTest() {
        final KMetaModel dynamicMetaModel = new MetaModel("MyMetaModel");
        final KMetaClass sensorMetaClass = dynamicMetaModel.addMetaClass("Sensor");

        sensorMetaClass.addAttribute("name", KPrimitiveTypes.STRING, null, DiscreteExtrapolation.instance());
        sensorMetaClass.addAttribute("value", KPrimitiveTypes.FLOAT, null, DiscreteExtrapolation.instance());
        sensorMetaClass.addReference("siblings", sensorMetaClass, null, true);

        KMetaClass homeMetaClass = dynamicMetaModel.addMetaClass("Home");
        homeMetaClass.addAttribute("attr_long", KPrimitiveTypes.LONG, null, DiscreteExtrapolation.instance());
        homeMetaClass.addAttribute("name", KPrimitiveTypes.STRING, null, DiscreteExtrapolation.instance());
        homeMetaClass.addReference("sensors", sensorMetaClass, null, true);

        final KModel model = dynamicMetaModel.model();

        model.connect(new KCallback<Throwable>() {
            @Override
            public void on(Throwable throwable) {

                // set and read attributes
                KObject home = model.universe(0).time(0).create(model.metaModel().metaClassByName("Home"));
                home.set(home.metaClass().attribute("name"), "MainHome");

                KObject sensor = model.universe(0).time(0).create(sensorMetaClass);
                sensor.set(sensor.metaClass().attribute("name"), "Sensor#1");
                //System.out.println("Sensor#1: " + sensor.uuid());

                KObject sensor2 = model.universe(0).time(0).create(sensorMetaClass);
                sensor2.set(sensor.metaClass().attribute("name"), "Sensor#2");
                //System.out.println("Sensor#2: " + sensor2.uuid());

                home.mutate(KActionType.ADD, (KMetaReference) home.metaClass().metaByName("sensors"), sensor);

                KMemorySegment cacheEntry = createMemorySegment();
                cacheEntry.init(homeMetaClass);

                cacheEntry.set(homeMetaClass.attribute("attr_long").index(), 10l, homeMetaClass);
                cacheEntry.set(homeMetaClass.attribute("name").index(), "test", homeMetaClass);

                // add and remove attributes
                cacheEntry.addRef(homeMetaClass.reference("sensors").index(), sensor.uuid(), homeMetaClass);
                cacheEntry.addRef(homeMetaClass.reference("sensors").index(), sensor2.uuid(), homeMetaClass);
                long[] ref = cacheEntry.getRef(homeMetaClass.reference("sensors").index(), homeMetaClass);
                Assert.assertArrayEquals(ref, new long[]{sensor.uuid(), sensor2.uuid()});

                cacheEntry.removeRef(homeMetaClass.reference("sensors").index(), sensor.uuid(), homeMetaClass);
                long[] ref2 = cacheEntry.getRef(homeMetaClass.reference("sensors").index(), homeMetaClass);
                Assert.assertArrayEquals(ref2, new long[]{sensor2.uuid()});

                cacheEntry.removeRef(homeMetaClass.reference("sensors").index(), sensor2.uuid(), homeMetaClass);
                long[] ref3 = cacheEntry.getRef(homeMetaClass.reference("sensors").index(), homeMetaClass);
                Assert.assertArrayEquals(ref3, null);

                // free cache entry
                cacheEntry.free(dynamicMetaModel);
            }
        });
    }


    @Test
    public void cloneTest() {
        final KMetaModel dynamicMetaModel = new MetaModel("MyMetaModel");
        final KMetaClass sensorMetaClass = dynamicMetaModel.addMetaClass("Sensor");

        sensorMetaClass.addAttribute("name", KPrimitiveTypes.STRING, null, DiscreteExtrapolation.instance());
        sensorMetaClass.addAttribute("value", KPrimitiveTypes.FLOAT, null, DiscreteExtrapolation.instance());
        sensorMetaClass.addReference("siblings", sensorMetaClass, null, true);

        KMetaClass homeMetaClass = dynamicMetaModel.addMetaClass("Home");
        homeMetaClass.addAttribute("attr_long", KPrimitiveTypes.LONG, null, DiscreteExtrapolation.instance());
        homeMetaClass.addAttribute("name", KPrimitiveTypes.STRING, null, DiscreteExtrapolation.instance());
        homeMetaClass.addReference("sensors", sensorMetaClass, null, true);

        final KModel model = dynamicMetaModel.model();

        model.connect(new KCallback<Throwable>() {
            @Override
            public void on(Throwable throwable) {

                // model
                KObject home = model.universe(0).time(0).create(model.metaModel().metaClassByName("Home"));
                home.set(home.metaClass().attribute("name"), "MainHome");

                KObject sensor = model.universe(0).time(0).create(sensorMetaClass);
                sensor.set(sensor.metaClass().attribute("name"), "Sensor#1");

                KObject sensor2 = model.universe(0).time(0).create(sensorMetaClass);
                sensor2.set(sensor.metaClass().attribute("name"), "Sensor#2");

                home.mutate(KActionType.ADD, (KMetaReference) home.metaClass().metaByName("sensors"), sensor);

                // cache entry
                KMemorySegment cacheEntry = createMemorySegment();
                cacheEntry.init(homeMetaClass);

                cacheEntry.set(homeMetaClass.attribute("attr_long").index(), 10l, homeMetaClass);
                cacheEntry.set(homeMetaClass.attribute("name").index(), "test", homeMetaClass);

                cacheEntry.addRef(homeMetaClass.reference("sensors").index(), sensor.uuid(), homeMetaClass);
                cacheEntry.addRef(homeMetaClass.reference("sensors").index(), sensor2.uuid(), homeMetaClass);

                // clone
                KMemorySegment clonedEntry = cacheEntry.clone(1, homeMetaClass);

                Assert.assertEquals(cacheEntry.get(homeMetaClass.attribute("attr_long").index(), homeMetaClass),
                        clonedEntry.get(homeMetaClass.attribute("attr_long").index(), homeMetaClass));
                Assert.assertEquals(cacheEntry.get(homeMetaClass.attribute("name").index(), homeMetaClass),
                        clonedEntry.get(homeMetaClass.attribute("name").index(), homeMetaClass));
                Assert.assertEquals(Arrays.toString(cacheEntry.getRef(homeMetaClass.reference("sensors").index(), homeMetaClass)),
                        Arrays.toString(clonedEntry.getRef(homeMetaClass.reference("sensors").index(), homeMetaClass)));

                Assert.assertTrue(clonedEntry.isDirty());

                // free cache entry
                //cacheEntry.free(dynamicMetaModel);
                clonedEntry.free(dynamicMetaModel);

            }
        });
    }


    @Test
    public void freeMemoryTest() {
        final KMetaModel dynamicMetaModel = new MetaModel("MyMetaModel");
        final KMetaClass sensorMetaClass = dynamicMetaModel.addMetaClass("Sensor");

        sensorMetaClass.addAttribute("name", KPrimitiveTypes.STRING, null, DiscreteExtrapolation.instance());
        sensorMetaClass.addAttribute("value", KPrimitiveTypes.FLOAT, null, DiscreteExtrapolation.instance());
        sensorMetaClass.addReference("siblings", sensorMetaClass, null, true);

        KMetaClass homeMetaClass = dynamicMetaModel.addMetaClass("Home");
        homeMetaClass.addAttribute("attr_long", KPrimitiveTypes.LONG, null, DiscreteExtrapolation.instance());
        homeMetaClass.addAttribute("name", KPrimitiveTypes.STRING, null, DiscreteExtrapolation.instance());
        homeMetaClass.addReference("sensors", sensorMetaClass, null, true);

        final KModel model = dynamicMetaModel.model();

        model.connect(new KCallback<Throwable>() {
            @Override
            public void on(Throwable throwable) {

                // model
                KObject home = model.universe(0).time(0).create(model.metaModel().metaClassByName("Home"));
                home.set(home.metaClass().attribute("name"), "MainHome");

                KObject sensor = model.universe(0).time(0).create(sensorMetaClass);
                sensor.set(sensor.metaClass().attribute("name"), "Sensor#1");

                KObject sensor2 = model.universe(0).time(0).create(sensorMetaClass);
                sensor2.set(sensor.metaClass().attribute("name"), "Sensor#2");

                home.mutate(KActionType.ADD, (KMetaReference) home.metaClass().metaByName("sensors"), sensor);

                KMemorySegment cacheEntry = createMemorySegment();
                cacheEntry.init(homeMetaClass);

                cacheEntry.set(homeMetaClass.attribute("attr_long").index(), 10l, homeMetaClass);
                cacheEntry.set(homeMetaClass.attribute("name").index(), "test", homeMetaClass);

                cacheEntry.addRef(homeMetaClass.reference("sensors").index(), sensor.uuid(), homeMetaClass);
                cacheEntry.addRef(homeMetaClass.reference("sensors").index(), sensor2.uuid(), homeMetaClass);

                Set<KMemorySegment> segments = new HashSet<>();
                for (int i = 0; i < 50; i++) {
                    segments.add(cacheEntry.clone(i, homeMetaClass));
                }

                // free everything
                for (KMemorySegment segment : segments) {
                    segment.free(dynamicMetaModel);
                }

                // free cache entry
                cacheEntry.free(dynamicMetaModel);
            }
        });
    }

    @Test
    public void modifiedIndexesTest() {
        final KMetaModel dynamicMetaModel = new MetaModel("MyMetaModel");
        final KMetaClass sensorMetaClass = dynamicMetaModel.addMetaClass("Sensor");

        sensorMetaClass.addAttribute("name", KPrimitiveTypes.STRING, null, DiscreteExtrapolation.instance());
        sensorMetaClass.addAttribute("value", KPrimitiveTypes.FLOAT, null, DiscreteExtrapolation.instance());
        sensorMetaClass.addReference("siblings", sensorMetaClass, null, true);

        KMetaClass homeMetaClass = dynamicMetaModel.addMetaClass("Home");
        homeMetaClass.addAttribute("attr_long", KPrimitiveTypes.LONG, null, DiscreteExtrapolation.instance());
        homeMetaClass.addAttribute("name", KPrimitiveTypes.STRING, null, DiscreteExtrapolation.instance());
        homeMetaClass.addReference("sensors", sensorMetaClass, null, true);

        final KModel model = dynamicMetaModel.model();

        model.connect(new KCallback<Throwable>() {
            @Override
            public void on(Throwable throwable) {

                // set and read attributes
                KObject home = model.universe(0).time(0).create(model.metaModel().metaClassByName("Home"));
                home.set(home.metaClass().attribute("name"), "MainHome");

                KObject sensor = model.universe(0).time(0).create(sensorMetaClass);
                sensor.set(sensor.metaClass().attribute("name"), "Sensor#1");

                KObject sensor2 = model.universe(0).time(0).create(sensorMetaClass);
                sensor2.set(sensor.metaClass().attribute("name"), "Sensor#2");

                home.mutate(KActionType.ADD, (KMetaReference) home.metaClass().metaByName("sensors"), sensor);

                KMemorySegment cacheEntry = createMemorySegment();
                cacheEntry.init(homeMetaClass);

                Assert.assertFalse(cacheEntry.isDirty());

                cacheEntry.set(homeMetaClass.attribute("attr_long").index(), 10l, homeMetaClass);
                long attr = (long) cacheEntry.get(homeMetaClass.attribute("attr_long").index(), homeMetaClass);
                Assert.assertEquals(10l, attr);

                Assert.assertTrue(cacheEntry.isDirty());

                cacheEntry.set(homeMetaClass.attribute("name").index(), "test", homeMetaClass);
                String name = (String) cacheEntry.get(homeMetaClass.attribute("name").index(), homeMetaClass);
                Assert.assertEquals("test", name);

                // free cache entry
                cacheEntry.free(dynamicMetaModel);

            }
        });
    }
}

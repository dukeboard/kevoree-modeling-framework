package org.kevoree.modeling.microframework.test.util;

//import net.openhft.chronicle.map.ChronicleMapBuilder;
import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KActionType;
import org.kevoree.modeling.KModel;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.abs.AbstractMetaAttribute;
import org.kevoree.modeling.meta.MetaAttribute;
import org.kevoree.modeling.meta.MetaReference;
import org.kevoree.modeling.meta.PrimitiveTypes;
import org.kevoree.modeling.reflexive.DynamicMetaClass;
import org.kevoree.modeling.reflexive.DynamicMetaModel;

/**
 * Created by duke on 29/04/15.
 */
public class SpeedTest {

    /**
     * @native ts
     */
   // @Test
    /*
    public void test2() {
        try {
            long before = System.currentTimeMillis();
            Object[] hello = new Object[10];
            //for (int j = 0; j < 5; j++) {
            OOKLongTree tree = new OOKLongTree();
            //LongHashMap helloMap = new LongHashMap(16, KConfig.CACHE_LOAD_FACTOR);

            HashMap helloMap = new HashMap();

           // String tmp = System.getProperty("java.io.tmpdir");
           // String pathname = tmp + "/shm-test/myfile.dat";

            File file = File.createTempFile("chronicle","dat");

            ChronicleMapBuilder<Integer, CharSequence> builder =
                    ChronicleMapBuilder.of(Integer.class, CharSequence.class).entries(5000000);
            ConcurrentMap<Integer, CharSequence> map = builder.createPersistedTo(file);


            for (int i = 0; i < 5000000; i++) {
                Object[] hello2 = new Object[10];

                //boolean[] indexes = new boolean[10];
                String indexes = new String("test");

                hello2[0] = 3;

                tree.insert(i);
                tree.previousOrEqual(i + 1);
                //KObject hello = new DynamicKObject(0,i,3,null,null);
                //helloMap.put(i, indexes);

               map.put(i, indexes);


           // if (i % 10000 == 0) {
           //     helloMap.clear();
           // }

            }
            // }
            long after = System.currentTimeMillis();
            System.out.println(after - before);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }*/


    /**
     * @native ts
     */
   // @Test
    public void test() {
        DynamicMetaModel dynamicMetaModel = new DynamicMetaModel("MyMetaModel");
        final DynamicMetaClass sensorMetaClass = dynamicMetaModel.createMetaClass("Sensor");
        sensorMetaClass
                .addAttribute("name", PrimitiveTypes.STRING)
                .addAttribute("value", PrimitiveTypes.DOUBLE)
                .addReference("siblings", sensorMetaClass,null);
        DynamicMetaClass homeMetaClass = dynamicMetaModel.createMetaClass("Home");
        homeMetaClass
                .addAttribute("name", PrimitiveTypes.STRING)
                .addReference("sensors", sensorMetaClass,null);
        final KModel universe = dynamicMetaModel.model();

        universe.connect(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {

                //  universe.manager().setScheduler(new ExecutorServiceScheduler());

                KObject home = universe.universe(0).time(0).create(universe.metaModel().metaClass("Home"));
                home.set(home.metaClass().attribute("name"), "MainHome");

                KObject sensor = universe.universe(0).time(0).create(sensorMetaClass);
                sensor.set(sensor.metaClass().attribute("name"), "Sensor#1");

                home.mutate(KActionType.ADD, (MetaReference) home.metaClass().metaByName("sensors"), sensor);

                long before = System.currentTimeMillis();
                MetaAttribute att = sensor.metaClass().attribute("value");
                //   att.setExtrapolation(new PolynomialExtrapolation());
                ((AbstractMetaAttribute) att)._precision = 0.1;

                for (int i = 0; i < 5000000; i++) {
                    sensor.jump(i, new Callback<KObject>() {
                        @Override
                        public void on(KObject timedObject) {
                            timedObject.set(att, 3d);
                        }
                    });
                }
                long middle = System.currentTimeMillis();
                /*
                for(int i=0;i<5000000;i++){
                    sensor.jump2(i, new Callback<KObject>() {
                        @Override
                        public void on(KObject kObject) {
                            kObject.get(att);
                        }
                    });
                }
                */
                long after = System.currentTimeMillis();
                System.out.println(middle - before);
                System.out.println(after - middle);

            }
        });

    }

}

package org.smartgrid.test;


import org.evaluation.SmartGrid;
import org.evaluation.SmartMeter;
import org.evaluation.impl.DefaultEvaluationFactory;
import org.evaluation.loader.JSONModelLoader;
import org.evaluation.serializer.JSONModelSerializer;
import org.kevoree.modeling.api.persistence.DataStore;
import org.kevoree.modeling.api.time.TimePoint;
import org.kevoree.modeling.datastores.leveldb.LevelDbDataStore;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 14/11/2013
 * Time: 20:31
 */
public class SimpleFullSamplingTest {
    private static SmartGrid smartgrid = null;
    private static String SEGMENT = "default_segment";

    private static final int NODES_PER_GRID = 100;
    private static final int SAMPLES = 10000;

    private static JSONModelLoader loader = new JSONModelLoader();
   private static DataStore datastore = new LevelDbDataStore("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/smartgrid/smartgrid.tests/tempFullSampling");


    private static Map<SmartMeter, List<SmartMeter>> neighbors = new HashMap<SmartMeter, List<SmartMeter>>();

    private static void addNeighbor(SmartMeter sm, SmartMeter neighbor) {
        if (neighbors.get(sm) != null) {
            neighbors.get(sm).add(neighbor);
        } else {
            List<SmartMeter> n = new ArrayList<SmartMeter>();
            n.add(neighbor);
            neighbors.put(sm, n);
        }
    }
    private static List<SmartMeter> getNeighbor(SmartMeter sm) {
        List<SmartMeter> meters = new ArrayList<SmartMeter>();
        for(SmartMeter s : neighbors.keySet()) {
            if(s.getName().equals(sm.getName())) {
              meters.addAll(neighbors.get(s));
            }
        }

        return meters;
    }

    private static void populate(DefaultEvaluationFactory factory) {
        smartgrid = factory.createSmartGrid();

        SmartMeter root = null;
        for (int i = 0; i < NODES_PER_GRID; i++) {
            SmartMeter node = factory.createSmartMeter();
            node.setName("meter_" + i);
            smartgrid.addSmartmeters(node);
            node.setElectricLoad(new Long(200000));

            if (i % 3 == 0) {
                if (root != null) {
                    node.addNeighbors(root);
                    addNeighbor(node, root);
                }
                root = node;
            } else {
                root.addNeighbors(node);
                addNeighbor(root, node);
            }
        }

        //for (SmartMeter sm : neighbors.keySet()) {
          //  System.out.println("SM " + sm.getName() + " > " + neighbors.get(sm));
        //}

    }

    public static void main(String[] args) {
        DefaultEvaluationFactory factory = new DefaultEvaluationFactory();
        factory.setDatastore(datastore);

        populate(factory);

        long before = System.currentTimeMillis();

        // full sample of the context model
        long time = 0;
        for (int i = 0; i < SAMPLES; i++) {
            TimePoint tp = new TimePoint(time, 0);
            JSONModelSerializer saver = new JSONModelSerializer();
            String savedModel = saver.serialize(smartgrid);
            datastore.put(SEGMENT, tp.toString(), savedModel);

            time++;

            System.out.println(time);

            factory.clearCache();
            datastore.sync();

        }
        factory.clearCache();
        System.out.println("finishing sampling..."+(System.currentTimeMillis()-before));

        long start = System.currentTimeMillis();

        // average load of a smartmeter and its neighbors and specific snapshots
        long avg1 = computeElectricLoadAvg(70, 80, "meter_6");
        System.out.println(">>> " + avg1);

        factory.clearCache();


        // average load of a smartmeter and its neighbors and specific snapshots
        long avg2 = computeElectricLoadAvg(20, 30, "meter_6");
        System.out.println(">>> " + avg2);

        long end = System.currentTimeMillis();
        System.out.println(">>>>>>> Performance in ms: " + (end - start));

        // datastore.dump();

    }

    private static long computeElectricLoadAvg(int sampleFrom, int sampleTo, String smartmeterRoot) {
        int avg = 0;
        for (int i = sampleFrom; i < sampleTo; i++) {
            String sample = datastore.get(SEGMENT, new TimePoint(Long.valueOf(i), 0).toString());
            SmartGrid model = (SmartGrid) loader.loadModelFromString(sample).get(0);

            long localAvg = 0;
            SmartMeter sm = model.findSmartmetersByID(smartmeterRoot);
            localAvg += sm.getElectricLoad().longValue();

            for (SmartMeter neighbor : getNeighbor(sm)) {
                localAvg += neighbor.getElectricLoad().longValue();
            }
            if (getNeighbor(sm) != null) {
                localAvg = localAvg / (getNeighbor(sm).size() + 1);
            }
            avg += localAvg;
        }
        return avg / (sampleTo - sampleFrom);

    }

}

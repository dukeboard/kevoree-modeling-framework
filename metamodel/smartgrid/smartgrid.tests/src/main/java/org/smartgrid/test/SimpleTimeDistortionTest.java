package org.smartgrid.test;


import org.evaluation.SmartGrid;
import org.evaluation.SmartMeter;
import org.evaluation.impl.DefaultEvaluationFactory;
import org.kevoree.modeling.api.persistence.MemoryDataStore;
import org.kevoree.modeling.api.time.TimeAwareKMFContainer;

import java.util.HashMap;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 14/11/2013
 * Time: 20:31
 */
public class SimpleTimeDistortionTest {

    public static final int NODES_PER_GRID = 10;

    private static void populate(DefaultEvaluationFactory factory) {
        SmartGrid smartgrid = factory.createSmartGrid();
        for (int i = 0; i < NODES_PER_GRID; i++) {
            SmartMeter node = factory.createSmartMeter();
            node.setName("meter_" + i);
            smartgrid.addSmartmeters(node);
            node.setElectricLoad(new Long(100000));
        }
        System.out.println("Persist everything...");
        long startPersist = System.currentTimeMillis();
        factory.persistBatch(factory.createBatch().addElementAndReachable(smartgrid));
        long endPersist = System.currentTimeMillis();
        System.out.println("Persisted in " + (endPersist - startPersist) + " ms");
    }

    public static void main(String[] args) {
        DefaultEvaluationFactory factory = new DefaultEvaluationFactory();
        MemoryDataStore datastore = new MemoryDataStore();
        factory.setDatastore(datastore);
        populate(factory);
        factory.commit();
        factory.clearCache();
        SmartGrid grid = (SmartGrid) factory.lookup("/");
        for (SmartMeter meter : grid.getSmartmeters()) {
            TimeAwareKMFContainer tmeter = (TimeAwareKMFContainer) meter;
            tmeter.shift(tmeter.getNow().shift(1));
            meter.setElectricLoad(new Long(200000));
            factory.persist(meter);
        }
        factory.commit();

        datastore.dump();

    }

}

package org.smartgrid.test;


import org.evaluation.SmartGrid;
import org.evaluation.SmartMeter;
import org.evaluation.impl.DefaultEvaluationFactory;
import org.kevoree.modeling.api.persistence.MemoryDataStore;
import org.kevoree.modeling.api.time.TimeAwareKMFContainer;
import org.kevoree.modeling.api.time.TimePoint;

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
            if (i >= 2) {
                node.addNeighbors(smartgrid.getSmartmeters().get(i - 2));
                node.addNeighbors(smartgrid.getSmartmeters().get(i - 1));
            }
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


        //   SmartMeter meter5 = (SmartMeter) factory.lookup("smartmeters[meter_5]");
        //   System.out.println(meter5.getNeighbors().size());

        SmartGrid grid = (SmartGrid) factory.lookup("/");

        System.out.println(grid.getSmartmeters().size());

        for (SmartMeter meter : grid.getSmartmeters()) {
            TimeAwareKMFContainer tmeter = (TimeAwareKMFContainer) meter;
            for (int i = 0; i < 100; i++) {
                tmeter.shift(tmeter.getNow().shift(1));
                meter.setElectricLoad(new Long(200000));
                factory.persist(meter);
            }
        }
        factory.commit();
        //datastore.dump();
        computeLast(factory);


    }


    public static Long computeLast(DefaultEvaluationFactory factory) {
        factory.clearCache();
        SmartMeter meter5 = (SmartMeter) factory.lookup("smartmeters[meter_5]");
        System.out.println(meter5.getNeighbors().size());
        //factory.setRelativityStrategy(RelativeTimeStrategy.RELATIVE_FIRST);
        for (int i = 100; i > 90; i--) {
            factory.setRelativeTime(new TimePoint(i, 0));
            //System.out.println(factory.getRelativeTime());
            //SmartGrid grid = (SmartGrid) factory.lookup("/");
            //System.out.println(((TimeAwareKMFContainer) grid.getSmartmeters().get(0)).getNow());
            SmartMeter meter = (SmartMeter) factory.lookup("smartmeters[meter_5]");
            System.out.println(meter.getNeighbors().size());
        }
        return Long.valueOf(0);
    }


}

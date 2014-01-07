package org.smartgrid.test;

import org.evaluation.SmartGrid;
import org.evaluation.SmartMeter;
import org.evaluation.impl.DefaultEvaluationFactory;
import org.kevoree.modeling.api.persistence.DataStore;
import org.kevoree.modeling.datastores.leveldb.LevelDbDataStore;

/**
 * Created by duke on 07/01/2014.
 */
public class StorageTest {

    public static void main(String[] args) {

        String dir = "/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/smartgrid/smartgrid.tests/tempStorage";

        DataStore datastore = new LevelDbDataStore("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/smartgrid/smartgrid.tests/tempStorage");
        DefaultEvaluationFactory factory = new DefaultEvaluationFactory();
        factory.setDatastore(datastore);

        SmartGrid grid = factory.createSmartGrid();
        SmartMeter meter = factory.createSmartMeter();
        meter.setName("base");
        grid.addSmartmeters(meter);

        meter.setElectricLoad(0l);
        factory.persist(meter);
        factory.persist(grid);
        factory.commit();


        SmartMeter meter2 = (SmartMeter) factory.lookup("smartmeters[base]");
        meter2.shift(meter.getNow().shift(1));
        meter2.setElectricLoad(1l);
        factory.persist(meter2);
        factory.commit();

        System.out.println("Dump");
        for (String segment : datastore.getSegments()) {
            System.out.println("Segment=" + segment);
            for (String key : datastore.getSegmentKeys(segment)) {
                System.out.println(key + "->" + datastore.get(segment, key));
            }
        }




    }

}

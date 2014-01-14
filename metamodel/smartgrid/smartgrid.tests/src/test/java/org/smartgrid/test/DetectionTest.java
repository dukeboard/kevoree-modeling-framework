package org.smartgrid.test;

import org.evaluation.Customer;
import org.evaluation.SmartGrid;
import org.evaluation.SmartMeter;
import org.evaluation.impl.DefaultEvaluationFactory;
import org.evaluation.serializer.JSONModelSerializer;
import org.junit.Test;
import org.kevoree.modeling.api.persistence.DataStore;
import org.kevoree.modeling.api.time.RelativeTimeStrategy;
import org.kevoree.modeling.api.time.TimePoint;
import org.kevoree.modeling.datastores.leveldb.LevelDbDataStore;

import java.io.File;
import java.io.IOException;

/**
 * Created by duke on 10/01/2014.
 */
public class DetectionTest {

    private int numberOfCustomer = 100;
    private int numberOfSteps = 100;

    @Test
    public void test() throws IOException {
        String dir = "tempStorage" + this.getClass().getSimpleName();
        File baseDir = new File(dir);
        Helper.delete(baseDir);

        DataStore datastore = new LevelDbDataStore(dir);
        DefaultEvaluationFactory factory = new DefaultEvaluationFactory();
        factory.setDatastore(datastore);
        factory.setRelativeTime(new TimePoint(0, 0));

        SmartGrid grid = factory.createSmartGrid();

        Customer previous = null;
        for (int i = 0; i < numberOfCustomer; i++) {
            Customer customer = factory.createCustomer();
            customer.setName("customer_" + i);
            grid.addCustomers(customer);
            if (previous != null) {
                customer.addNeighbors(previous);
            }
            previous = customer;

            SmartMeter meter = factory.createSmartMeter();
            meter.setName("meter_" + i);
            customer.addMeters(meter);

            factory.persist(customer);
            factory.persist(meter);
        }

        factory.persist(grid);
        factory.commit();
        factory.clearCache();

        //Fill dummy value
        for (int i = 1; i < numberOfSteps; i++) {
            System.out.println("Step " + i);
            for (Customer customer : grid.getCustomers()) {
                for (SmartMeter meter : customer.getMeters()) {
                    meter.setElectricLoad(new Long(i));
                    //meter.setNow(TimePoint.object$.create(String.valueOf(i)));
                    meter = (SmartMeter) meter.shiftOffset(1l);
                    factory.persist(meter);
                    //factory.clearCache();
                }
            }
        }

        factory.commit();
        factory.clearCache();

        factory.setRelativityStrategy(RelativeTimeStrategy.LATEST);
        SmartGrid lookupGrid = (SmartGrid) factory.lookup("/");
        JSONModelSerializer saver = new JSONModelSerializer();
        saver.serializeToStream(lookupGrid, System.err);


        // Helper.delete(baseDir);
        System.out.println(baseDir.getAbsolutePath());
    }


}

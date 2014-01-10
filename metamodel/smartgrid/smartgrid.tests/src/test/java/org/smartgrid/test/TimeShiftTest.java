package org.smartgrid.test;

import static org.junit.Assert.*;

import org.evaluation.SmartGrid;
import org.evaluation.SmartMeter;
import org.evaluation.impl.DefaultEvaluationFactory;
import org.junit.Test;
import org.kevoree.modeling.api.persistence.DataStore;
import org.kevoree.modeling.api.time.TimePoint;
import org.kevoree.modeling.datastores.leveldb.LevelDbDataStore;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;

import static java.nio.file.FileVisitResult.CONTINUE;

/**
 * Created by duke on 09/01/2014.
 */
public class TimeShiftTest {

    @Test
    public void test() throws IOException {
        String dir = "tempStorage"+this.getClass().getSimpleName();
        File baseDir = new File(dir);
        Helper.delete(baseDir);

        DataStore datastore = new LevelDbDataStore(dir);
        DefaultEvaluationFactory factory = new DefaultEvaluationFactory();
        factory.setDatastore(datastore);
        factory.setRelativeTime(new TimePoint(0, 0));

        SmartGrid grid = factory.createSmartGrid();
        SmartMeter meter = factory.createSmartMeter();
        meter.setName("base");
        grid.addSmartmeters(meter);

        meter.setElectricLoad(0l);
        factory.persist(meter);
        factory.persist(grid);
        factory.commit();

        SmartMeter meter2 = (SmartMeter) meter.shiftOffset(1);
        assertNotNull(meter2);
        assertEquals(meter.path(), meter2.path());
        assertNotEquals(meter.getNow(), meter2.getNow());

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
        SmartMeter meter2_l = (SmartMeter) factory.lookupFromTime(meter2.path(), meter2.getNow());
        assertNotNull(meter2_l);
        assertEquals(meter.path(), meter2_l.path());
        assertNotEquals(meter.getNow(), meter2_l.getNow());
        assertEquals(meter.getName(), meter2_l.getName());
        assertNotEquals(meter2, meter2_l);


        SmartMeter meterPrevious = (SmartMeter) meter2.previous();
        assertEquals(meterPrevious.getNow(), new TimePoint(0, 0));
        SmartMeter meterAfter = (SmartMeter) meterPrevious.next();
        assertEquals(meterAfter.getNow(), new TimePoint(1, 0));


        Helper.delete(baseDir);


    }

}

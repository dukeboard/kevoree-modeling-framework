package org.smartgrid.test;

import org.evaluation.SmartGrid;
import org.evaluation.SmartMeter;
import org.evaluation.impl.DefaultEvaluationFactory;
import org.junit.Test;
import org.kevoree.modeling.api.persistence.DataStore;
import org.kevoree.modeling.api.time.RelativeTimeStrategy;
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
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Created by duke on 10/01/2014.
 */
public class LatestTest {

    @Test
    public void test() throws IOException {
        String dir = "tempStorage";
        File baseDir = new File(dir);
        if (baseDir.exists()) {
            Files.walkFileTree(baseDir.toPath(), new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    Files.delete(file);
                    return CONTINUE;
                }

                @Override
                public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
                    if (exc == null) {
                        Files.delete(dir);
                        return CONTINUE;
                    } else {
                        throw exc;
                    }
                }
            });
        }

        Files.deleteIfExists(baseDir.toPath());

        DataStore datastore = new LevelDbDataStore(dir);
        DefaultEvaluationFactory factory = new DefaultEvaluationFactory();
        factory.setDatastore(datastore);
        factory.setRelativeTime(new TimePoint(3, 0));

        SmartGrid grid = factory.createSmartGrid();
        SmartMeter meter = factory.createSmartMeter();
        meter.setName("base");
        grid.addSmartmeters(meter);

        meter.setElectricLoad(0l);
        factory.persist(meter);
        factory.persist(grid);
        factory.commit();

        SmartMeter meter2 = (SmartMeter) meter.shiftOffset(-2);
        assertNotNull(meter2);
        assertEquals(meter.path(), meter2.path());
        assertNotEquals(meter.getNow(), meter2.getNow());

        meter2.setElectricLoad(1l);
        factory.persist(meter2);
        factory.commit();

        SmartMeter meter3 = (SmartMeter) meter.shiftOffset(-1);
        meter2.setElectricLoad(4l);
        factory.persist(meter3);
        factory.commit();

        SmartMeter meter2_l = (SmartMeter) factory.lookupFromTime(meter2.path(), meter2.getNow());
        assertNotNull(meter2_l);
        assertEquals(meter.path(), meter2_l.path());
        assertNotEquals(meter.getNow(), meter2_l.getNow());
        assertEquals(meter.getName(), meter2_l.getName());
        assertNotEquals(meter2, meter2_l);

        factory.clearCache();
        factory.setRelativityStrategy(RelativeTimeStrategy.LATEST);
        SmartMeter meterLatest = (SmartMeter) factory.lookup(meter2.path());
        assertEquals(meter.path(), meter2_l.path());
        assertEquals(meterLatest.getNow(), new TimePoint(3, 0));

        System.out.println("Dump");
        for (String segment : datastore.getSegments()) {
            System.out.println("Segment=" + segment);
            for (String key : datastore.getSegmentKeys(segment)) {
                System.out.println(key + "->" + datastore.get(segment, key));
            }
        }

        SmartMeter meterPrevious = (SmartMeter) meterLatest.previous();
        assertEquals(meterPrevious.getNow(), new TimePoint(2, 0));
        SmartMeter meterAfter = (SmartMeter) meterPrevious.next();
        assertEquals(meterAfter.getNow(), new TimePoint(3, 0));

    }


}

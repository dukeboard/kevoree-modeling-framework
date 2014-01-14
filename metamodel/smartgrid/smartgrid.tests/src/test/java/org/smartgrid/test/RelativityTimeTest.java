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
import static org.junit.Assert.*;
import static org.junit.Assert.assertEquals;

/**
 * Created by duke on 09/01/2014.
 */
public class RelativityTimeTest {

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

        SmartMeter meterSibling = factory.createSmartMeter();
        meterSibling.setName("sibling");
        meter.addNeighbors(meterSibling);
        grid.addSmartmeters(meterSibling);

        meter.setElectricLoad(0l);
        meterSibling.setElectricLoad(3l);
        factory.persist(meter);
        factory.persist(meterSibling);
        factory.persist(grid);
        factory.commit();

        SmartMeter meter2 = (SmartMeter) meter.shiftOffset(1);
        assertNotNull(meter2);
        assertEquals(meter.path(), meter2.path());
        assertNotEquals(meter.getNow(), meter2.getNow());

        meter2.setElectricLoad(1l);
        factory.persist(meter2);
        factory.commit();

        SmartMeter resolved ;

        factory.setRelativityStrategy(RelativeTimeStrategy.LATEST);
        factory.clearCache();
        resolved = (SmartMeter) factory.lookup(meter.path());
        assertEquals(resolved.getElectricLoad(),Long.valueOf(1));
        assertEquals(resolved.getNeighbors().size(), 1);
        assertNotNull(resolved.getNeighbors().get(0));

        factory.setRelativityStrategy(RelativeTimeStrategy.ABSOLUTE);
        factory.clearCache();
        factory.setRelativeTime(new TimePoint(0, 0));
        resolved = (SmartMeter) factory.lookup(meter.path());
        assertEquals(factory.getRelativeTime(),resolved.getNow());
        assertEquals(resolved.getElectricLoad(),Long.valueOf(0));
        assertEquals(resolved.getNeighbors().size(),1);
        assertNotNull(resolved.getNeighbors().get(0));

        factory.setRelativityStrategy(RelativeTimeStrategy.ABSOLUTE);
        factory.clearCache();
        factory.setRelativeTime(new TimePoint(1, 0));
        resolved = (SmartMeter) factory.lookup(meter.path());
        assertEquals(factory.getRelativeTime(),resolved.getNow());
        assertEquals(resolved.getElectricLoad(), Long.valueOf(1));
        assertEquals(resolved.getNeighbors().size(),1);
        assertEquals(resolved.getNeighbors().get(0).getNow(),factory.getRelativeTime());
        assertEquals(resolved.getNeighbors().get(0).getName(), "sibling");

        factory.setRelativityStrategy(RelativeTimeStrategy.ABSOLUTE);
        factory.clearCache();
        factory.setRelativeTime(new TimePoint(1, 0));
        factory.setPrevious(new TimePoint(0, 0));
        resolved = (SmartMeter) factory.lookup(meter.path());
        assertEquals(factory.getRelativeTime(),resolved.getNow());
        assertEquals(resolved.getElectricLoad(), Long.valueOf(1));
        assertEquals(resolved.getNeighbors().size(),1);
        assertEquals(resolved.getNeighbors().get(0).getNow(),factory.getRelativeTime());
        assertEquals(resolved.getNeighbors().get(0).getName(), "sibling");

        Helper.delete(baseDir);


    }

}

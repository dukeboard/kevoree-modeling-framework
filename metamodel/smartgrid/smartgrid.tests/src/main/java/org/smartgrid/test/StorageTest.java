package org.smartgrid.test;

import org.evaluation.SmartGrid;
import org.evaluation.SmartMeter;
import org.evaluation.impl.DefaultEvaluationFactory;
import org.kevoree.modeling.api.persistence.DataStore;
import org.kevoree.modeling.datastores.leveldb.LevelDbDataStore;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import static java.nio.file.FileVisitResult.*;
/**
 * Created by duke on 07/01/2014.
 */
public class StorageTest {

    public static void main(String[] args) throws IOException {

        String dir = "/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/smartgrid/smartgrid.tests/tempStorage";
        File baseDir = new File(dir);
        Files.walkFileTree(baseDir.toPath(), new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult visitFile(Path file,BasicFileAttributes attrs) throws IOException {
                Files.delete(file);
                return CONTINUE;
            }
            @Override
            public FileVisitResult postVisitDirectory(Path dir,IOException exc) throws IOException {
                if (exc == null) {
                    Files.delete(dir);
                    return CONTINUE;
                } else {
                    throw exc;
                }
            }
        });
        Files.deleteIfExists(baseDir.toPath());

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


        System.out.println(meter.path());

        SmartMeter meter2 = (SmartMeter) meter.shiftOffset(1);
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

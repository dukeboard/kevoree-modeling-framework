package org.smartgrid.test;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;

import static java.nio.file.FileVisitResult.CONTINUE;

/**
 * Created by duke on 10/01/2014.
 */
public class Helper {

    public static void delete(File baseDir){
        try {
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
        } catch (Exception e){
            e.printStackTrace();
        }
    }

}

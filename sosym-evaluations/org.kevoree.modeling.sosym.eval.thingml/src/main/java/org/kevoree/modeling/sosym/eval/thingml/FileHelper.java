package org.kevoree.modeling.sosym.eval.thingml;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.channels.ReadableByteChannel;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 09/06/13
 * Time: 18:30
 */
public class FileHelper {

    public static void copyFile(InputStream sourceFile, File destFile) throws IOException {
        if (!destFile.exists()) {
            destFile.createNewFile();
        }
        ReadableByteChannel source = null;
        FileChannel destination = null;
        try {
            source = Channels.newChannel(sourceFile);
            destination = new FileOutputStream(destFile).getChannel();
            destination.transferFrom(source, 0, sourceFile.available());
        } finally {
            if (source != null) {
                source.close();
            }
            if (destination != null) {
                destination.close();
            }
        }
    }

}

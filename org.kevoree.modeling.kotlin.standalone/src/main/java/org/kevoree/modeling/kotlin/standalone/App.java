package org.kevoree.modeling.kotlin.standalone;

import com.google.common.io.Files;
import com.google.common.io.InputSupplier;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.RootGenerator;

import java.io.*;
import java.util.Arrays;
import java.util.jar.Attributes;
import java.util.jar.JarEntry;
import java.util.jar.JarOutputStream;
import java.util.jar.Manifest;

/**
 * Created by duke on 7/16/14.
 */
public class App {

    private static boolean deleteDirectory(File path) {
        if (path.exists()) {
            File[] files = path.listFiles();
            for (int i = 0; i < files.length; i++) {
                if (files[i].isDirectory()) {
                    deleteDirectory(files[i]);
                } else {
                    files[i].delete();
                }
            }
        }
        return (path.delete());
    }

    public static void main(final String[] args) throws IOException, InterruptedException {

        ThreadGroup tg = new ThreadGroup("KMFCompiler");
        Thread t = new Thread(tg, new Runnable() {
            @Override
            public void run() {

                try {


                    if (args.length != 1 && args.length != 2) {
                        System.out.println("Bad arguments : <metaModelFile> [<js/jar>]");
                        return;
                    }

                    String ecore = args[0];
                    File ecoreFile = new File(ecore);
                    if (!ecoreFile.exists()) {
                        System.out.println("Bad arguments : <metaModelFile> [<js/jar>] : metaModelFile not exists");
                    }
                    if (!ecoreFile.getName().contains(".")) {
                        System.out.println("Bad input file " + ecoreFile.getName() + " , must be .mm, .ecore or .xsd");
                    }

                    Boolean js = false;
                    if (args.length > 1 && args[1].toLowerCase().equals("js")) {
                        js = true;
                    }


                    GenerationContext ctx = new GenerationContext();
                    File masterOut = Files.createTempDir();
                    File srcOut = new File(masterOut, "gen-src");
                    srcOut.mkdirs();

                    File outDir = new File(masterOut, "out");
                    outDir.mkdirs();

                    File srcIn = new File(masterOut, "src-in");
                    srcIn.mkdirs();

                    File libs = new File(masterOut, "libs");
                    libs.mkdirs();

                    String[] libFiles = {"kotlin-runtime.jar", "kotlin-stdlib.jar", "microframework.jar"};
                    if (js) {
                        String[] libFiles2 = {"kotlin-runtime.jar", "kotlin-stdlib.jar", "microframework.jar", "kotlin-js-library.jar"};
                        libFiles = libFiles2;
                    }

                    for (final String lib : libFiles) {
                        Files.copy(new InputSupplier<InputStream>() {
                            @Override
                            public InputStream getInput() throws IOException {
                                return App.class.getClassLoader().getResourceAsStream(lib);
                            }
                        }, new File(libs, lib));
                    }

                    ctx.rootSrcDirectory = srcIn;
                    ctx.persistence = true;
                    ctx.timeAware = true;
                    ctx.rootGenerationDirectory = srcOut;
                    ctx.rootCompilationDirectory = outDir;
                    ctx.rootUserDirectory = srcIn;

                    if (js) {
                        ctx.genSelector = false;
                        ctx.js = true;
                        ctx.ecma3compat = false;
                    } else {
                        ctx.genSelector = false;
                        ctx.js = false;
                        ctx.ecma3compat = false;
                    }

                    ctx.generateEvents = true;
                    ctx.flyweightFactory = false;
                    ctx.autoBasePackage = "kmf";

                    String targetName = ecoreFile.getName().substring(0, ecoreFile.getName().lastIndexOf("."));
                    try {
                        RootGenerator generator = new RootGenerator();
                        generator.execute(ctx, ecoreFile, "0.1", targetName, Arrays.asList(outDir.getAbsolutePath(), new File(libs, libFiles[0]).getAbsolutePath(), new File(libs, libFiles[1]).getAbsolutePath(), new File(libs, libFiles[2]).getAbsolutePath()));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    String newExtension = ".jar";
                    if (js) {
                        newExtension = ".js";
                    }
                    String cleanedPath = ecoreFile.getAbsolutePath();
                    if (cleanedPath.endsWith(".mm")) {
                        cleanedPath = cleanedPath.substring(0, cleanedPath.length() - 3);
                        cleanedPath = cleanedPath + newExtension;
                    }
                    if (cleanedPath.endsWith(".ecore")) {
                        cleanedPath = cleanedPath.substring(0, cleanedPath.length() - 6);
                        cleanedPath = cleanedPath + newExtension;
                    }
                    if (cleanedPath.endsWith(".xsd")) {
                        cleanedPath = cleanedPath.substring(0, cleanedPath.length() - 4);
                        cleanedPath = cleanedPath + newExtension;
                    }

                    //Copy JAR dependency to final JAR file
                    File outputJar = new File(cleanedPath);
                    if (!js) {
                        for (String lib : libFiles) {
                            extract(new File(libs, lib), outDir);
                        }
                        //Create the new JAR file
                        Manifest manifest = new Manifest();
                        manifest.getMainAttributes().put(Attributes.Name.MANIFEST_VERSION, "1.0");
                        JarOutputStream target = new JarOutputStream(new FileOutputStream(outputJar), manifest);
                        add(outDir, target, outDir);
                        target.close();
                        deleteDirectory(masterOut);
                    } else {
                        Files.copy(new File(outDir, targetName + ".min.js"), outputJar);
                        deleteDirectory(masterOut);
                    }
                    System.out.println("Output : " + outputJar.getAbsolutePath());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        t.start();
        t.join();


        Thread[] subT = new Thread[1000];
        tg.enumerate(subT,true);
        for (Thread sub : subT) {
            try {
                if(sub != null){
                    sub.interrupt();
                    sub.stop();
                }
            } catch (Exception e){
                e.printStackTrace();
            }

        }
        tg.interrupt();
        tg.stop();
    }

    private static void extract(File srcFile, File destDir) throws IOException {
        java.util.jar.JarFile jar = new java.util.jar.JarFile(srcFile);
        java.util.Enumeration enumEntries = jar.entries();
        while (enumEntries.hasMoreElements()) {
            java.util.jar.JarEntry file = (java.util.jar.JarEntry) enumEntries.nextElement();
            java.io.File f = new java.io.File(destDir + java.io.File.separator + file.getName().replace("/", File.separator));
            if (file.isDirectory()) { // if its a directory, create it
                f.mkdir();
                continue;
            } else {
                if (!f.getAbsolutePath().endsWith(".class")) {
                    continue;
                }
            }

            java.io.InputStream is = jar.getInputStream(file); // get the input stream
            java.io.FileOutputStream fos = new java.io.FileOutputStream(f);
            while (is.available() > 0) {  // write contents of 'is' to 'fos'
                fos.write(is.read());
            }
            fos.close();
            is.close();
        }
    }

    private static void add(File source, JarOutputStream target, File outDir) throws IOException {
        BufferedInputStream in = null;
        try {
            if (source.isDirectory()) {
                String name = source.getPath().replace(outDir.getPath(), "").replace("\\", "/");
                if (!name.isEmpty()) {
                    if (!name.endsWith("/"))
                        name += "/";
                    JarEntry entry = new JarEntry(name);
                    entry.setTime(source.lastModified());
                    target.putNextEntry(entry);
                    target.closeEntry();
                }
                for (File nestedFile : source.listFiles()) {
                    add(nestedFile, target, outDir);
                }
                return;
            }

            JarEntry entry = new JarEntry(source.getPath().replace(outDir.getPath(), "").replace("\\", "/"));
            entry.setTime(source.lastModified());
            target.putNextEntry(entry);
            in = new BufferedInputStream(new FileInputStream(source));

            byte[] buffer = new byte[1024];
            while (true) {
                int count = in.read(buffer);
                if (count == -1)
                    break;
                target.write(buffer, 0, count);
            }
            target.closeEntry();
        } finally {
            if (in != null)
                in.close();
        }
    }

}

package org.kevoree.modeling.generator.standalone;

import org.kevoree.modeling.action.VersionAnalyzer;
import org.kevoree.modeling.generator.GenerationContext;
import org.kevoree.modeling.generator.Generator;
import org.kevoree.modeling.generator.mavenplugin.GenModelPlugin;
import org.kevoree.modeling.generator.mavenplugin.HtmlTemplateGenerator;
import org.kevoree.modeling.generator.mavenplugin.TscRunner;
import org.kevoree.modeling.java2typescript.SourceTranslator;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.jar.JarEntry;
import java.util.jar.JarOutputStream;

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
                    File metaModelFile = new File(ecore);
                    if (!metaModelFile.exists()) {
                        System.out.println("Bad arguments : <metaModelFile> [<js/jar>] : metaModelFile not exists");
                    }
                    if (!metaModelFile.getName().contains(".")) {
                        System.out.println("Bad input file " + metaModelFile.getName() + " , must be .mm, .ecore or .xsd");
                    }
                    Boolean js = false;
                    if (args.length > 1 && args[1].toLowerCase().equals("js")) {
                        js = true;
                    }
                    GenerationContext ctx = new GenerationContext();
                    File masterOut = new File("gen");
                    if (System.getProperty("output") != null) {
                        masterOut = new File(System.getProperty("output"));
                    }
                    masterOut.mkdirs();
                    File srcOut = new File(masterOut, "java");
                    srcOut.mkdirs();
                    File jsDir = new File(masterOut, "js");
                    jsDir.mkdirs();
                    ctx.setMetaModel(metaModelFile);
                    ctx.setMetaModelName(metaModelFile.getName().substring(0, metaModelFile.getName().lastIndexOf(".")));
                    ctx.setTargetSrcDir(srcOut);
                    ctx.setVersion(VersionAnalyzer.getVersion(metaModelFile));
                    Generator generator = new Generator();
                    generator.execute(ctx);
                    if (js) {
                        Files.createDirectories(jsDir.toPath());
                        Path javaLibJs = Paths.get(jsDir.toPath().toString(), GenModelPlugin.JAVA_LIB_JS);
                        Path libDts = Paths.get(jsDir.toPath().toString(), GenModelPlugin.LIB_D_TS);
                        Files.copy(this.getClass().getClassLoader().getResourceAsStream("tsc/" + GenModelPlugin.LIB_D_TS), libDts, StandardCopyOption.REPLACE_EXISTING);
                        Files.copy(getClass().getClassLoader().getResourceAsStream(GenModelPlugin.KMF_LIB_D_TS), Paths.get(jsDir.toPath().toString(), GenModelPlugin.KMF_LIB_D_TS), StandardCopyOption.REPLACE_EXISTING);
                        Path kmfLibJs = Paths.get(jsDir.toPath().toString(), GenModelPlugin.KMF_LIB_JS);
                        Files.copy(this.getClass().getClassLoader().getResourceAsStream(GenModelPlugin.KMF_LIB_JS), kmfLibJs, StandardCopyOption.REPLACE_EXISTING);
                        Files.copy(getClass().getClassLoader().getResourceAsStream(GenModelPlugin.TSC_JS), Paths.get(jsDir.toPath().toString(), GenModelPlugin.TSC_JS), StandardCopyOption.REPLACE_EXISTING);
                        SourceTranslator sourceTranslator = new SourceTranslator();
                        //add classpath

                        String[] javaClassPath = System.getProperty("java.class.path").split(File.pathSeparator);
                        for (String dep : javaClassPath) {
                            if (dep.endsWith(".jar")) {
                                sourceTranslator.getAnalyzer().addClasspath(dep);
                            }
                        }

                        //
                        sourceTranslator.translateSources(srcOut.getAbsolutePath(), jsDir.getAbsolutePath(), ctx.getMetaModelName());
                        System.out.print("Transpile to JS using TSC...");
                        TscRunner runner = new TscRunner();
                        runner.runTsc(Paths.get(jsDir.toPath().toString(), GenModelPlugin.TSC_JS).toFile().getAbsolutePath(), jsDir.toPath(), Paths.get(jsDir.toPath().toString(), ctx.getMetaModelName() + ".js"));
                        System.out.println("done");
                        StringBuilder sb = new StringBuilder();
                        Files.lines(javaLibJs).forEachOrdered((line) -> sb.append(line).append("\n"));
                        Files.lines(kmfLibJs).forEachOrdered((line) -> sb.append(line).append("\n"));
                        Files.lines(Paths.get(jsDir.toPath().toString(), ctx.getMetaModelName() + ".js")).forEachOrdered((line) -> sb.append(line).append("\n"));
                        Files.write(Paths.get(jsDir.toPath().toString(), ctx.getMetaModelName() + "-merged.js"), sb.toString().getBytes());
                        HtmlTemplateGenerator.generateHtml(jsDir.toPath(), ctx.getMetaModelName() + ".js", ctx.getMetaModelName());
                    }
                    System.out.println("Output : " + masterOut.getAbsolutePath());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        t.start();
        t.join();


        Thread[] subT = new Thread[1000];
        tg.enumerate(subT, true);
        for (Thread sub : subT) {
            try {
                if (sub != null) {
                    sub.interrupt();
                    sub.stop();
                }
            } catch (Exception e) {
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

    private static void add(File source, JarOutputStream target, String basePath, boolean root) throws IOException {
        BufferedInputStream in = null;
        try {
            if (source.isDirectory()) {
                String name = source.getPath().replace(basePath, "").replace("\\", "/");
                if (!name.isEmpty() && !root) {
                    if (!name.endsWith("/"))
                        name += "/";
                    JarEntry entry = new JarEntry(name);
                    entry.setTime(source.lastModified());
                    target.putNextEntry(entry);
                    target.closeEntry();
                }
                for (File nestedFile : source.listFiles()) {
                    add(nestedFile, target, basePath, false);
                }
                return;
            }

            JarEntry entry = new JarEntry(source.getPath().replace(basePath, "").replace("\\", "/"));
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

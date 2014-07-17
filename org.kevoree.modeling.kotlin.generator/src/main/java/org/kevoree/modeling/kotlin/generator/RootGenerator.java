package org.kevoree.modeling.kotlin.generator;

import com.google.common.io.Files;
import com.google.common.io.InputSupplier;
import com.google.javascript.jscomp.*;
import org.apache.commons.io.IOUtils;
import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.jetbrains.jet.cli.common.CLICompiler;
import org.jetbrains.jet.cli.common.ExitCode;
import org.jetbrains.jet.cli.common.arguments.K2JSCompilerArguments;
import org.jetbrains.jet.cli.common.arguments.K2JVMCompilerArguments;
import org.jetbrains.jet.cli.js.K2JSCompiler;
import org.jetbrains.jet.cli.jvm.K2JVMCompiler;
import org.jetbrains.k2js.config.EcmaVersion;
import org.jetbrains.k2js.config.MetaInfServices;
import org.jetbrains.k2js.translate.utils.TranslationUtils;
import org.kevoree.modeling.aspect.AspectClass;
import org.kevoree.modeling.aspect.KotlinLexerModule;

import java.io.*;
import java.net.URI;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.logging.Level;


/**
 * Created by duke on 7/16/14.
 */
public class RootGenerator {

    public void collectFiles(File directoryPath, List<File> sourceFileList, String extension) {
        for (String contents : directoryPath.list()) {
            File current = new File(directoryPath + File.separator + contents);
            if (contents.endsWith(extension)) {
                sourceFileList.add(current);
            } else {
                if (current.isDirectory()) {
                    collectFiles(current, sourceFileList, extension);
                }
            }
        }
    }

    private boolean deleteDirectory(File path) {
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

    public void execute(GenerationContext ctx, File ecore, String version, String targetName, List<String> additionalClassPath) throws Exception {

        File output = ctx.getRootGenerationDirectory();
        deleteDirectory(output);
        output.mkdirs();

        File sourceFile = ctx.rootSrcDirectory;

        File outputClasses = ctx.rootCompilationDirectory;

        KotlinLexerModule analyzer = new KotlinLexerModule();
        if (sourceFile.isDirectory() && sourceFile.exists()) {
            try {
                analyzer.analyze(sourceFile);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        List<File> sourceKotlinFileList = new ArrayList<File>();
        if (sourceFile.isDirectory() && sourceFile.exists()) {
            collectFiles(sourceFile, sourceKotlinFileList, ".kt");
        }
        for (File kotlinFile : sourceKotlinFileList) {
            if (ctx.js) {
                //copy file to util
                URI relativeURI = sourceFile.toURI().relativize(kotlinFile.toURI());
                File newFileTarget = new File(output + File.separator + relativeURI);
                newFileTarget.getParentFile().mkdirs();
                try {
                    BufferedWriter writer = new BufferedWriter(new FileWriter(newFileTarget));
                    BufferedReader br = new BufferedReader(new FileReader(kotlinFile));
                    String line;
                    while ((line = br.readLine()) != null) {
                        writer.write(line
                                .replaceAll("(meta.*trait)", "trait")
                                .replace("aspect trait", "trait")
                                .replace("import org.kevoree.modeling.api.aspect;", "")
                                .replace("import org.kevoree.modeling.api.aspect", "")
                                .replace("import org.kevoree.modeling.api.meta;", "")
                                .replace("import org.kevoree.modeling.api.meta", ""));
                        writer.write("\n");
                    }
                    writer.close();

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

        }
        System.out.println("Collected Aspects : ");
        for (AspectClass aspect : analyzer.cacheAspects.values()) {
            System.out.println(aspect.toString());
        }

        ctx.aspects = analyzer.cacheAspects;
        ctx.newMetaClasses = analyzer.newMetaClass;

        Generator gen = null;
        try {
            gen = new Generator(ctx, ecore);
            gen.generateModel(version);
            gen.generateLoader();
            gen.generateSerializer();
            gen.generateJSONSerializer();
            gen.generateJsonLoader();
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (ctx.js) {
            ResourceSet model = ctx.getEcoreModel(gen.ecoreFile);
            Iterator<Notifier> iterator = model.getAllContents();
            EPackage p = null;
            while ((p == null) && iterator.hasNext()) {
                Notifier el = iterator.next();
                if (el instanceof EPackage) {
                    if (TranslationUtils.currentPackageNames == null) {
                        TranslationUtils.currentPackageNames = new ArrayList<String>();
                    }
                    TranslationUtils.currentPackageNames.add(ProcessorHelper.getInstance().fqn(ctx, (EPackage) el));
                }
            }
        }
        List<String> exclusions = new ArrayList<String>();
        if (ctx.js) {
            exclusions.add("meta.kt");
            exclusions.add("aspect.kt");
        }
        StringBuilder cpath = new StringBuilder();
        boolean firstBUF = true;
        for (String path : additionalClassPath) {
            boolean JSLIB = false;
            File file = new File(path);
            if (file.exists()) {
                if (file.isFile() && ctx.js) {
                    JarFile jarFile = new JarFile(file);
                    if (jarFile.getJarEntry("META-INF/services/org.jetbrains.kotlin.js.librarySource") != null) {
                        JSLIB = true;
                        Enumeration<JarEntry> entries = jarFile.entries();
                        while (entries.hasMoreElements()) {
                            JarEntry entry = entries.nextElement();
                            boolean filtered = false;
                            for (String filter : exclusions) {
                                if (entry.getName().endsWith(filter)) {
                                    filtered = true;
                                }
                            }
                            if ((entry.getName().endsWith(".kt") && !filtered)) {
                                String fileName = entry.getName();
                                File destFile = new File(output, fileName.replace("/", File.separator + ""));
                                File parent = destFile.getParentFile();
                                if (!parent.exists() && !parent.mkdirs()) {
                                    throw new IllegalStateException("Couldn't create dir: " + parent);
                                }
                                FileOutputStream jos = new FileOutputStream(destFile);
                                InputStream is = jarFile.getInputStream(entry);
                                byte[] buffer = new byte[4096];
                                int bytesRead = 0;
                                while ((bytesRead = is.read(buffer)) != -1) {
                                    jos.write(buffer, 0, bytesRead);
                                }
                                is.close();
                                jos.flush();
                            }
                        }
                        //override with .jslib files
                        entries = jarFile.entries();
                        while (entries.hasMoreElements()) {
                            JarEntry entry = entries.nextElement();
                            if (entry.getName().endsWith(".kt.jslib")) {
                                String fileName = entry.getName();
                                fileName = fileName.replace(".jslib", "");
                                File destFile = new File(output, fileName.replace("/", File.separator + ""));
                                File parent = destFile.getParentFile();
                                if (!parent.exists() && !parent.mkdirs()) {
                                    throw new IllegalStateException("Couldn't create dir: " + parent);
                                }


                                FileOutputStream jos = new FileOutputStream(destFile, false);
                                InputStream is = jarFile.getInputStream(entry);
                                byte[] buffer = new byte[4096];
                                int bytesRead = 0;
                                while ((bytesRead = is.read(buffer)) != -1) {
                                    jos.write(buffer, 0, bytesRead);
                                }
                                is.close();
                                jos.flush();
                            }
                        }
                    }
                }
                if (!JSLIB) {
                    if (!firstBUF) {
                        cpath.append(File.pathSeparator);
                    }
                    cpath.append(path);
                    firstBUF = false;
                }
            }
        }

        ExitCode e;
        if (ctx.js) {
            K2JSCompilerArguments args = new K2JSCompilerArguments();
            ArrayList<String> sources = new ArrayList<String>();
            sources.add(output.getAbsolutePath());
            args.sourceFiles = sources.toArray(new String[sources.size()]);
            args.outputFile = outputClasses + File.separator + targetName + ".js";
            args.verbose = false;
            args.target = EcmaVersion.v5.name();
            e = KotlinCompilerJS.exec(new PrintStream(System.err) {
                @Override
                public void println(String x) {
                    if (x.startsWith("WARNING")) {
                        //noop
                    } else {
                        super.println(x);
                    }
                }
            }, args);
            if (e.ordinal() != 0) {
                //getLog().error("Can't compile generated code !");
                throw new Exception("Embedded Kotlin compilation error !");
            } else {
                copyJsLibraryFile(outputClasses, KOTLIN_JS_MAPS);
                copyJsLibraryFile(outputClasses, KOTLIN_JS_LIB);
                copyJsLibraryFile(outputClasses, KOTLIN_JS_LIB_ECMA5);
                File outputMerged = new File(outputClasses, targetName + ".merged.js");
                FileOutputStream mergedStream = new FileOutputStream(outputMerged);
                IOUtils.copy(MetaInfServices.loadClasspathResource(KOTLIN_JS_LIB_ECMA5), mergedStream);
                IOUtils.copy(MetaInfServices.loadClasspathResource(KOTLIN_JS_LIB), mergedStream);
                IOUtils.copy(MetaInfServices.loadClasspathResource(KOTLIN_JS_MAPS), mergedStream);
                Files.copy(new File(outputClasses, targetName + ".js"), mergedStream);
                mergedStream.write(("if(typeof(module)!='undefined'){module.exports = Kotlin.modules['" + targetName + "'];}").getBytes());
                mergedStream.write("\n".getBytes());
                mergedStream.flush();
                mergedStream.close();
                com.google.javascript.jscomp.Compiler.setLoggingLevel(Level.WARNING);
                com.google.javascript.jscomp.Compiler compiler = new com.google.javascript.jscomp.Compiler();
                CompilerOptions options = new CompilerOptions();
                WarningLevel.QUIET.setOptionsForWarningLevel(options);
                CompilationLevel.SIMPLE_OPTIMIZATIONS.setOptionsForCompilationLevel(options);

                //options.setCheckUnreachableCode(CheckLevel.OFF);

                compiler.compile(Collections.<SourceFile>emptyList(), Collections.singletonList(SourceFile.fromFile(outputMerged)), options);
                File outputMin = new File(outputClasses, targetName + ".min.js");
                FileWriter outputFile = new FileWriter(outputMin);
                outputFile.write(compiler.toSource());
                outputFile.close();
            }
        } else {
            K2JVMCompilerArguments args = new K2JVMCompilerArguments();
            args.classpath = cpath.toString();
            String sources = ctx.rootGenerationDirectory.getAbsolutePath();
            if (sourceFile.exists()) {
                //getLog().info("Add directory : " + sourceFile.getAbsolutePath());
                sources = sources + File.pathSeparator + sourceFile.getAbsolutePath();
            }
            //args.src = sources
            args.outputDir = outputClasses.getPath();
            args.src = (sources);
            args.noJdkAnnotations = true;
            args.noStdlib = true;
            args.verbose = false;
            e = KotlinCompiler.exec(new PrintStream(System.err) {
                @Override
                public void println(String x) {
                    if (x.startsWith("WARNING")) {

                    } else {
                        super.println(x);
                    }
                }
            }, args);
        }
        if (e.ordinal() != 0) {
            throw new Exception("Embedded Kotlin compilation error !");
        }
    }

    protected void copyJsLibraryFile(File targetDir, String jsLib) throws Exception {
        // lets copy the kotlin library into the output directory
        try {
            targetDir.mkdirs();
            final InputStream inputStream = MetaInfServices.loadClasspathResource(jsLib);
            if (inputStream == null) {
                System.out.println("WARNING: Could not find " + jsLib + " on the classpath!");
            } else {
                InputSupplier<InputStream> inputSupplier = new InputSupplier<InputStream>() {
                    @Override
                    public InputStream getInput() throws IOException {
                        return inputStream;
                    }
                };
                Files.copy(inputSupplier, new File(targetDir, jsLib));
            }
        } catch (IOException e) {
            throw new Exception(e.getMessage(), e);
        }
    }

    CLICompiler KotlinCompiler = new K2JVMCompiler();
    CLICompiler KotlinCompilerJS = new K2JSCompiler();

    public static final String KOTLIN_JS_MAPS = "kotlin-maps.js";
    public static final String KOTLIN_JS_LIB = "kotlin-lib.js";
    public static final String KOTLIN_JS_LIB_ECMA5 = "kotlin-lib-ecma5.js";
}

/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * Fouquet Francois
 * Nain Gregory
 */
/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * 	Fouquet Francois
 * 	Nain Gregory
 */


/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.kevoree.modeling.kotlin.generator.mavenplugin;

import com.google.common.io.Files;
import com.google.common.io.InputSupplier;
import com.google.javascript.jscomp.*;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.maven.artifact.DependencyResolutionRequiredException;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProject;
import org.jetbrains.jet.cli.common.CLICompiler;
import org.jetbrains.jet.cli.common.ExitCode;
import org.jetbrains.jet.cli.js.K2JSCompiler;
import org.jetbrains.jet.cli.js.K2JSCompilerArguments;
import org.jetbrains.jet.cli.jvm.K2JVMCompiler;
import org.jetbrains.jet.cli.jvm.K2JVMCompilerArguments;
import org.jetbrains.k2js.config.EcmaVersion;
import org.jetbrains.k2js.config.MetaInfServices;
import org.kevoree.modeling.aspect.AspectClass;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.Generator;

import java.io.*;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.logging.Level;

/**
 * @author <a href="mailto:ffouquet@irisa.fr">Fouquet François</a>
 * @version $Id$
 * @goal generate
 * @phase compile
 * @requiresDependencyResolution compile
 */
public class GenModelPlugin extends AbstractMojo {

    /**
     * Generate Persistence Layer for Model
     *
     * @parameter
     */
    private Boolean persistence = false;


    /**
     * @parameter
     */
    private String autoBasePackage = "kmf";


    /**
     * Ecore file
     *
     * @parameter
     */
    private File ecore;
    /**
     * Source base directory
     *
     * @parameter default-value="${project.build.directory}/generated-sources/kmf"
     */
    private File output;

    /**
     * Source base directory
     *
     * @parameter default-value="${project.build.directory}/generated-sources/kmf-util"
     */
    private File outputUtil;

    /**
     * code containerRoot package
     *
     * @parameter
     */
    private String packagePrefix;

    /**
     * Generate also selector
     *
     * @parameter
     */
    private Boolean selector = false;


    /**
     * Generate JS version
     *
     * @parameter
     */
    private Boolean js = false;

    /**
     * Generate JS version
     *
     * @parameter
     */
    private Boolean flyweightFactory = false;


    /**
     * Generate Events
     *
     * @parameter
     */
    private Boolean events = false;


    /**
     * @parameter
     */
    private Boolean ecma3compat = false;


    /**
     * The maven project.
     *
     * @parameter expression="${project}"
     * @required
     * @readonly
     */
    private MavenProject project;


    /**
     * @parameter default-value="${project.build.directory}/classes"
     */
    private File outputClasses;


    /**
     * The output JS file name
     *
     * @required
     * @parameter default-value="${project.build.directory}/js/${project.artifactId}.js"
     */
    private String outputJS;


    /**
     * The output Kotlin JS file
     *
     * @required
     * @parameter default-value="${project.build.directory}/js"
     * @parameter expression="${outputKotlinJSDir}"
     */
    private File outputKotlinJSDir;


    /**
     * The output Kotlin JS file
     *
     * @required
     * @parameter default-value="${basedir}/src/main/java"
     */
    private File sourceFile;

    /**
     * The output Kotlin JS file
     *
     * @required
     * @parameter default-value="${basedir}/target/generated-source/java"
     * @parameter expression="${sourceCleanedFile}"
     */
    private File sourceCleanedFile;


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

    CLICompiler KotlinCompiler = new K2JVMCompiler();
    CLICompiler KotlinCompilerJS = new K2JSCompiler();

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


    @Override
    public void execute() throws MojoExecutionException {
        deleteDirectory(output);
        deleteDirectory(outputUtil);
        deleteDirectory(outputClasses);
        deleteDirectory(outputClasses);

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

            if (js) {
                //copy file to util
                if (!outputUtil.exists()) {
                    outputUtil.mkdirs();
                }
                URI relativeURI = sourceFile.toURI().relativize(kotlinFile.toURI());
                File newFileTarget = new File(outputUtil + File.separator + relativeURI);
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
        GenerationContext ctx = new GenerationContext();
        ctx.setRootSrcDirectory(sourceFile);
        ctx.aspects_$eq(analyzer.cacheAspects);
        ctx.newMetaClasses_$eq(analyzer.newMetaClass);
        try {
            for (String path : project.getCompileClasspathElements()) {
                if (path.contains("org.kevoree.modeling.microframework")) {
                    ctx.microframework_$eq(true);
                }
            }
        } catch (DependencyResolutionRequiredException e) {
            e.printStackTrace();
        }

        ctx.setPackagePrefix(scala.Option.apply(packagePrefix));
        ctx.setRootGenerationDirectory(output);
        ctx.setRootUserDirectory(sourceFile);
        ctx.genSelector_$eq(selector);
        ctx.setJS(js);
        ctx.setGenerateEvents(events);
        ctx.flyweightFactory_$eq(flyweightFactory);
        ctx.autoBasePackage_$eq(autoBasePackage);
        ctx.ecma3compat_$eq(ecma3compat);
        ctx.persistence_$eq(persistence);
        if (persistence) {
            ctx.generateEvents_$eq(true);
        }

        Generator gen = new Generator(ctx, ecore);//, getLog());

        gen.generateModel(project.getVersion());

//        if (xmi) {
        gen.generateLoader();
        gen.generateSerializer();
//        }

        //       if (json) {
        gen.generateJSONSerializer();
        gen.generateJsonLoader();
        //      }


        //call Java compiler
        if (!ctx.getJS()) {
            /*
            javax.tools.JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
            StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);
            try {
                outputClasses.mkdirs();
                fileManager.setLocation(StandardLocation.CLASS_OUTPUT, Arrays.asList(outputClasses));
                try {
                    ArrayList<File> classPaths = new ArrayList<File>();
                    for (String path : project.getCompileClasspathElements()) {
                        classPaths.add(new File(path));
                    }

                    fileManager.setLocation(StandardLocation.CLASS_PATH, classPaths);
                } catch (DependencyResolutionRequiredException e) {
                    e.printStackTrace();
                }

            } catch (IOException e) {
                e.printStackTrace();
            }
            List<File> sourceFileList = new ArrayList<File>();
            collectFiles(ctx.getRootGenerationDirectory(), sourceFileList, ".java");
             */

             /*
            try {
                File localFileDir = new File(outputUtil + File.separator + "org" + File.separator + "jetbrains" + File.separator + "annotations");
                localFileDir.mkdirs();
                File localFile = new File(localFileDir, "NotNull.java");
                PrintWriter pr = new PrintWriter(localFile, "utf-8");
                VelocityEngine ve = new VelocityEngine();
                ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
                ve.init();
                Template template = ve.getTemplate("NotNull.vm");
                VelocityContext ctxV = new VelocityContext();
                template.merge(ctxV, pr);
                pr.flush();
                pr.close();
                sourceFileList.add(localFile);

            } catch (Exception e) {
                e.printStackTrace();
            }
              */
            /*
            File microfxlpath = new File(ctx.getRootGenerationDirectory().getAbsolutePath() + File.separator + "org" + File.separator + "kevoree" + File.separator + "modeling" + File.separator + "api");
            if (microfxlpath.exists()) {


                //Precompile Kotlin FWK
                K2JVMCompilerArguments args = new K2JVMCompilerArguments();
                //args.setClasspath(cpath.toString());

                ArrayList<String> sources = new ArrayList<String>();
                sources.add(microfxlpath.getAbsolutePath());

                args.setSourceDirs(sources);
                args.setOutputDir(outputClasses.getPath());
                args.noJdkAnnotations = true;
                args.noStdlib = true;
                args.verbose = false;
                ExitCode efirst = KotlinCompiler.exec(new PrintStream(System.err) {
                    @Override
                    public void println(String x) {
                        if (x.startsWith("WARNING")) {

                        } else {
                            super.println(x);
                        }
                    }

                }, args);
                if (efirst.ordinal() != 0) {
                    throw new MojoExecutionException("Embedded Kotlin compilation error !");
                } else {


                    try {
                        FileUtils.deleteDirectory(microfxlpath);
                    } catch (IOException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                }

            }
            */
            /*
            List<String> optionList = new ArrayList<String>();
            try {
                StringBuffer cpath = new StringBuffer();
                boolean firstBUF = true;
                for (String path : project.getCompileClasspathElements()) {
                    if (!firstBUF) {
                        cpath.append(File.pathSeparator);
                    }
                    cpath.append(path);
                    firstBUF = false;
                }
                optionList.addAll(Arrays.asList("-classpath", cpath.toString()));
            } catch (Exception e) {
                optionList.addAll(Arrays.asList("-classpath", System.getProperty("java.class.path")));
            }

            optionList.add("-source");
            optionList.add("1.6");
            optionList.add("-target");
            optionList.add("1.6");

            Iterable<? extends JavaFileObject> compilationUnits = fileManager.getJavaFileObjectsFromFiles(sourceFileList);

            DiagnosticListener noWarningListener = new DiagnosticListener() {

                @Override
                public void report(Diagnostic diagnostic) {
                    if (!diagnostic.getMessage(Locale.ENGLISH).contains("bootstrap class path not set in conjunction")) {
                        if (diagnostic.getKind().equals(Diagnostic.Kind.ERROR)) {
                            System.err.println(diagnostic);
                        } else {
                            System.out.println(diagnostic);
                        }
                    }
                }
            };

            javax.tools.JavaCompiler.CompilationTask task = compiler.getTask(null, fileManager, noWarningListener, optionList, null, compilationUnits);
            boolean result = task.call();
            try {
                fileManager.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("Java API compilation : " + result);
             */

        }

        outputClasses.mkdirs();


        List<String> exclusions = new ArrayList<String>();
        exclusions.add("KMFContainer.kt");
        exclusions.add("TimePoint.kt");
        exclusions.add("ByteConverter.kt");

        if (ctx.js()) {
            exclusions.add("meta.kt");
            exclusions.add("aspect.kt");
        }

        try {
            StringBuffer cpath = new StringBuffer();
            boolean firstBUF = true;
            for (String path : project.getCompileClasspathElements()) {

                boolean JSLIB = false;
                File file = new File(path);
                if (file.exists()) {

                    if (file.isFile() && ctx.js()) {
                        JarFile jarFile = new JarFile(file);
                        if (jarFile.getJarEntry("META-INF/services/org.jetbrains.kotlin.js.librarySource") != null) {
                            JSLIB = true;
                            Enumeration<JarEntry> entries = jarFile.entries();
                            while (entries.hasMoreElements()) {
                                JarEntry entry = entries.nextElement();
                                boolean filtered = false;
                                for (String filter : exclusions) {
                                    if (entry.getName() == (filter)) {
                                        filtered = true;
                                    }
                                }

                                if ((entry.getName().endsWith(".kt") && !filtered) || entry.getName().endsWith(".kt.jslib")) {

                                    String fileName = entry.getName();
                                    if (fileName.endsWith(".jslib")) {
                                        fileName = fileName.replace(".jslib", "");
                                    }

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

            ExitCode e = null;
            if (ctx.getJS()) {

                K2JSCompilerArguments args = new K2JSCompilerArguments();
                ArrayList<String> sources = new ArrayList<String>();
                sources.add(ctx.getRootGenerationDirectory().getAbsolutePath());
                if (outputUtil.exists()) {
                    //getLog().info("Add directory : " + sourceFile.getAbsolutePath());
                    sources.add(outputUtil.getAbsolutePath());
                }


                args.sourceFiles = sources.toArray(new String[sources.size()]);
                args.outputFile = outputJS;
                args.verbose = false;
                args.target = EcmaVersion.v5.name();
                e = KotlinCompilerJS.exec(new PrintStream(System.err) {
                    @Override
                    public void println(String x) {
                        if (x.startsWith("WARNING")) {

                        } else {
                            super.println(x);
                        }
                    }
                }, args);

                if (e.ordinal() != 0) {

                    getLog().error("Can't compile generated code !");
                    throw new MojoExecutionException("Embedded Kotlin compilation error !");
                } else {
                    copyJsLibraryFile(KOTLIN_JS_MAPS);
                    copyJsLibraryFile(KOTLIN_JS_LIB);
                    copyJsLibraryFile(KOTLIN_JS_LIB_ECMA5);

                    //create a merged file
                    File outputMerged = new File(outputKotlinJSDir, project.getArtifactId() + ".merged.js");
                    FileOutputStream mergedStream = new FileOutputStream(outputMerged);

                    // if (ecma5) {
                    IOUtils.copy(MetaInfServices.loadClasspathResource(KOTLIN_JS_LIB_ECMA5), mergedStream);
                    // } else {
                    //     IOUtils.copy(MetaInfServices.loadClasspathResource("kotlin-lib-ecma3-fixed.js"), mergedStream);
                    // }

                    IOUtils.copy(MetaInfServices.loadClasspathResource(KOTLIN_JS_LIB), mergedStream);
                    IOUtils.copy(MetaInfServices.loadClasspathResource(KOTLIN_JS_MAPS), mergedStream);
                    Files.copy(new File(outputKotlinJSDir, project.getArtifactId() + ".js"), mergedStream);

                    mergedStream.write(("if(typeof(module)!='undefined'){module.exports = Kotlin.modules['" + project.getArtifactId() + "'];}").getBytes());
                    mergedStream.write("\n".getBytes());


                    mergedStream.flush();
                    mergedStream.close();

                    com.google.javascript.jscomp.Compiler.setLoggingLevel(Level.WARNING);
                    com.google.javascript.jscomp.Compiler compiler = new com.google.javascript.jscomp.Compiler();
                    CompilerOptions options = new CompilerOptions();
                    WarningLevel.QUIET.setOptionsForWarningLevel(options);
                    CompilationLevel.SIMPLE_OPTIMIZATIONS.setOptionsForCompilationLevel(options);
                    options.setCheckUnreachableCode(CheckLevel.OFF);

                    compiler.compile(Collections.<JSSourceFile>emptyList(), Collections.singletonList(JSSourceFile.fromFile(outputMerged)), options);

                    File outputMin = new File(outputKotlinJSDir, project.getArtifactId() + ".min.js");
                    FileWriter outputFile = new FileWriter(outputMin);
                    outputFile.write(compiler.toSource());
                    outputFile.close();

                    if (outputUtil.exists()) {
                        FileUtils.deleteDirectory(output);
                        FileUtils.deleteDirectory(outputUtil);
                    }

                    FileUtils.copyDirectory(outputKotlinJSDir, outputClasses);

                }


            } else {
                K2JVMCompilerArguments args = new K2JVMCompilerArguments();
                args.setClasspath(cpath.toString());

                ArrayList<String> sources = new ArrayList<String>();
                sources.add(ctx.getRootGenerationDirectory().getAbsolutePath());
                if (sourceFile.exists()) {
                    getLog().info("Add directory : " + sourceFile.getAbsolutePath());
                    sources.add(sourceFile.getAbsolutePath());
                }

                args.setSourceDirs(sources);
                args.setOutputDir(outputClasses.getPath());
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
                throw new MojoExecutionException("Embedded Kotlin compilation error !");
            }
        } catch (MojoExecutionException e) {
            getLog().error(e);
            throw e;
        } catch (Exception e) {
            getLog().error(e);
        }


        //this.project.addCompileSourceRoot(output.getAbsolutePath());
    }

    protected void copyJsLibraryFileRename(String jsLib, String newName) throws MojoExecutionException {
        // lets copy the kotlin library into the output directory
        try {
            outputKotlinJSDir.mkdirs();
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
                Files.copy(inputSupplier, new File(outputKotlinJSDir, newName));
            }
        } catch (IOException e) {
            throw new MojoExecutionException(e.getMessage(), e);
        }
    }

    protected void copyJsLibraryFile(String jsLib) throws MojoExecutionException {
        // lets copy the kotlin library into the output directory
        try {
            outputKotlinJSDir.mkdirs();
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
                Files.copy(inputSupplier, new File(outputKotlinJSDir, jsLib));
            }
        } catch (IOException e) {
            throw new MojoExecutionException(e.getMessage(), e);
        }
    }

    public static final String KOTLIN_JS_MAPS = "kotlin-maps.js";
    public static final String KOTLIN_JS_LIB = "kotlin-lib.js";
    public static final String KOTLIN_JS_LIB_ECMA5 = "kotlin-lib-ecma5.js";


}

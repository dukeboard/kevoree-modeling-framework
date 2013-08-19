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
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.jetbrains.jet.cli.common.CLICompiler;
import org.jetbrains.jet.cli.common.ExitCode;
import org.jetbrains.jet.cli.js.K2JSCompiler;
import org.jetbrains.jet.cli.js.K2JSCompilerArguments;
import org.jetbrains.jet.cli.jvm.K2JVMCompiler;
import org.jetbrains.jet.cli.jvm.K2JVMCompilerArguments;
import org.jetbrains.k2js.config.MetaInfServices;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.Generator;

import javax.tools.*;
import java.io.*;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.logging.Level;


/**
 * Generates files based on grammar files with Antlr tool.
 *
 * @author <a href="mailto:ffouquet@irisa.fr">Fouquet François</a>
 * @version $Id$
 * @goal generate
 * @phase generate-sources
 * @requiresDependencyResolution compile
 */
public class GenModelPlugin extends AbstractMojo {

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
     * Source user base directory
     *
     * @parameter default-value="src/main/java"
     */
    private File inputScala;


    /**
     * code containerRoot package
     *
     * @parameter
     */
    private String packagePrefix;

    /**
     * Root XMI Container
     *
     * @parameter
     */
    private String rootXmiContainerClassName;


    /**
     * Clear output dir
     *
     * @parameter
     */
    private Boolean clearOutput = true;

    /**
     * Only generate model structure
     *
     * @parameter
     */
    private Boolean modelOnly = false;


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
     * Generate Flat inheritance version
     *
     * @parameter
     */
    private Boolean flatInheritance = false;


    /**
     * Generate JS version
     *
     * @parameter
     */
    private Boolean flyweightFactory = false;


    /**
     * Generate JSON
     *
     * @parameter
     */
    private Boolean json = false;


    /**
     * Generate Events
     *
     * @parameter
     */
    private Boolean events = false;

    /**
     * Generate Events
     *
     * @parameter
     */
    private Boolean trace = false;


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
     * @parameter expression="${outputKotlinJSFile}"
     */
    private File outputKotlinJSDir;


    /**
     * The output Kotlin JS file
     *
     * @required
     * @parameter default-value="${basedir}/src/main/java"
     * @parameter expression="${outputKotlinJSFile}"
     */
    private File sourceFile;


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

    public void collectJavaFiles(String directoryPath, List<File> sourceFileList) {
        for (String contents : new File(directoryPath).list()) {
            File current = new File(directoryPath + File.separator + contents);
            if (contents.endsWith(".java")) {
                sourceFileList.add(current);
            } else {
                if (current.isDirectory()) {
                    collectJavaFiles(current.getAbsolutePath(), sourceFileList);
                }
            }
        }
    }


    @Override
    public void execute() throws MojoExecutionException {
        if (clearOutput) {
            deleteDirectory(output);
        }
        if(trace && !json){
            json = true; // trace need JSON
        }


        GenerationContext ctx = new GenerationContext();

        try {
            for (String path : project.getCompileClasspathElements()) {
                if (path.contains("org.kevoree.modeling.microframework")) {
                    ctx.microframework_$eq(true);
                }
            }
        } catch (DependencyResolutionRequiredException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        ctx.setPackagePrefix(scala.Option.apply(packagePrefix));
        ctx.setRootGenerationDirectory(output);
        ctx.setRootUserDirectory(inputScala);
        ctx.setRootContainerClassName(scala.Option.apply(rootXmiContainerClassName));
        ctx.genSelector_$eq(selector);
        ctx.setJS(js);
        ctx.setGenerateEvents(events);
        ctx.genTrace_$eq(trace);

        if (flatInheritance || js) {
            ctx.setGenFlatInheritance();
        }
        ctx.flyweightFactory_$eq(flyweightFactory);

        Generator gen = new Generator(ctx, ecore);//, getLog());

        gen.generateModel(project.getVersion());
        if (!modelOnly) {
            gen.generateLoader();
            gen.generateSerializer();
        }
        if (json) {
            gen.generateJSONSerializer();
            gen.generateJsonLoader();
        }


        //call Java compiler
        if (!ctx.getJS()) {
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
            collectJavaFiles(ctx.getRootGenerationDirectory().getAbsolutePath(), sourceFileList);

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

            File microfxlpath = new File(ctx.getRootGenerationDirectory().getAbsolutePath() + File.separator + "org" + File.separator + "kevoree" + File.separator + "modeling" + File.separator + "api");
            if (microfxlpath.exists()) {


                //Precompile Kotlin FWK
                K2JVMCompilerArguments args = new K2JVMCompilerArguments();
                //args.setClasspath(cpath.toString());

                ArrayList<String> sources = new ArrayList<String>();
                getLog().info("Add directory : " + sourceFile.getAbsolutePath());
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

            //TODO delete Jetbrains NotNull class file

        }

        outputClasses.mkdirs();


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
                                if ((entry.getName().endsWith(".kt") || entry.getName().endsWith(".kt.jslib")) && !entry.getName().endsWith("KMFContainer.kt") && !entry.getName().endsWith("aspect.kt")) {

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
                if (sourceFile.exists()) {
                    getLog().info("Add directory : " + sourceFile.getAbsolutePath());
                    sources.add(sourceFile.getAbsolutePath());
                }
                args.sourceFiles = sources.toArray(new String[sources.size()]);
                args.outputFile = outputJS;
                args.verbose = false;
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
                    copyJsLibraryFile(KOTLIN_JS_LIB_ECMA3);
                    copyJsLibraryFile(KOTLIN_JS_LIB_ECMA5);

                    //create a merged file
                    File outputMerged = new File(outputKotlinJSDir, project.getArtifactId()+".merged.js");
                    FileOutputStream mergedStream = new FileOutputStream(outputMerged);
                    IOUtils.copy(MetaInfServices.loadClasspathResource(KOTLIN_JS_LIB_ECMA3), mergedStream);
                    IOUtils.copy(MetaInfServices.loadClasspathResource(KOTLIN_JS_LIB),mergedStream);
                    IOUtils.copy(MetaInfServices.loadClasspathResource(KOTLIN_JS_MAPS),mergedStream);
                    Files.copy(new File(outputKotlinJSDir, project.getArtifactId()+".js"),mergedStream);

                    mergedStream.write( ("if(typeof(module)!='undefined'){module.exports = Kotlin.modules['"+project.getArtifactId()+"'];}").getBytes());
                    mergedStream.write("\n".getBytes());


                    mergedStream.flush();
                    mergedStream.close();

                    com.google.javascript.jscomp.Compiler.setLoggingLevel(Level.WARNING);
                    com.google.javascript.jscomp.Compiler compiler = new com.google.javascript.jscomp.Compiler();
                    CompilerOptions options = new CompilerOptions();
                    WarningLevel.QUIET.setOptionsForWarningLevel(options);
                    CompilationLevel.SIMPLE_OPTIMIZATIONS.setOptionsForCompilationLevel(options);
                    options.setCheckUnreachableCode(CheckLevel.OFF);
                    compiler.compile(Collections.<JSSourceFile>emptyList(),Collections.singletonList(JSSourceFile.fromFile(outputMerged)),options);


                    File outputMin = new File(outputKotlinJSDir, project.getArtifactId()+".min.js");
                    FileWriter outputFile = new FileWriter(outputMin);
                    outputFile.write(compiler.toSource());
                    outputFile.close();

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
     /*
    protected void appendFile(String jsLib, StringBuilder builder) throws MojoExecutionException {
        // lets copy the kotlin library into the output directory
        try {
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
                String text = "\n" + FileUtil.loadTextAndClose(inputStream);
                builder.append(text);
            }
        } catch (IOException e) {
            throw new MojoExecutionException(e.getMessage(), e);
        }
    } */

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
    public static final String KOTLIN_JS_LIB_ECMA3 = "kotlin-lib-ecma3.js";
    public static final String KOTLIN_JS_LIB_ECMA5 = "kotlin-lib-ecma5.js";


}

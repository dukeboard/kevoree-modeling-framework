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
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.apache.maven.plugins.annotations.ResolutionScope;
import org.apache.maven.project.MavenProject;
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
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.Generator;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.*;
import java.net.URI;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.logging.Level;


@Mojo(name = "generate", defaultPhase = LifecyclePhase.COMPILE, requiresDependencyResolution = ResolutionScope.COMPILE)
public class GenModelPlugin extends AbstractMojo {

    /**
     * Generate Persistence Layer for Model
     */
    @Parameter
    private Boolean persistence = false;

    /**
     * Generate Timed-Aware persistence Layer for Model
     */
    @Parameter
    private Boolean timeAware = false;

    @Parameter
    private String autoBasePackage = "kmf";

    /**
     * Ecore file
     */
    @Parameter
    private File ecore;

    /**
     * Source base directory
     */
    @Parameter(defaultValue = "${project.build.directory}/generated-sources/kmf")
    private File output;

    /**
     * Source base directory
     */
    @Parameter(defaultValue = "${project.build.directory}/generated-sources/kmf-util")
    private File outputUtil;

    /**
     * code containerRoot package
     */
    @Parameter
    private String packagePrefix;

    /**
     * Generate also selector
     */
    @Parameter
    private Boolean selector = false;


    /**
     * Generate JS version
     */
    @Parameter
    private Boolean js = false;

    /**
     * Generate JS version
     */
    @Parameter
    private Boolean flyweightFactory = false;
    /**
     * Generate Events
     */
    @Parameter
    private Boolean events = false;

    @Parameter
    private Boolean ecma3compat = false;

    /**
     * The maven project.
     */
    @Parameter(defaultValue = "${project}", required = true, readonly = true)
    private MavenProject project;

    @Parameter(defaultValue = "${project.build.directory}/classes")
    private File outputClasses;

    /**
     * The output JS file name
     */
    @Parameter(defaultValue = "${project.build.directory}/js/${project.artifactId}.js", required = true)
    private String outputJS;


    /**
     * The output Kotlin JS file
     */
    @Parameter(defaultValue = "${project.build.directory}/js", required = true)
    private File outputKotlinJSDir;


    /**
     * The output Kotlin JS file
     */
    @Parameter(defaultValue = "${basedir}/src/main/java", required = true)
    private File sourceFile;

    /**
     * The output Kotlin JS file
     */
    @Parameter(defaultValue = "${basedir}/target/generated-source/java", required = true)
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
        ctx.rootSrcDirectory = sourceFile;
        ctx.aspects = analyzer.cacheAspects;
        ctx.newMetaClasses = analyzer.newMetaClass;

        if (timeAware) {
            persistence = true;
        }
        ctx.packagePrefix = packagePrefix;
        ctx.rootGenerationDirectory = output;
        ctx.rootUserDirectory = sourceFile;
        ctx.genSelector = selector;
        ctx.js = js;
        ctx.generateEvents = events;
        ctx.flyweightFactory = flyweightFactory;
        ctx.autoBasePackage = autoBasePackage;
        ctx.ecma3compat = ecma3compat;
        ctx.persistence = persistence;
        ctx.timeAware = timeAware;
        if (persistence) {
            ctx.generateEvents = true;
        }

        Generator gen = null;//, getLog());
        try {
            gen = new Generator(ctx, ecore);
            gen.generateModel(project.getVersion());
            gen.generateLoader();
            gen.generateSerializer();
            gen.generateJSONSerializer();
            gen.generateJsonLoader();
        } catch (Exception e) {
            e.printStackTrace();
        }
        outputClasses.mkdirs();


        if (ctx.js) {
            ResourceSet model = ctx.getEcoreModel(ecore);
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

        try {
            StringBuffer cpath = new StringBuffer();
            boolean firstBUF = true;
            for (String path : project.getCompileClasspathElements()) {
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
                sources.add(ctx.rootGenerationDirectory.getAbsolutePath());
                if (outputUtil.exists()) {
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
                            //noop
                        } else {
                            super.println(x);
                        }
                    }
                }, args);
                if (e.ordinal() != 0) {
                    getLog().error("Can't compile generated code !");
                    throw new MojoExecutionException("Embedded Kotlin compilation error !");
                } else {
                    //copyJsLibraryFile(KOTLIN_JS_MAPS);
                    copyJsLibraryFile(KOTLIN_JS_LIB);
                    //copyJsLibraryFile(KOTLIN_JS_LIB_ECMA5);
                    File outputMerged = new File(outputKotlinJSDir, project.getArtifactId() + ".merged.js");
                    FileOutputStream mergedStream = new FileOutputStream(outputMerged);
                    //IOUtils.copy(MetaInfServices.loadClasspathResource(KOTLIN_JS_LIB_ECMA5), mergedStream);
                    IOUtils.copy(MetaInfServices.loadClasspathResource(KOTLIN_JS_LIB), mergedStream);
                    //IOUtils.copy(MetaInfServices.loadClasspathResource(KOTLIN_JS_MAPS), mergedStream);
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
                args.classpath = cpath.toString();
                String sources = ctx.rootGenerationDirectory.getAbsolutePath();
                if (sourceFile.exists()) {
                    getLog().info("Add directory : " + sourceFile.getAbsolutePath());
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
    //public static final String KOTLIN_JS_LIB = "kotlin-lib.js";
    public static final String KOTLIN_JS_LIB_ECMA5 = "kotlin-lib-ecma5.js";

    public static final String KOTLIN_JS_LIB = "kotlin.js";


}

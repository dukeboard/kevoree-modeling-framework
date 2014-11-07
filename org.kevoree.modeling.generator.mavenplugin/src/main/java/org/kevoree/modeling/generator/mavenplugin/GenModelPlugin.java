package org.kevoree.modeling.generator.mavenplugin;

import org.apache.maven.artifact.Artifact;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.apache.maven.plugins.annotations.ResolutionScope;
import org.apache.maven.project.MavenProject;
import org.kevoree.modeling.generator.GenerationContext;
import org.kevoree.modeling.generator.Generator;
import org.kevoree.modeling.java2typescript.SourceTranslator;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Mojo(name = "generate", defaultPhase = LifecyclePhase.GENERATE_SOURCES, requiresDependencyResolution = ResolutionScope.COMPILE)
public class GenModelPlugin extends AbstractMojo {

    /**
     * Ecore file
     */
    @Parameter
    private File metaModelFile;

    /**
     * Source base directory
     */
    @Parameter(defaultValue = "${project.build.directory}/generated-sources/kmf")
    private File targetSrcGenDir;

    /**
     * code containerRoot package
     */
    @Parameter
    private String metaModelQualifiedName;

    /**
     * The maven project.
     */
    @Parameter(defaultValue = "${project}", required = true, readonly = true)
    private MavenProject project;

    /**
     * The maven project.
     */
    @Parameter(defaultValue = "${project.build.directory}/classes")
    private File classesDirectory;


    /**
     * Source base directory
     */
    @Parameter(defaultValue = "${project.build.directory}/js")
    private File jsWorkingDir;

    @Parameter
    private boolean js = false;

    private static final String LIB_D_TS = "lib.d.ts";
    private static final String KMF_LIB_D_TS = "org.kevoree.modeling.microframework.typescript.d.ts";

    @Override
    public void execute() throws MojoExecutionException, MojoFailureException {

        try {
            String targetName = metaModelFile.getName().substring(0, metaModelFile.getName().lastIndexOf("."));
            if (metaModelQualifiedName != null) {
                targetName = metaModelQualifiedName;
            }
            GenerationContext ctx = new GenerationContext();
            ctx.setMetaModel(metaModelFile);
            ctx.setMetaModelName(targetName);
            ctx.setTargetSrcDir(targetSrcGenDir);
            ctx.setVersion(project.getVersion());
            Generator generator = new Generator();
            generator.execute(ctx);
            if (js) {
                Files.createDirectories(jsWorkingDir.toPath());

                Path libDts = Paths.get(jsWorkingDir.toPath().toString(), LIB_D_TS);
                Files.copy(this.getClass().getClassLoader().getResourceAsStream("tsc/" + LIB_D_TS), libDts, StandardCopyOption.REPLACE_EXISTING);

                Files.copy(getClass().getClassLoader().getResourceAsStream(KMF_LIB_D_TS), Paths.get(jsWorkingDir.toPath().toString(), KMF_LIB_D_TS), StandardCopyOption.REPLACE_EXISTING);

                SourceTranslator sourceTranslator = new SourceTranslator();
                for (Artifact a : project.getDependencyArtifacts()) {
                    File file = a.getFile();
                    if (file != null) {
                        sourceTranslator.getAnalyzer().addClasspath(file.getAbsolutePath());
                        getLog().info("Add to classpath " + file.getAbsolutePath());
                    }
                }
                sourceTranslator.translateSources(targetSrcGenDir.getAbsolutePath(), jsWorkingDir.getAbsolutePath(), project.getArtifactId());

                /*
                StringBuilder sb = new StringBuilder();
                Files.lines(Paths.get(jsWorkingDir.toPath().toString(), "org.kevoree.modeling.microframework.typescript.ts")).forEachOrdered((line) -> sb.append(line).append("\n"));
                Files.lines(Paths.get(jsWorkingDir.toPath().toString(), project.getArtifactId() + "-only.ts")).forEachOrdered((line) -> sb.append(line).append("\n"));
                Files.write(Paths.get(jsWorkingDir.toPath().toString(), project.getArtifactId() + ".ts"), sb.toString().getBytes());
                */

                TscRunner runner = new TscRunner();
                runner.runTsc(jsWorkingDir.toPath(), Paths.get(jsWorkingDir.toPath().toString(), project.getArtifactId() + ".js"));

            }

        } catch (Exception e) {
            getLog().error(e);
            throw new MojoExecutionException("KMF Compilation error !", e);
        }


    }
}
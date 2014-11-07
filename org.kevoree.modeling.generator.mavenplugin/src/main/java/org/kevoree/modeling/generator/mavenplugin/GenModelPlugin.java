package org.kevoree.modeling.generator.mavenplugin;

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


            if(js) {

                Path libDts = Paths.get(jsWorkingDir.toPath().toString(), "lib.d.ts");



                Files.createDirectories(jsWorkingDir.toPath());
                //Files.copy(getClass().getClassLoader().getResourceAsStream("lib.d.ts"), libDts);

                Files.copy(getClass().getClassLoader().getResourceAsStream("org.kevoree.modeling.microframework.typescript.ts"), Paths.get(jsWorkingDir.toPath().toString(), "org.kevoree.modeling.microframework.typescript.ts"));

                SourceTranslator sourceTranslator = new SourceTranslator();
                sourceTranslator.translateSources(targetSrcGenDir.getAbsolutePath(), jsWorkingDir.getAbsolutePath() + File.separator + project.getArtifactId() + "-only.ts");

                StringBuilder sb = new StringBuilder();
                Files.lines(Paths.get(jsWorkingDir.toPath().toString(), "org.kevoree.modeling.microframework.typescript.ts")).forEachOrdered((line)->sb.append(line).append("\n"));
                Files.lines(Paths.get(jsWorkingDir.toPath().toString(), project.getArtifactId() + "-only.ts")).forEachOrdered((line)->sb.append(line).append("\n"));

                Files.write(Paths.get(jsWorkingDir.toPath().toString(), project.getArtifactId() + ".ts"), sb.toString().getBytes());

                TscRunner runner = new TscRunner();
                runner.runTsc(Paths.get(jsWorkingDir.toPath().toString(), project.getArtifactId() + ".ts"), Paths.get(jsWorkingDir.toPath().toString(), project.getArtifactId() + ".js"), libDts);

            }


        } catch (Exception e) {
            getLog().error(e);
            throw new MojoExecutionException("KMF Compilation error !", e);
        }


    }
}
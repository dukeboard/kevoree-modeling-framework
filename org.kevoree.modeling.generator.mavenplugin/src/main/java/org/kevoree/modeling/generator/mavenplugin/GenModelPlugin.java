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

import java.io.File;

@Mojo(name = "generate", defaultPhase = LifecyclePhase.COMPILE, requiresDependencyResolution = ResolutionScope.COMPILE)
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
    private File kmfSrcGenerationDirectory;

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


    @Override
    public void execute() throws MojoExecutionException, MojoFailureException {



        try {
            String targetName;
            if (metaModelQualifiedName != null) {
                targetName = metaModelQualifiedName;
            } else {
                targetName = metaModelFile.getName();
                if (targetName.endsWith(".ecore")) {
                    targetName = targetName.replace(".ecore", "");
                }
                if (targetName.endsWith(".mm")) {
                    targetName = targetName.replace(".mm", "");
                }
                if (targetName.endsWith(".xsd")) {
                    targetName = targetName.replace(".xsd", "");
                }
            }


            GenerationContext ctx = new GenerationContext();
            ctx.metaModel = metaModelFile;
            ctx.metaModelName = targetName;

            ctx.kmfSrcGenerationDirectory = kmfSrcGenerationDirectory;
            ctx.classesDirectory = classesDirectory;

            ctx.projectVersion = project.getVersion();
            //ctx.XXXXX = project.getCompileClasspathElements()


            Generator generator = new Generator();
            generator.execute(ctx);

        } catch (Exception e) {
            getLog().error(e);
            throw new MojoExecutionException("KMF Compilation error !", e);
        }


    }
}
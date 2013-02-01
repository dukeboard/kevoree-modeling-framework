package org.kevoree.benchmarker.mavenplugin;
/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 30/01/13
* (c) 2013 University of Luxembourg – Interdisciplinary Centre for Security Reliability and Trust (SnT)
* All rights reserved
*/

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProject;
import org.kermeta.emf.genmodel.Util;
import org.kevoree.tools.ecore.kotlin.gencode.GenerationContext;
import org.kevoree.tools.ecore.kotlin.gencode.Generator;

import java.io.File;


/**
 * Generates files based on grammar files with Antlr tool.
 *
 * @author <a href="mailto:ffouquet@irisa.fr">Fouquet François</a>
 * @version $Id$
 * @goal generate
 * @phase generate-sources
 * @requiresDependencyResolution compile
 */
public class Main extends AbstractMojo {


    /**
     * Metamodels folder
     *
     * @parameter
     */
    private File[] metamodels;

    /**
     * Source base directory
     *
     * @parameter default-value="${project.build.directory}/generated-sources/"
     */
    private File output;

    /**
     * Tests base directory
     *
     * @parameter default-value="${project.build.directory}/generated-test-sources/"
     */
    private File testsOutput;

    /**
     * Root XMI Container
     *
     * @parameter
     */
    private String[] rootContainers;


    /**
     * The maven project.
     *
     * @parameter expression="${project}"
     * @required
     * @readonly
     */
    private MavenProject project;

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

    @Override
    public void execute() throws MojoExecutionException {

        deleteDirectory(output);

        if(metamodels.length != rootContainers.length) {
            throw new MojoExecutionException("The number of rootContainers and Metamodels must be equal. You have to specify the RootContainer, for each Metamodel, in the same order.");
        }


        for(int i = 0 ; i < metamodels.length ; i++) {

            GenerationContext ctx = generateKmf(metamodels[i], rootContainers[i], "test"+i+".kmf");
            generateEmf(metamodels[i],"test"+i+".emf");
            TestsGenerator.generateTests(metamodels[i], ctx.factoryPackage(), "test"+i, testsOutput, project.getBasedir());
        }

        this.project.addCompileSourceRoot(output.getAbsolutePath());
        this.project.addTestCompileSourceRoot(testsOutput.getAbsolutePath());
    }


    private GenerationContext generateKmf(File metamodel, String containerRoot, String localPackagePrefix) {
        GenerationContext ctx = new GenerationContext();
        ctx.setPackagePrefix(scala.Option.apply(localPackagePrefix));
        ctx.setRootGenerationDirectory(new File(output.getAbsolutePath() + "/" + localPackagePrefix.replace(".","/")));
        ctx.setRootContainerClassName(scala.Option.apply(containerRoot));


        Generator gen = new Generator(ctx);//, getLog());
        gen.generateModel(metamodel, project.getVersion());
        gen.generateLoader(metamodel);
        gen.generateSerializer(metamodel);
        return ctx;

    }


    private void generateEmf(File metamodel, String localPackagePrefix) {
        Util.createGenModel(metamodel, null, new File(output.getAbsolutePath() + "/" + localPackagePrefix.replace(".","/")), getLog(), false, localPackagePrefix);
        project.addCompileSourceRoot(output.getAbsolutePath());
    }

}

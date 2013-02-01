package org.kevoree.benchmarker.mavenplugin;/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 31/01/13
* (c) 2013 University of Luxembourg – Interdisciplinary Centre for Security Reliability and Trust (SnT)
* All rights reserved
*/

import org.apache.maven.plugin.MojoExecutionException;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintWriter;

public class TestsGenerator {


    public static void generateTests(File ecoreModel, String basePackage, String packagePrefix, File testsOutput, File projectRoot) throws MojoExecutionException {

        try {

            String metamodelName = ecoreModel.getName();
            metamodelName = metamodelName.substring(0,metamodelName.lastIndexOf("."));
            metamodelName = metamodelName.substring(0,1).toUpperCase() + metamodelName.substring(1);


            File generationFolder = new File(testsOutput.getAbsolutePath() + File.separator + "kmf" + File.separator + "org" + File.separator + "kevoree" + File.separator + "benchmarker");
            if(!generationFolder.exists()) {
                generationFolder.mkdirs();
            }


            File testFile = new File(generationFolder.getAbsolutePath() + File.separator + metamodelName + "CaliperTest.java");
            System.out.println("Generating test file " + testFile.getAbsolutePath());

            PrintWriter pr = new PrintWriter(new FileOutputStream(testFile));

            pr.println("package org.kevoree.benchmarker;");
            pr.println("");
            //pr.println("import com.google.caliper.runner.CaliperMain;");
            pr.println("import com.google.caliper.Runner;");
            pr.println("import com.google.caliper.SimpleBenchmark;");
            pr.println("import java.io.File;");
            pr.println("import java.net.URISyntaxException;");
            pr.println("import java.io.IOException;");

            pr.println("import org.eclipse.emf.ecore.EObject;");

            pr.println("import org.eclipse.emf.common.util.TreeIterator;");
            pr.println("import org.eclipse.emf.common.util.URI;");
            pr.println("import org.eclipse.emf.ecore.resource.Resource;");
            pr.println("import org.eclipse.emf.ecore.resource.ResourceSet;");
            pr.println("import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;");
            pr.println("import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;");
            pr.println("import org.eclipse.emf.ecore.util.EcoreUtil;");

            pr.println("import org.junit.Test;");
            pr.println("import static org.junit.Assert.assertTrue;");
            pr.println("");
            pr.println("");
            pr.println("public class "+ metamodelName + "CaliperTest extends SimpleBenchmark {");
            pr.println("");
            pr.println(basePackage+".loader.ModelLoader loader = null;");
            pr.println("");
            pr.println("@Override protected void setUp() {");
            pr.println("loader = new "+basePackage+".loader.ModelLoader();");
            pr.println("}");
            pr.println("");
            pr.println("");

            File modelsFolder = new File(projectRoot.getAbsolutePath() + File.separator + "src" + File.separator + "test" + File.separator + "resources" + File.separator + metamodelName.toLowerCase());
            if(!modelsFolder.exists()) {
                throw new MojoExecutionException("Could not generate tests because test models folder for Metamodel '"+metamodelName+"' does not exist at location " + modelsFolder.getAbsolutePath());
            }

            for(File model : modelsFolder.listFiles()) {
                if(!model.getName().equals(".DS_Store")) {
                    String modelName = model.getName();
                    System.out.println("Generating tests for model: " + modelName);
                    if(modelName.lastIndexOf(".") != -1) {
                        modelName = modelName.substring(0,modelName.lastIndexOf("."));
                    }
                    modelName = modelName.substring(0,1).toUpperCase() + modelName.substring(1);

                    // KMF
                    pr.println("");
                    pr.println("public void timeKMFLoad"+modelName+"(int reps) {");
                    pr.println("try {");
                    pr.println("File localModel = new File(getClass().getResource(\"/" + metamodelName.toLowerCase() + "/" + model.getName()+"\").toURI());");
                    pr.println("for(int i = 0 ; i < reps ; i++) {");
                    pr.println("loader.loadModelFromPath(localModel);");
                    pr.println("}");//END FOR
                    pr.println("}catch (URISyntaxException e) {e.printStackTrace();}");
                    pr.println("}");
                    pr.println("");

                    // EMF

                    pr.println("");
                    pr.println("public void timeEMFLoad"+modelName+"(int reps) {");
                    pr.println("try {");
                    pr.println("File localModel = new File(getClass().getResource(\"/" + metamodelName.toLowerCase() + "/" + model.getName()+"\").toURI());");
                    pr.println("URI fileURI = URI.createFileURI(localModel.getAbsolutePath());");
                    //pr.println("System.err.println(\"Model URI:\" + fileURI.toString());");
                    pr.println("ResourceSet resourceSet = new ResourceSetImpl();");
                    pr.println("resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());");
                    String packageName = basePackage.substring(basePackage.lastIndexOf(".")+1);
                    packageName = packageName.substring(0,1).toUpperCase() + packageName.substring(1).toLowerCase();
                    pr.println(basePackage.replaceFirst("kmf","emf") + "."+packageName+"Package pack = " + basePackage.replaceFirst("kmf","emf") + "."+packageName+"Package.eINSTANCE;");
                    pr.println("for(int i = 0 ; i < reps ; i++) {");
                    pr.println("Resource resource2 = resourceSet.createResource(fileURI);");
                    pr.println("assertTrue(\"Resource is null. Model URI:\" + fileURI.toString(), resource2 != null);");
                    pr.println("resource2.load(null);");
                    pr.println("EcoreUtil.resolveAll(resource2);");
                    pr.println("assertTrue(\"Contents is null or void \" + resource2.getContents().toString(), resource2.getContents() != null && resource2.getContents().size()!=0);");

                    pr.println("}");//END FOR
                    pr.println("}catch (URISyntaxException e) {e.printStackTrace();} catch (IOException e) {e.printStackTrace();}");
                    pr.println("}");
                    pr.println("");

                }
            }

            pr.println("");
            pr.println("@Test");
            pr.println("public void launcherTest() {");
            pr.println("Runner runner = new Runner();");
            pr.println("runner.run("+metamodelName+"CaliperTest.class.getName(), \"--measurementType\", \"MEMORY\", \"--timeUnit\",\"ms\", \"-Jmemory=-Xmx8192m\", \"--saveResults\", \"./benchmarkResults/\");");//"--timeUnit","ms","-Dsize","5,10,50,100,200,500","--printScore");");
            //pr.println("Runner.main(" + metamodelName + "CaliperTest.class, new String[0]);");
            pr.println("}");
            pr.println("");
            pr.println("}"); // END CLASS


            pr.flush();
            pr.close();


        } catch (FileNotFoundException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

    }


}

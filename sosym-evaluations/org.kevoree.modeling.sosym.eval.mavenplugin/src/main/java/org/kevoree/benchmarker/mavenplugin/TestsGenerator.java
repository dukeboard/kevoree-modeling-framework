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
package org.kevoree.benchmarker.mavenplugin;/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 31/01/13
* (c) 2013 University of Luxembourg – Interdisciplinary Centre for Security Reliability and Trust (SnT)
* All rights reserved
*/

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.kevoree.modeling.kotlin.generator.GenerationContext;

import java.io.*;

public class TestsGenerator {


    public static void generateTests(File ecoreModel, GenerationContext ctx, String packagePrefix, File testsOutput, File projectRoot) throws MojoExecutionException {

        try {


            String metamodelName = ecoreModel.getName();
            metamodelName = metamodelName.substring(0,metamodelName.lastIndexOf("."));
            metamodelName = metamodelName.substring(0,1).toUpperCase() + metamodelName.substring(1);


            File generationFolder = new File(testsOutput.getAbsolutePath() + File.separator + "kmf" + File.separator + "org" + File.separator + "kevoree" + File.separator + "benchmarker");
            if(!generationFolder.exists()) {
                generationFolder.mkdirs();
            }

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


                    File testFile = new File(generationFolder.getAbsolutePath() + File.separator + metamodelName + modelName + "Test.java");
                    System.out.println("Generating test file " + testFile.getAbsolutePath());

                    PrintWriter pr = new PrintWriter(new FileOutputStream(testFile));

                    pr.println("package org.kevoree.benchmarker;");
                    pr.println("");
                    //pr.println("import com.google.caliper.runner.CaliperMain;");
                    //pr.println("import com.google.caliper.Runner;");
                    //pr.println("import com.google.caliper.SimpleBenchmark;");
                    pr.println("import java.io.*;");
                    pr.println("import java.net.URISyntaxException;");
                    pr.println("import java.util.Collections;");
                    pr.println("import java.util.Map;");
                    pr.println("");
                    pr.println("import org.eclipse.emf.ecore.EObject;");
                    pr.println("import org.eclipse.emf.common.util.URI;");
                    pr.println("import org.eclipse.emf.common.util.TreeIterator;");
                    pr.println("import org.eclipse.emf.ecore.resource.Resource;");
                    pr.println("import org.eclipse.emf.ecore.resource.ResourceSet;");
                    pr.println("import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;");
                    pr.println("import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;");
                    pr.println("import org.eclipse.emf.ecore.util.EcoreUtil;");

                    pr.println("import org.junit.Test;");
                    pr.println("import static org.junit.Assert.assertTrue;");
                    pr.println("");
                    pr.println("");
                    pr.println("public class "+ metamodelName + modelName + "Test {");// extends SimpleBenchmark {");
                    pr.println("");
                    pr.println("private Object kmfModel = null;");
                    pr.println("private EObject emfModel = null;");
                    pr.println("");
                    pr.println("");

                    generateSetUp(pr, ctx, model, modelName, ecoreModel, metamodelName);
                    generateLoadTest(pr, ctx, model, modelName, ecoreModel, metamodelName);
                    generateSaveTest(pr, ctx, model, modelName, ecoreModel, metamodelName);
                    generateCloneTest(pr, ctx, model, modelName, ecoreModel, metamodelName);
                    generateTestRunner(pr, ctx, modelName, metamodelName);
                    // load KMF
                    //generateKMFLoadTest(pr, ctx, model, modelName, ecoreModel, metamodelName);
                    // load EMF
                    //generateEMFLoadTest(pr, ctx, model, modelName, ecoreModel, metamodelName);

                    //Serialize KMF
                    //generateKMFSerializeTest(pr, ctx, model, modelName, ecoreModel, metamodelName);
                    //Serialize EMF
                    //generateEMFSerializeTest(pr, ctx, model, modelName, ecoreModel, metamodelName);

                    //Cloner KMF
                    //generateKMFClonerTest(pr, ctx, model, modelName, ecoreModel, metamodelName);
                    //Cloner EMF
                    //generateEMFClonerTest(pr, ctx, model, modelName, ecoreModel, metamodelName);
                    /*
                    pr.println("");
                    pr.println("@Test");
                    pr.println("public void launcherTest() {");
                    pr.println("Runner runner = new Runner();");
                    pr.println("runner.run("+ metamodelName + modelName + "CaliperTest.class.getName(), \"--measureMemory\", \"--printScore\", \"--timeUnit\",\"ns\", \"-Jmemory=-Xmx1024m\", \"--saveResults\", \"./benchmarkResults/\");");//"--timeUnit","ms","-Dsize","5,10,50,100,200,500","--printScore");");
                    //pr.println("Runner.main(" + metamodelName + "CaliperTest.class, new String[0]);");
                    pr.println("}");
                    pr.println("");

                    pr.println("");
                    pr.println("public static void main(String[] args) {");
                    pr.println("Runner runner = new Runner();");
                    pr.println("runner.run("+ metamodelName + modelName + "CaliperTest.class.getName(), \"--measureMemory\", \"--printScore\", \"--timeUnit\",\"ns\", \"-Jmemory=-Xmx1024m\", \"--saveResults\", \"./benchmarkResults/\");");//"--timeUnit","ms","-Dsize","5,10,50,100,200,500","--printScore");");
                    //pr.println("Runner.main(" + metamodelName + "CaliperTest.class, new String[0]);");
                    pr.println("}");
                    pr.println("");
                    */
                    pr.println("}"); // END CLASS


                    pr.flush();
                    pr.close();
                }
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

    }


    private static void generateTestRunner(PrintWriter pr, GenerationContext ctx, String modelName, String metamodelName) {
        VelocityEngine ve = new VelocityEngine();
        ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.init();
        Template template = ve.getTemplate("TestLauncherTemplate.vm");
        VelocityContext ctxV = new VelocityContext();
        ctxV.put("ProcessorHelper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass());
        ctxV.put("metamodelName", metamodelName);
        ctxV.put("modelName", modelName);
        ctxV.put("ctx", ctx);
        template.merge(ctxV, pr);
    }


    private static void generateSetUp(PrintWriter pr, GenerationContext ctx, File model, String modelName, File metamodel, String metamodelName) {
        VelocityEngine ve = new VelocityEngine();
        ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.init();
        Template template = ve.getTemplate("TestSetupTemplate.vm");
        VelocityContext ctxV = new VelocityContext();
        ctxV.put("ProcessorHelper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass());
        ctxV.put("metamodelName", metamodelName);
        ctxV.put("model", model);
        ctxV.put("modelName", modelName);
        ctxV.put("ctx", ctx);
        template.merge(ctxV, pr);
/*
        pr.println("public void setUp() {");
        pr.println("try {");

        pr.println("File localModel = new File(getClass().getResource(\"/" + metamodelName.toLowerCase() + "/" + model.getName()+"\").toURI());");
        pr.println(basePackage + ".loader.ModelLoader loader = new " + basePackage + ".loader.ModelLoader();");
        pr.println("kmfModel = loader.loadModelFromPath(localModel).get(0);");

        pr.println("URI fileURI = URI.createFileURI(localModel.getAbsolutePath());");
        pr.println("ResourceSet resourceSet = new ResourceSetImpl();");
        pr.println("resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());");

        String packageName = basePackage.substring(basePackage.lastIndexOf(".")+1);
        packageName = packageName.substring(0,1).toUpperCase() + packageName.substring(1).toLowerCase();
        pr.println(basePackage.replaceFirst("kmf","emf") + "."+packageName+"Package pack = " + basePackage.replaceFirst("kmf","emf") + "."+packageName+"Package.eINSTANCE;");

        pr.println("Resource resource2 = resourceSet.createResource(fileURI);");
        pr.println("assertTrue(\"Resource is null. Model URI:\" + fileURI.toString(), resource2 != null);");
        pr.println("resource2.load(null);");
        pr.println("EcoreUtil.resolveAll(resource2);");
        pr.println("assertTrue(\"Contents is null or void \" + resource2.getContents().toString(), resource2.getContents() != null && resource2.getContents().size()!=0);");
        pr.println("emfModel = resource2.getContents().get(0);");
        pr.println("}catch (URISyntaxException e) {e.printStackTrace();} catch (IOException e) {e.printStackTrace();}");
        pr.println("}");
*/
    }

    private static void generateLoadTest(PrintWriter pr, GenerationContext ctx, File model, String modelName, File metamodel, String metamodelName) {
    VelocityEngine ve = new VelocityEngine();
    ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
    ve.init();
    Template template = ve.getTemplate("TestLoadTemplate.vm");
    VelocityContext ctxV = new VelocityContext();
    ctxV.put("ProcessorHelper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass());
    ctxV.put("metamodelName", metamodelName);
    ctxV.put("model", model);
        ctxV.put("modelName", modelName);
    ctxV.put("ctx", ctx);
    template.merge(ctxV, pr);
    }

    private static void generateSaveTest(PrintWriter pr, GenerationContext ctx, File model, String modelName, File metamodel, String metamodelName) {
        VelocityEngine ve = new VelocityEngine();
        ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.init();
        Template template = ve.getTemplate("TestSaveTemplate.vm");
        VelocityContext ctxV = new VelocityContext();
        ctxV.put("ProcessorHelper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass());
        ctxV.put("metamodelName", metamodelName);
        ctxV.put("model", model);
        ctxV.put("modelName", modelName);
        ctxV.put("ctx", ctx);
        template.merge(ctxV, pr);

    }

    private static void generateCloneTest(PrintWriter pr, GenerationContext ctx, File model, String modelName, File metamodel, String metamodelName) {
        VelocityEngine ve = new VelocityEngine();
        ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.init();
        Template template = ve.getTemplate("TestCloneTemplate.vm");
        VelocityContext ctxV = new VelocityContext();
        ctxV.put("ProcessorHelper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass());
        ctxV.put("metamodelName", metamodelName);
        ctxV.put("model", model);
        ctxV.put("modelName", modelName);
        ctxV.put("ctx", ctx);
        template.merge(ctxV, pr);
    }
/*

    private static void generateKMFLoadTest(PrintWriter pr, GenerationContext ctx, File model, String modelName, File metamodel, String metamodelName) {
        pr.println("");
        pr.println("public void timeKMFLoad"+modelName+"(int reps) {");
        pr.println("try {");
        pr.println("File localModel = new File(getClass().getResource(\"/" + metamodelName.toLowerCase() + "/" + model.getName()+"\").toURI());");
        pr.println(basePackage+".loader.ModelLoader loader = new "+basePackage+".loader.ModelLoader();");
        pr.println("for(int i = 0 ; i < reps ; i++) {");
        pr.println("kmfModel = loader.loadModelFromPath(localModel);");
        pr.println("}");//END FOR
        pr.println("}catch (URISyntaxException e) {e.printStackTrace();}");
        pr.println("}");
        pr.println("");
    }


    private static void generateKMFSerializeTest(PrintWriter pr, GenerationContext ctx, File model, String modelName, File metamodel, String metamodelName) {
        pr.println("");
        pr.println("public void timeKMFSave"+modelName+"(int reps) {");
        pr.println("try {");
        pr.println(basePackage+".serializer.ModelSerializer serializer = new "+basePackage+".serializer.ModelSerializer();");

        pr.println("for(int i = 0 ; i < reps ; i++) {");
        pr.println("FileOutputStream fos = new FileOutputStream(File.createTempFile(\"\"+System.currentTimeMillis(),\".tmp\"));");
        pr.println("serializer.serialize(kmfModel, fos);");
        pr.println("fos.flush();");
        pr.println("fos.close();");
        pr.println("}");//END FOR
        pr.println("}catch (IOException e) {e.printStackTrace();}");
        pr.println("}");
        pr.println("");
    }

    private static void generateKMFClonerTest(PrintWriter pr, GenerationContext ctx, File model, String modelName, File metamodel, String metamodelName) {
        pr.println("");
        pr.println("public void timeKMFClone"+modelName+"(int reps) {");
        //pr.println("Object clone = null;");
        pr.println("for(int i = 0 ; i < reps ; i++) {");
        pr.println(basePackage+".cloner.ModelCloner cloner = new "+basePackage+".cloner.ModelCloner();");
        //pr.println("if( clone != null) {");
        //pr.println("clone = cloner.clone(clone, false);");
        //pr.println("} else {");
        //pr.println("clone = cloner.clone(kmfModel, false);");
        pr.println("cloner.clone(kmfModel);");
        //pr.println("}");
        pr.println("}");//END FOR
        pr.println("}");
        pr.println("");
    }

    private static void generateEMFLoadTest(PrintWriter pr, GenerationContext ctx, File model, String modelName, File metamodel, String metamodelName) {
        pr.println("");
        pr.println("public void timeEMFLoad"+modelName+"(int reps) {");
        pr.println("try {");
        pr.println("File localModel = new File(getClass().getResource(\"/" + metamodelName.toLowerCase() + "/" + model.getName()+"\").toURI());");
        pr.println("URI fileURI = URI.createFileURI(localModel.getAbsolutePath());");

        String packageName = basePackage.substring(basePackage.lastIndexOf(".")+1);
        packageName = packageName.substring(0,1).toUpperCase() + packageName.substring(1).toLowerCase();
        pr.println(basePackage.replaceFirst("kmf","emf") + "."+packageName+"Package pack = " + basePackage.replaceFirst("kmf","emf") + "."+packageName+"Package.eINSTANCE;");

        pr.println("for(int i = 0 ; i < reps ; i++) {");
        pr.println("ResourceSet resourceSet = new ResourceSetImpl();");
        pr.println("resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());");
        pr.println("Resource resource2 = resourceSet.createResource(fileURI);");
        pr.println("assertTrue(\"Resource is null. Model URI:\" + fileURI.toString(), resource2 != null);");
        pr.println("resource2.load(null);");
        pr.println("EcoreUtil.resolveAll(resource2);");
        pr.println("assertTrue(\"Contents is null or void \" + resource2.getContents().toString(), resource2.getContents() != null && resource2.getContents().size()!=0);");
        pr.println("}");//END FOR
        //pr.println("emfModel = resource2.getContents().get(0);");
        pr.println("}catch (URISyntaxException e) {e.printStackTrace();} catch (IOException e) {e.printStackTrace();}");
        pr.println("}");
        pr.println("");
    }


    private static void generateEMFSerializeTest(PrintWriter pr, GenerationContext ctx, File model, String modelName, File metamodel, String metamodelName) {
//
        pr.println("");
        pr.println("public void timeEMFSave"+modelName+"(int reps) {");
        pr.println("try {");
        pr.println("Resource.Factory.Registry reg = Resource.Factory.Registry.INSTANCE;");
        pr.println("Map<String, Object> m = reg.getExtensionToFactoryMap();");
        pr.println("m.put(\"xmi\", new XMIResourceFactoryImpl());");

        pr.println("for(int i = 0 ; i < reps ; i++) {");
        pr.println("File localModel = File.createTempFile(\"\"+System.currentTimeMillis(),\".xmi\");");
        pr.println("URI fileURI = URI.createFileURI(localModel.getAbsolutePath());");
        pr.println("ResourceSet resourceSet = new ResourceSetImpl();");
        pr.println("Resource resource2 = resourceSet.createResource(fileURI);");
        pr.println("resource2.getContents().add(emfModel);");
        pr.println("resource2.save(Collections.EMPTY_MAP);");
        pr.println("}");//END FOR
        pr.println("}catch (IOException e) {e.printStackTrace();}");
        pr.println("}");
        pr.println("");
    }

    private static void generateEMFClonerTest(PrintWriter pr, GenerationContext ctx, File model, String modelName, File metamodel, String metamodelName) {

        //

        pr.println("");
        pr.println("public void timeEMFClone"+modelName+"(int reps) {");
        pr.println("for(int i = 0 ; i < reps ; i++) {");
        pr.println("EcoreUtil.copy(emfModel);");
        pr.println("}");//END FOR
        pr.println("}");
        pr.println("");

    }
    */
}

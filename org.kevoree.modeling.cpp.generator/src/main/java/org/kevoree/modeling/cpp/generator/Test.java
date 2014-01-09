package org.kevoree.modeling.cpp.generator;

import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 15/11/13
 * Time: 16:18
 * To change this template use File | Settings | File Templates.
 */
public class Test {

    public static void main(String args[]) throws Exception {

        GenerationContext context = new GenerationContext();
        context.setRootGenerationDirectory("/home/jed/KEVOREE_PROJECT/kevoree-cpp/kevoree-core/model");
        context.setEcore("/home/jed/KEVOREE_PROJECT/kevoree-cpp/kevoree-core/model/metamodel/kevoree.ecore");
        context.setDebug_model(false);
        context.setVersion("1.0");
        context.setVersionmicroframework("1.3-SNAPSHOT");



        GenerationContext context2 = new GenerationContext();
        context2.setRootGenerationDirectory("/tmp/model/");
        context2.setEcore("/home/jed/KEVOREE_PROJECT/kevoree-modeling-framework/org.kevoree.modeling.cpp.generator/src/main/resources/metamodel/kevoree.adaptation.ecore");
        context2.setDebug_model(false);
        context2.setVersion("1.0");
        context2.setVersionmicroframework("1.3-SNAPSHOT");



        Generator gen = new Generator(context);
        //gen.generateModel();



        Generator gen2 = new Generator(context2);
        gen2.generateModel();
        //gen2.generateEnvironnement();
    }
}

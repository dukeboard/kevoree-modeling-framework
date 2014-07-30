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
        context.setVersionmicroframework("1.3.2");


        Generator gen = new Generator(context);
        gen.generateModel();
   // gen.generateEnvironnement();





    }
}

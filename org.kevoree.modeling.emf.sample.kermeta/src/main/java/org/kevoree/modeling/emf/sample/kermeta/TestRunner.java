package org.kevoree.modeling.emf.sample.kermeta;

import org.loader.ModelLoader;

import java.io.File;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 1/24/13
 * Time: 3:31 PM
 */
public class TestRunner {

    public static void main(String[] args){

        System.out.println("Loader !!!");

        ModelLoader loader = new ModelLoader();
        System.out.println(loader.loadModelFromPath(new File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/org.kevoree.modeling.emf.sample.kermeta/src/main/resources/class2rdbms_beforeCheckingforScopeMERGED.km")));

    }

}

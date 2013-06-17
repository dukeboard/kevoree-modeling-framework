package org.ecore.tester;

import kmf.ecore.loader.XMIModelLoader;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 17/06/13
 * Time: 18:38
 */
public class Tester {

    public static void main(String[] args) {

        XMIModelLoader loader = new XMIModelLoader();
        loader.loadModelFromStream(Tester.class.getClassLoader().getResourceAsStream("kevoree.ecore"));


    }

}

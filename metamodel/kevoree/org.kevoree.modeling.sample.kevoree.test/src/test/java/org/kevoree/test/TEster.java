package org.kevoree.test;

import org.kevoree.modeling.api.KMFContainer;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 13:26
 */
public class TEster {

      public static void main(String[] args) throws FileNotFoundException {

          KMFContainer model = (KMFContainer) new org.kevoree.loader.JSONModelLoader().loadModelFromStream(new FileInputStream(new File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/kevoree/org.kevoree.modeling.sample.kevoree.test/src/test/resources/model1.json"))).get(0);

          JSONModelSerializer saver = new JSONModelSerializer();
          saver.serialize(model,System.out);

         // saver.serialize(model,new FileOutputStream(new File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/kevoree/org.kevoree.modeling.sample.kevoree.test/src/test/resources/temp.json")));

         // KMFContainer model2 = new JSONModelLoader().loadModelFromStream(new FileInputStream(new File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/kevoree/org.kevoree.modeling.sample.kevoree.test/src/test/resources/temp.json"))).get(0);

          //saver.serialize(model2,System.out);


      }

}

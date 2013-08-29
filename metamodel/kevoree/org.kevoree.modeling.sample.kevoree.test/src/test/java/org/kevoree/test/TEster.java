package org.kevoree.test;

import org.kevoree.modeling.api.KMFContainer;

import java.io.*;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 13:26
 */
public class TEster {

      public static void main(String[] args) throws IOException {

          org.kevoree.loader.JSONModelLoader previousLoader = new org.kevoree.loader.JSONModelLoader();

          //hotLoad
          long before = System.currentTimeMillis();
          previousLoader.loadModelFromStream(new FileInputStream(new File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/kevoree/org.kevoree.modeling.sample.kevoree.test/src/test/resources/model1.json"))).get(0);
          System.out.println(System.currentTimeMillis()-before);

          before = System.currentTimeMillis();
          KMFContainer model = (KMFContainer) previousLoader.loadModelFromStream(new FileInputStream(new File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/kevoree/org.kevoree.modeling.sample.kevoree.test/src/test/resources/model1.json"))).get(0);
          System.out.println(System.currentTimeMillis()-before);

          JSONModelSerializer saver = new JSONModelSerializer();
          ByteArrayOutputStream out = new ByteArrayOutputStream();
          saver.serialize(model, out);
          out.close();

          FileOutputStream oo = new FileOutputStream(new File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/kevoree/org.kevoree.modeling.sample.kevoree.test/src/test/resources/temp.json"));
          saver.serialize(model,oo);
          oo.close();

          JSONModelLoader loader = new JSONModelLoader();
          before = System.currentTimeMillis();
          KMFContainer model3 = loader.loadModelFromStream(new FileInputStream(new File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/kevoree/org.kevoree.modeling.sample.kevoree.test/src/test/resources/temp.json"))).get(0);
          System.out.println("v2="+(System.currentTimeMillis()-before));

          before = System.currentTimeMillis();
          KMFContainer model4 = loader.loadModelFromStream(new FileInputStream(new File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/kevoree/org.kevoree.modeling.sample.kevoree.test/src/test/resources/temp.json"))).get(0);
          System.out.println("v2="+(System.currentTimeMillis()-before));


          System.out.println(model.modelEquals(model4));


      }

}

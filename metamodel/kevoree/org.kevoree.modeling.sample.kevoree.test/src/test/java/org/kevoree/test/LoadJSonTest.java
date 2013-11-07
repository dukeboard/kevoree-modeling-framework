package org.kevoree.test;

import org.junit.Test;
import org.kevoree.loader.JSONModelLoader;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/11/2013
 * Time: 09:20
 */
public class LoadJSonTest {

    JSONModelLoader loader = new JSONModelLoader();

    @Test
    public void bench() {

        loader.loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("jedModel.json"));

        //end warmup

        int nbLoad = 100;
        long timeAvg = 0;

        for(int i=0;i<nbLoad;i++){
            long before = System.currentTimeMillis();
            loader.loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("jedModel.json"));
            long after = System.currentTimeMillis();
            timeAvg = timeAvg + (after-before);
        }

        System.out.println(timeAvg / nbLoad);

    }

}

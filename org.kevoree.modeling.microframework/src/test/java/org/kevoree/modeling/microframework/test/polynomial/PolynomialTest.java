package org.kevoree.modeling.microframework.test.polynomial;

import org.junit.Test;

import java.util.Random;
import java.util.TreeMap;

/**
 * Created by duke on 10/28/14.
 */
public class PolynomialTest {

    @Test
    public void test() {
        TreeMap<Long, Double> testVal = new TreeMap<Long, Double>();
        Random rand = new Random();
        int degradeFactor = 1;
        double toleratedError = 0.001;
        int maxDegree = 20;
        long starttime;
        long endtime;
        double res;

        PolynomialModel pm = new PolynomialModel(degradeFactor,toleratedError,maxDegree);

        Long l;
        Double d;
        long initTimeStamp=0;
        long finalTimeStamp = 1000000;

        for(long i=initTimeStamp; i<finalTimeStamp;i++){
            l= new Long(i);
            d= new Double (rand.nextDouble());
            testVal.put(l,d);
            pm.feed(l,d);
        }
        pm.finalSave();

        starttime = System.nanoTime();
        StatClass sc = pm.displayStatistics(true);
        endtime = System.nanoTime();
        res=((double)(endtime-starttime))/(1000000);
        System.out.println("Statistic calculated in: "+res+" ms!");

        //Replace by assert
        System.out.println("Max error respected: " +String.valueOf(sc.maxErr<toleratedError));

        starttime = System.nanoTime();
        for(long i=initTimeStamp; i<finalTimeStamp;i+=degradeFactor){
            double val = pm.reconstruct(i);
        }
        endtime = System.nanoTime();
        res=((double)(endtime-starttime))/(1000000);
        System.out.println("Polynomial chain reconstructed in: "+res+" ms!");


        starttime = System.nanoTime();
        for(long i=initTimeStamp; i<finalTimeStamp;i+=degradeFactor){
            double val = pm.fastReconstruct(i);
        }
        endtime = System.nanoTime();
        res=((double)(endtime-starttime))/(1000000);
        System.out.println("Polynomial fast reconstructed in: "+res+" ms!");


        starttime = System.nanoTime();
        for(long i=initTimeStamp; i<finalTimeStamp;i+=degradeFactor){
            double val = testVal.get(testVal.floorKey(i));
        }
        endtime = System.nanoTime();
        res=((double)(endtime-starttime))/(1000000);
        System.out.println("normal chain in: "+res+" ms!");
    }

}

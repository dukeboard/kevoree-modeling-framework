package org.kevoree.test;

import org.junit.Test;
import org.kevoree.compare.DefaultModelCompare;
import org.kevoree.loader.JSONModelLoader;
import org.kevoree.modeling.api.KMFContainer;
import org.kevoree.modeling.api.compare.ModelCompare;
import org.kevoree.modeling.api.trace.TraceSequence;

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

        ModelCompare compare  = new DefaultModelCompare();
        long before = System.currentTimeMillis();
        KMFContainer root =   loader.loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("jedModel.json")).get(0);
        KMFContainer root2 =  loader.loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("jedModel2.json")).get(0);

        long after = System.currentTimeMillis();


        System.out.println(after - before);
        before = System.currentTimeMillis();
        TraceSequence sequence =  compare.merge(root,root2);
        after = System.currentTimeMillis();
        System.out.println(after - before);


        System.out.println(sequence.exportToString());
    }



}

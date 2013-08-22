package org.kevoree.test;

import org.junit.Test;
import org.kevoree.ContainerRoot;
import org.kevoree.compare.DefaultModelCompare;
import org.kevoree.loader.JSONModelLoader;
import org.kevoree.modeling.api.compare.ModelCompare;
import org.kevoree.modeling.api.trace.TraceSequence;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 22/08/13
 * Time: 10:28
 */
public class ModelMergeTest {

    @Test
    public void doTest() {
        System.out.println("Merger test");

        JSONModelLoader loader = new JSONModelLoader();
        ContainerRoot model1 = (ContainerRoot) loader.loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("model1.json")).get(0);
        ContainerRoot model2 = (ContainerRoot) loader.loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("model2.json")).get(0);
        ModelCompare compare = new DefaultModelCompare();
        TraceSequence seq = compare.merge(model1, model2);
        seq.applyOn(model1);
    }

    @Test
    public void doTest2() {
        System.out.println("Migration test");
        JSONModelLoader loader = new JSONModelLoader();
        ContainerRoot model1 = (ContainerRoot) loader.loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("model1.json")).get(0);
        ContainerRoot model2 = (ContainerRoot) loader.loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("model2.json")).get(0);
        ModelCompare compare = new DefaultModelCompare();
        TraceSequence seq = compare.diff(model1, model2);
        seq.applyOn(model1);
    }

}

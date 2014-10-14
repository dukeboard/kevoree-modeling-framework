package org.kevoree.modeling.generator.test;

import org.junit.Test;
import org.kevoree.modeling.generator.GenerationContext;
import org.kevoree.modeling.generator.Generator;

import java.io.File;

/**
 * Created by gregory.nain on 14/10/2014.
 */
public class CloudGenTest {

    public static void main(String[] args) {
        (new CloudGenTest()).run();
    }

    @Test
    public void run() {

        try {
            GenerationContext ctx = new GenerationContext();
            ctx.metaModel = new File(getClass().getClassLoader().getResource("Cloud.mm").toURI());
            ctx.metaModelName = "Cloud";
            ctx.utilityPackage = "org.kevoree.cloud";

            ctx.kmfSrcGenerationDirectory = new File(ctx.metaModel.getParentFile().getParent() + File.separator + "generated-kmf-test");

            ctx.projectVersion = "#.#.#-SNAPSHOT";
            //ctx.XXXXX = project.getCompileClasspathElements()


            Generator generator = new Generator();
            generator.execute(ctx);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}

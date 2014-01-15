package org.kevoree.modeling.kotlin.generator;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

/**
 * Created by duke on 09/01/2014.
 */
public class LoaderGenerator {

    private GenerationContext ctx;

    public LoaderGenerator(GenerationContext ctx) {
        this.ctx = ctx;
    }

    public void generateJSONLoader() throws FileNotFoundException, UnsupportedEncodingException {
        String loaderGenBaseDir = ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "loader";
        ProcessorHelper.checkOrCreateFolder(loaderGenBaseDir);
        File localFile = new File(loaderGenBaseDir + "/JSONModelLoader.kt");
        PrintWriter pr = new PrintWriter(localFile, "utf-8");
        pr.println("package " + ProcessorHelper.fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".loader");
        pr.println("class JSONModelLoader : org.kevoree.modeling.api.json.JSONModelLoader() {");
        pr.println("override var factory : org.kevoree.modeling.api.KMFFactory? = " + ProcessorHelper.fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".factory.MainFactory()");
        pr.println("}");
        pr.flush();
        pr.close();
    }

    public void generateXMILoader() throws FileNotFoundException, UnsupportedEncodingException {
        String loaderGenBaseDir = ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "loader";
        ProcessorHelper.checkOrCreateFolder(loaderGenBaseDir);
        File localFile = new File(loaderGenBaseDir + "/XMIModelLoader.kt");
        PrintWriter pr = new PrintWriter(localFile, "utf-8");
        pr.println("package " + ProcessorHelper.fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".loader");
        pr.println("class XMIModelLoader : org.kevoree.modeling.api.xmi.XMIModelLoader() {");
        pr.println("override var factory : org.kevoree.modeling.api.KMFFactory? = " + ProcessorHelper.fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".factory.MainFactory()");
        pr.println("}");
        pr.flush();
        pr.close();
    }

}

package org.kevoree.modeling.kotlin.generator;

import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

/**
 * Created by duke on 09/01/2014.
 */
public class SerialiserGenerator {

    private GenerationContext ctx;

    public SerialiserGenerator(GenerationContext ctx) {
        this.ctx = ctx;
    }

    public void generateXmiSerializer() throws FileNotFoundException, UnsupportedEncodingException {
        String serializerGenBaseDir = ctx.baseLocationForUtilitiesGeneration.getAbsolutePath() + File.separator + "serializer" + File.separator;
        ProcessorHelper.checkOrCreateFolder(serializerGenBaseDir);
        File genFile = new File(serializerGenBaseDir + "XMIModelSerializer.kt");
        PrintWriter pr = new PrintWriter(genFile, "utf-8");
        pr.println("package " + ProcessorHelper.fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".serializer");
        pr.println("class XMIModelSerializer : org.kevoree.modeling.api.xmi.XMIModelSerializer() {");
        pr.println("}");
        pr.flush();
        pr.close();
    }

    public void generateJsonSerializer() throws FileNotFoundException, UnsupportedEncodingException {
        String serializerGenBaseDir = ctx.baseLocationForUtilitiesGeneration.getAbsolutePath() + File.separator + "serializer" + File.separator;
        ProcessorHelper.checkOrCreateFolder(serializerGenBaseDir);
        File genFile = new File(serializerGenBaseDir + "JSONModelSerializer.kt");
        PrintWriter pr = new PrintWriter(genFile, "utf-8");
        pr.println("package " + ProcessorHelper.fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".serializer");
        pr.println("class JSONModelSerializer : org.kevoree.modeling.api.json.JSONModelSerializer() {");
        pr.println("}");
        pr.flush();
        pr.close();
    }


}

package org.kevoree.modeling.kotlin.generator.model;


import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.eclipse.emf.ecore.EClass;
import org.kevoree.modeling.VelocityLog;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.PrintWriter;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 14:17
 */
public class ContainedElementsGenerator {

    public static void generateContainedElementsMethods(PrintWriter pr, EClass cls, GenerationContext ctx) {

        VelocityEngine ve = new VelocityEngine();
        ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

        ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.init();
        Template template = ve.getTemplate("templates/VisitMethods.vm");
        VelocityContext ctxV = new VelocityContext();
        ctxV.put("ctx", ctx);
        ctxV.put("currentClass", cls);
        ctxV.put("FQNHelper", ProcessorHelper.getInstance());
        ctxV.put("packElem",ctx.basePackageForUtilitiesGeneration + ".util");

        template.merge(ctxV, pr);
    }

}


package org.kevoree.modeling.kotlin.generator.model;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EClassifier;
import org.eclipse.emf.ecore.EReference;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.kevoree.modeling.VelocityLog;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 30/07/13
*/
public class ConstantsGenerator {


    public static void generateConstants(GenerationContext ctx, ResourceSet model) {

        HashMap<String, String> names = new HashMap<String, String>();

        Iterator<Notifier> iterator = model.getAllContents();
        while(iterator.hasNext()) {
            Notifier elm = iterator.next();
            if(elm instanceof EClassifier) {
                EClassifier cls = (EClassifier)elm;
                /*
                if(!names.containsValue(cls.getName())) {
                    names.put("CN_"+cls.getName(), cls.getName());
                }
                */
                names.put(ProcessorHelper.getInstance().fqn(ctx, cls), ProcessorHelper.getInstance().fqn(ctx, cls));
                if(cls instanceof EClass) {

                    for(EAttribute att : ((EClass)cls).getEAttributes()) {
                        if(!names.containsKey("Att_"+att.getName())){
                            names.put("Att_"+att.getName(), att.getName());
                        }
                    }

                    for(EReference ref : ((EClass)cls).getEReferences()) {
                        if(!names.containsKey("Ref_"+ref.getName())){
                            names.put("Ref_"+ref.getName(), ref.getName());
                        }
                    }

                }
            }
        }

        ProcessorHelper.getInstance().checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "util" + File.separator);
        File localFile = new File(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator +"util"+File.separator+"Constants.kt");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("/templates/util/ConstGenerator.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("ctx", ctx);
            ctxV.put("FQNHelper",ProcessorHelper.getInstance());
            ctxV.put("names", names);
            template.merge(ctxV, pr);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } finally {
            if(pr != null) {
                pr.flush();
                pr.close();
            }
        }


    }


}

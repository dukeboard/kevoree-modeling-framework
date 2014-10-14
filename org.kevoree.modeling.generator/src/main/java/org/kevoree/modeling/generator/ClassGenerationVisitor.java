package org.kevoree.modeling.generator;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling.generator.misc.VelocityLog;
import org.kevoree.modeling.idea.psi.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

/**
 * Created by gregory.nain on 14/10/2014.
 */
public class ClassGenerationVisitor extends MetaModelVisitor {

    private GenerationContext context;

    public ClassGenerationVisitor(GenerationContext context) {
        this.context = context;
    }

    @Override
    public void visitDeclaration(@NotNull MetaModelDeclaration o) {
        o.acceptChildren(this);

    }

    @Override
    public void visitClassDeclaration(@NotNull MetaModelClassDeclaration o) {

        ClassGenerationContext cgc = new ClassGenerationContext();
        cgc.generationContext = context;
        cgc.classPackage = o.getTypeDeclaration().getName().substring(0, o.getTypeDeclaration().getName().lastIndexOf("."));
        cgc.classFqn = o.getTypeDeclaration().getName();
        cgc.className = o.getTypeDeclaration().getName().substring(o.getTypeDeclaration().getName().lastIndexOf(".")+1);
        cgc.delarationsList = context.classDeclarationsList.get(o.getTypeDeclaration().getName());


        ProcessorHelper.getInstance().checkOrCreateFolder(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + cgc.classPackage.replace(".", File.separator));
        File localFile = new File(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + o.getTypeDeclaration().getName().replace(".", File.separator) + ".java");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("vTemplates/ClassTemplate.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("context", cgc);
            ctxV.put("FQNHelper",ProcessorHelper.getInstance());
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

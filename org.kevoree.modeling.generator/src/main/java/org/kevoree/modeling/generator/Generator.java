package org.kevoree.modeling.generator;

import com.intellij.psi.PsiFile;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.kevoree.modeling.MetaModelLanguageType;
import org.kevoree.modeling.generator.misc.VelocityLog;
import org.kevoree.modeling.util.StandaloneParser;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

public class Generator {

    private GenerationContext context;

    public void execute(GenerationContext context) throws Exception{
        this.context = context;

        if (!context.metaModel.exists()) {
            throw new Exception("Input file not found at: " + context.metaModel.getAbsolutePath() + " ! Generation aborted");
        }

        if (!context.metaModel.getAbsolutePath().endsWith(MetaModelLanguageType.DEFAULT_EXTENSION)) {
            throw new UnsupportedOperationException("Only *.mm files are currently supported.");
        }


        File output = context.kmfSrcGenerationDirectory;
        deleteDirectory(output);
        output.mkdirs();

        try {

            StandaloneParser parser = new StandaloneParser();
            PsiFile psi = parser.parser(context.metaModel);

            System.out.println("Indexing Enums");
            psi.acceptChildren(new EnumIndexesVisitor(context));
            ProcessorHelper.getInstance().consolidateEnumIndexes(context.classDeclarationsList);

            generateUtilities();

            System.out.println("Generating Classes");

            context.classDeclarationsList.values().forEach(classDecl-> {
                ClassGenerationContext cgc = new ClassGenerationContext();
                cgc.generationContext = context;
                cgc.classDeclaration = context.classDeclarationsList.get(classDecl.getFqn());


                ProcessorHelper.getInstance().checkOrCreateFolder(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + cgc.classDeclaration.getPack().replace(".", File.separator));
                File localFile = new File(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + cgc.classDeclaration.getFqn().replace(".", File.separator) + ".java");
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

                ProcessorHelper.getInstance().checkOrCreateFolder(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + cgc.classDeclaration.getPack().replace(".", File.separator) + File.separator + "impl");
                File implFile = new File(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + cgc.classDeclaration.getPack().replace(".", File.separator) + File.separator + "impl" + File.separator + cgc.classDeclaration.getName() + "Impl.java");
                PrintWriter implPr = null;
                try {
                    implPr = new PrintWriter(implFile, "utf-8");
                    VelocityEngine ve = new VelocityEngine();
                    ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

                    ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
                    ve.init();
                    Template template = ve.getTemplate("vTemplates/ClassImplTemplate.vm");
                    VelocityContext ctxV = new VelocityContext();
                    ctxV.put("context", cgc);
                    ctxV.put("FQNHelper",ProcessorHelper.getInstance());
                    template.merge(ctxV, implPr);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                } finally {
                    if(implPr != null) {
                        implPr.flush();
                        implPr.close();
                    }
                }
            });


        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void generateUtilities() {
        generateUniverse();
        generateDimension();
        generateView();
    }

    private void generateUniverse() {
        ProcessorHelper.getInstance().checkOrCreateFolder(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + context.utilityPackage.replace(".", File.separator));
        File localFile = new File(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + context.utilityPackage.replace(".", File.separator) + File.separator + context.getMetaModelName() + "Universe.java");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("vTemplates/UniverseTemplate.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("context", context);
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

    private void generateDimension() {
        ProcessorHelper.getInstance().checkOrCreateFolder(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + context.utilityPackage.replace(".", File.separator));
        File localFile = new File(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + context.utilityPackage.replace(".", File.separator) + File.separator + context.getMetaModelName() + "Dimension.java");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("vTemplates/DimensionTemplate.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("context", context);
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

    private void generateView() {
        ProcessorHelper.getInstance().checkOrCreateFolder(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + context.utilityPackage.replace(".", File.separator));
        File localFile = new File(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + context.utilityPackage.replace(".", File.separator) + File.separator + context.getMetaModelName() + "View.java");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("vTemplates/ViewTemplate.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("context", context);
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


        generateViewImpl();

    }


    private void generateViewImpl() {
        ProcessorHelper.getInstance().checkOrCreateFolder(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + context.utilityPackage.replace(".", File.separator) + File.separator + "impl");
        File localFile = new File(context.kmfSrcGenerationDirectory.getAbsolutePath() + File.separator + context.utilityPackage.replace(".", File.separator) + File.separator + "impl" + File.separator + context.getMetaModelName() + "ViewImpl.java");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("vTemplates/ViewImplTemplate.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("context", context);
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

    private boolean deleteDirectory(File path) {
        if (path.exists()) {
            File[] files = path.listFiles();
            for (int i = 0; i < files.length; i++) {
                if (files[i].isDirectory()) {
                    deleteDirectory(files[i]);
                } else {
                    files[i].delete();
                }
            }
        }
        return (path.delete());
    }

}
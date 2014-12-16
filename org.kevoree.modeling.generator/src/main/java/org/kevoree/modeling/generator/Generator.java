package org.kevoree.modeling.generator;

import com.intellij.psi.PsiFile;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.kevoree.modeling.MetaModelLanguageType;
import org.kevoree.modeling.ast.MModelClass;
import org.kevoree.modeling.ast.MModelClassifier;
import org.kevoree.modeling.ast.MModelEnum;
import org.kevoree.modeling.generator.misc.VelocityLog;
import org.kevoree.modeling.util.StandaloneParser;

import java.io.*;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;

public class Generator {

    private GenerationContext context;

    public void execute(GenerationContext context) throws Exception {
        this.context = context;

        if (!context.getMetaModel().exists()) {
            throw new Exception("Input file not found at: " + context.getMetaModel().getAbsolutePath() + " ! Generation aborted");
        }

        if (!context.getMetaModel().getAbsolutePath().endsWith(MetaModelLanguageType.DEFAULT_EXTENSION)) {
            throw new UnsupportedOperationException("Only *.mm files are currently supported.");
        }

        File output = context.targetSrcDir;
        Files.walkFileTree(output.toPath(), new FileVisitor<Path>() {
            @Override
            public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                Files.delete(file);
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
                Files.delete(dir);
                return FileVisitResult.CONTINUE;
            }
        });
        Files.deleteIfExists(output.toPath());
        Files.createDirectories(output.toPath());

        try {
            StandaloneParser parser = new StandaloneParser();
            PsiFile psi = parser.parser(context.getMetaModel());
            MMPsiVisitor MMPsiVisitor = new MMPsiVisitor(context);
            psi.acceptChildren(MMPsiVisitor);
            ProcessorHelper.getInstance().consolidate(context.getModel());
            generateUtilities();
            for (MModelClassifier classDecl : context.getModel().getClassifiers()) {
                if(classDecl instanceof MModelClass) {
                    ClassGenerationContext cgc = new ClassGenerationContext();
                    cgc.generationContext = context;
                    cgc.classDeclaration = classDecl;

                    Path apiFilePath = Paths.get(context.targetSrcDir.getAbsolutePath() + File.separator + cgc.classDeclaration.getFqn().replace(".", File.separator) + ".java");
                    callVelocity(apiFilePath, "vTemplates/ClassTemplate.vm", cgc);

                    Path implFilePath = Paths.get(context.targetSrcDir.getAbsolutePath() + File.separator + cgc.classDeclaration.getPack().replace(".", File.separator) + File.separator + "impl" + File.separator + cgc.classDeclaration.getName() + "Impl.java");
                    callVelocity(implFilePath, "vTemplates/ClassImplTemplate.vm", cgc);

                    Path metaFilePath = Paths.get(context.targetSrcDir.getAbsolutePath() + File.separator + cgc.classDeclaration.getPack().replace(".", File.separator) + File.separator + "meta" + File.separator + "Meta" + cgc.classDeclaration.getName() + ".java");
                    callVelocity(metaFilePath, "vTemplates/MetaClassTemplate.vm", cgc);
                } else if(classDecl instanceof MModelEnum) {
                    //TODO: Enum generation
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void generateUtilities() {

        Path universeFilePath = Paths.get(context.targetSrcDir.getAbsolutePath() + File.separator + context.getMetaModelPackage().replace(".", File.separator) + File.separator + context.getMetaModelName() + "Universe.java");
        callVelocity(universeFilePath, "vTemplates/UniverseTemplate.vm", context);

        Path dimensionFilePath = Paths.get(context.targetSrcDir.getAbsolutePath() + File.separator + context.getMetaModelPackage().replace(".", File.separator) + File.separator + context.getMetaModelName() + "Dimension.java");
        callVelocity(dimensionFilePath, "vTemplates/DimensionTemplate.vm", context);

        Path viewFilePath = Paths.get(context.targetSrcDir.getAbsolutePath() + File.separator + context.getMetaModelPackage().replace(".", File.separator) + File.separator + context.getMetaModelName() + "View.java");
        callVelocity(viewFilePath, "vTemplates/ViewTemplate.vm", context);

        Path viewImplFilePath = Paths.get(context.targetSrcDir.getAbsolutePath() + File.separator + context.getMetaModelPackage().replace(".", File.separator) + File.separator + "impl" + File.separator + context.getMetaModelName() + "ViewImpl.java");
        callVelocity(viewImplFilePath, "vTemplates/ViewImplTemplate.vm", context);
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


    private void callVelocity(Path location, String templateRelativePath, Object context) {
        ProcessorHelper.getInstance().checkOrCreateFolder(location.getParent());
        File localFile = location.toFile();
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate(templateRelativePath);
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("context", context);
            template.merge(ctxV, pr);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (pr != null) {
                pr.flush();
                pr.close();
            }
        }
    }


}
package com.siliconmint.ts;

import com.intellij.core.JavaCoreApplicationEnvironment;
import com.intellij.core.JavaCoreProjectEnvironment;
import com.intellij.ide.highlighter.JavaFileType;
import com.intellij.lang.FileASTNode;
import com.intellij.mock.MockProject;
import com.intellij.openapi.Disposable;
import com.intellij.openapi.util.io.FileUtil;
import com.intellij.psi.PsiFile;
import com.intellij.psi.PsiFileFactory;
import com.intellij.psi.PsiJavaFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;

import static com.siliconmint.ts.util.FileUtil.*;

public class SourceTranslator {

  //private static final String baseDir = "extracted-parser/src";
  private static final String baseDir = "/Users/gregory.nain/Sources/KevoreeRepos/kevoree-modeling-framework/org.kevoree.modeling.microframework/src/main/java";
    private static final String outputDir = "/tmp/extracted-parser-ts";

  private PsiFileFactory psiFileFactory;

  public static void main(String[] args) throws IOException {
    SourceTranslator sourceTranslator = new SourceTranslator();
    sourceTranslator.translateSources(baseDir, outputDir);
  }

  public SourceTranslator() {
    this.psiFileFactory = createPsiFactory();
  }

  public void translateSources(String sourcePath, String outputPath) {
    File source = new File(sourcePath);
    File outputDir = new File(outputPath);

    if (outputDir.exists()) {
      if (outputDir.isFile()) {
        throw new IllegalArgumentException("Output path is not a directory");
      }
    } else {
      outputDir.mkdirs();
    }

    if (source.isDirectory()) {
      translateSourceDir(source, outputDir);
    } else {
      translateSourceFile(source, outputDir);
    }
  }

  private void translateSourceDir(File sourceDirectory, File outputDir) {
    File[] sourceFiles = sourceDirectory.listFiles(JAVA_SOURCE_FILE_FILTER);
    Arrays.sort(sourceFiles, FILE_NAME_COMPARATOR);
    for (File sourceFile : sourceFiles) {
      translateSourceFile(sourceFile, outputDir);
    }

    File[] sourceSubDirs = sourceDirectory.listFiles(DIRECTORY_FILTER);
    Arrays.sort(sourceSubDirs, FILE_NAME_COMPARATOR);
    for (File sourceSubDirectory : sourceSubDirs) {
      translateSourceDir(sourceSubDirectory, new File(outputDir, sourceSubDirectory.getName()));
    }
  }

  private void translateSourceFile(File sourceFile, File outputDir) {
    try {
      FileASTNode node = parseJavaSource(sourceFile, psiFileFactory);

      TypeScriptTranslator translator = new TypeScriptTranslator();
      translator.getCtx().setTranslatedFile(sourceFile);
      node.getPsi().accept(translator);

      if (!outputDir.exists()) {
        outputDir.mkdirs();
      }

      String fileName = sourceFile.getName();
      int extensionPosition = sourceFile.getName().lastIndexOf(".java");

      FileUtil.writeToFile(new File(outputDir, fileName.substring(0, extensionPosition).concat(".ts")), translator.getCtx().getText().getBytes());
      System.out.printf("Successfully translated %s\n", sourceFile.getAbsolutePath());
    } catch (IOException e) {
      System.err.printf("Failed to parse %s: %s\n", sourceFile.getAbsolutePath(), e.getMessage());
    } catch (Exception e) {
      System.err.printf("Failed to translate %s: %s\n", sourceFile.getAbsolutePath(), e.getMessage());
      throw new RuntimeException(e);
    }
  }

  private PsiFileFactory createPsiFactory() {
    MockProject mockProject = createProject();
    return PsiFileFactory.getInstance(mockProject);
  }

  private static FileASTNode parseJavaSource(File sourceFile, PsiFileFactory psiFileFactory) throws IOException {
    String javaSource = FileUtil.loadFile(sourceFile);
    PsiFile psiFile = psiFileFactory.createFileFromText(sourceFile.getName(), JavaFileType.INSTANCE, javaSource);
    PsiJavaFile psiJavaFile = (PsiJavaFile) psiFile;
    return psiJavaFile.getNode();
  }

  private static MockProject createProject() {
    JavaCoreProjectEnvironment environment = new JavaCoreProjectEnvironment(new Disposable() {
      @Override
      public void dispose() {
      }
    }, new JavaCoreApplicationEnvironment(new Disposable() {
      @Override
      public void dispose() {
      }
    }));

    return environment.getProject();
  }

}

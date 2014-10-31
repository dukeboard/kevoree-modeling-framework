package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiImportStatementBase;
import com.siliconmint.ts.util.FileUtil;

import java.io.File;
import java.util.Arrays;

public abstract class ImportStatementTranslatorBase<T extends PsiImportStatementBase> extends Translator<T> {

  @Override
  public void translate(PsiElementVisitor visitor, T element, TranslationContext ctx) {
    String [] packagePath = ctx.getClassPackage().split("\\.");

    String [] importPath = getImportPath(element);

    int firstClassComponent = 0;
    for (String importPathComponent : importPath) {
      if (Character.isUpperCase(importPathComponent.charAt(0)) || importPathComponent.charAt(0) == '*') {
        break;
      }
      firstClassComponent++;
    }

    boolean multiImport = firstClassComponent >= importPath.length;

    int matchingPaths = 0;

    while (packagePath.length > matchingPaths && firstClassComponent > matchingPaths
        && packagePath[matchingPaths].equals(importPath[matchingPaths])){
      matchingPaths++;
    }

    StringBuilder sb = new StringBuilder();
    if (packagePath.length > matchingPaths) {
      for (int i=0; i < packagePath.length - matchingPaths; i++) {
        sb.append("../");
      }
    }
    if (firstClassComponent > matchingPaths) {
      for (int i=matchingPaths; i < firstClassComponent; i++) {
        sb.append(importPath[i]).append("/");
      }
    }

    String dirPath = sb.toString();

    if (!multiImport) {
      String fileName = importPath[firstClassComponent];
      printReference(ctx, dirPath, fileName);
    } else {
      if (ctx.getTranslatedFile() == null) {
        printTodoMultiImportResolve(ctx, dirPath);
      } else {
        File sourceFile = ctx.getTranslatedFile();
        File referencedSourcePackage = new File(sourceFile.getParentFile(), dirPath);
        if (!referencedSourcePackage.exists()) {
          printTodoMultiImportResolve(ctx, dirPath);
        } else {
          File[] sourceFiles = referencedSourcePackage.listFiles(FileUtil.JAVA_SOURCE_FILE_FILTER);
          Arrays.sort(sourceFiles, FileUtil.FILE_NAME_COMPARATOR);
          for (File file : sourceFiles) {
            String fileName = file.getName();
            fileName = fileName.substring(0, fileName.lastIndexOf(".java"));

            // Check if current file contains referenced file (=class) name
            if (element.getContainingFile().getText().contains(fileName)) {
              printReference(ctx, dirPath, fileName);
            }
          }
        }
      }
    }

  }

  private void printReference(TranslationContext ctx, String dirPath, String fileName) {
    ctx.print("///<reference path=\"");
    ctx.append(dirPath);
    ctx.append(fileName).append(".ts");
    ctx.append("\"/>\n");
  }

  private void printTodoMultiImportResolve(TranslationContext ctx, String dirPath) {
    ctx.print("//TODO Resolve multi-import\n");
    ctx.print("///<reference path=\"").append(dirPath).append("\"/>\n");
  }

  protected abstract String[] getImportPath(T element);

}


package com.siliconmint.ts.translator;

import java.io.File;

public class TranslationContext {

  private File translatedFile;
  private String classPackage = "";
  private StringBuilder sb = new StringBuilder();
  private static final int identSize = 2;
  private int ident = 0;

  public void increaseIdent(){
    ident += identSize;
  }

  public void decreaseIdent(){
    ident -= identSize;
    if (ident < 0) {
      throw new IllegalStateException("Decrease ident was called more times than increase");
    }
  }

  public TranslationContext print(String str) {
    ident();
    sb.append(str);
    return this;
  }

  public TranslationContext print(char str) {
    ident();
    sb.append(str);
    return this;
  }

  public TranslationContext ident() {
    for (int i=0; i < ident; i++) {
      sb.append(' ');
    }
    return this;
  }

  public TranslationContext append(String str) {
    sb.append(str);
    return this;
  }

  public TranslationContext append(char c) {
    sb.append(c);
    return this;
  }

  public String getText() {
    return sb.toString();
  }

  public boolean hasWhitespace() {
    if (sb.length() < 2) {
      return false;
    } else {
      return '\n' == sb.charAt(sb.length() - 1) && '\n' == sb.charAt(sb.length() - 2);
    }
  }

  public String getClassPackage() {
    return classPackage;
  }

  public void setClassPackage(String classPackage) {
    this.classPackage = classPackage;
  }

  public File getTranslatedFile() {
    return translatedFile;
  }

  public void setTranslatedFile(File translatedFile) {
    this.translatedFile = translatedFile;
  }
}

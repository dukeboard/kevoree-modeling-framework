package com.siliconmint.ts.util;

import java.io.File;
import java.io.FileFilter;
import java.util.Comparator;

public class FileUtil {

  public static FileFilter DIRECTORY_FILTER = new FileFilter() {
    @Override
    public boolean accept(File file) {
      return file.isDirectory();
    }
  };

  public static FileFilter JAVA_SOURCE_FILE_FILTER = new FileFilter() {
    @Override
    public boolean accept(File file) {
      return file.isFile() && file.getName().endsWith(".java");
    }
  };

  public static Comparator<File> FILE_NAME_COMPARATOR = new Comparator<File>() {
    @Override
    public int compare(File o1, File o2) {
      return o1.getName().compareTo(o2.getName());
    }
  };

}

package org.kevoree.modeling.generator;

import org.kevoree.modeling.ast.MModelClassifier;

import java.io.File;
import java.util.HashMap;

public class GenerationContext {

    private File metaModel;
    private String metaModelName;
    private String metaModelPackage;
    private String version;
    public File targetSrcDir;

    public String getMetaModelPackage() {
        return metaModelPackage;
    }

    public File getMetaModel() {
        return metaModel;
    }

    public void setMetaModel(File metaModel) {
        this.metaModel = metaModel;
    }

    public String getMetaModelName() {
        return metaModelName;
    }

    public void setMetaModelName(String metaModelName) {
        this.metaModelName = metaModelName;
        this.metaModelPackage = metaModelName.toLowerCase();

    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public File getTargetSrcDir() {
        return targetSrcDir;
    }

    public void setTargetSrcDir(File targetSrcDir) {
        this.targetSrcDir = targetSrcDir;
    }

    /* GENERATION DATA */
    public HashMap<String, MModelClassifier> classDeclarationsList = new HashMap<>();
    public ProcessorHelper helper = ProcessorHelper.getInstance();

    public HashMap<String, MModelClassifier> getClassDeclarationsList() {
        return classDeclarationsList;
    }

    public ProcessorHelper getHelper() {
        return helper;
    }

}
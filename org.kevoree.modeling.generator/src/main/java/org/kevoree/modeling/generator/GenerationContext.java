package org.kevoree.modeling.generator;

import org.kevoree.modeling.ast.MModelClass;

import java.io.File;
import java.util.HashMap;

public class GenerationContext {

    /*
    METAMODEL
     */
    public File metaModel;
    public String metaModelName;
    public String utilityPackage;

    /*
    Project
     */
    public String projectVersion;

    /*
    Folders
     */
    public File kmfSrcGenerationDirectory;
    public File classesDirectory;


    /*
    GENERATION DATA
    */
    public HashMap<String, MModelClass> classDeclarationsList = new HashMap<>();
    public ProcessorHelper helper = ProcessorHelper.getInstance();


    public HashMap<String, MModelClass> getClassDeclarationsList() {
        return classDeclarationsList;
    }

    public File getMetaModel() {
        return metaModel;
    }

    public String getMetaModelName() {
        return metaModelName;
    }

    public String getProjectVersion() {
        return projectVersion;
    }

    public File getKmfSrcGenerationDirectory() {
        return kmfSrcGenerationDirectory;
    }

    public File getClassesDirectory() {
        return classesDirectory;
    }

    public String getUtilityPackage() {
        return utilityPackage;
    }

    public ProcessorHelper getHelper() {
        return helper;
    }
}
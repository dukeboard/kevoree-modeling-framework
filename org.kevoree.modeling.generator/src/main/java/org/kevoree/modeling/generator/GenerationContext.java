package org.kevoree.modeling.generator;

import org.kevoree.modeling.generator.misc.OrderedClassDeclarationLists;
import org.kevoree.modeling.idea.psi.MetaModelRelationDeclaration;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

public class GenerationContext {

    /*
    METAMODEL
     */
    public File metaModel;
    public String metaModelName;

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

    public HashMap<String, OrderedClassDeclarationLists> classDeclarationsList = new HashMap<>();



    public HashMap<String, OrderedClassDeclarationLists> getClassDeclarationsList() {
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
}
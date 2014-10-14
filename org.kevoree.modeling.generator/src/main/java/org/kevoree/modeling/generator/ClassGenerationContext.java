package org.kevoree.modeling.generator;

import org.kevoree.modeling.generator.misc.OrderedClassDeclarationLists;

/**
 * Created by gregory.nain on 14/10/2014.
 */
public class ClassGenerationContext {

    public GenerationContext generationContext;
    public String classPackage, classFqn, className;
    public OrderedClassDeclarationLists delarationsList;

    public GenerationContext getGenerationContext() {
        return generationContext;
    }

    public String getClassPackage() {
        return classPackage;
    }

    public String getClassFqn() {
        return classFqn;
    }

    public String getClassName() {
        return className;
    }

    public OrderedClassDeclarationLists getDelarationsList() {
        return delarationsList;
    }
}

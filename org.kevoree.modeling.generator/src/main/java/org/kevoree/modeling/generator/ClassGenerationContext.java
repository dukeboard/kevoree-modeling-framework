package org.kevoree.modeling.generator;

import org.kevoree.modeling.ast.MModelClass;

/**
 * Created by gregory.nain on 14/10/2014.
 */
public class ClassGenerationContext {

    public GenerationContext generationContext;
    //public String classPackage, classFqn, className;
    public MModelClass classDeclaration;

    public GenerationContext getGenerationContext() {
        return generationContext;
    }

    public MModelClass getClassDeclaration() {
        return classDeclaration;
    }
}

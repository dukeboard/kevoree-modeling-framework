package org.kevoree.modeling.generator;

import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling.generator.misc.OrderedClassDeclarationLists;
import org.kevoree.modeling.idea.psi.*;

import static org.kevoree.modeling.generator.GenerationContext.*;


/**
 * Created by gregory.nain on 14/10/2014.
 */
public class EnumIndexesVisitor extends MetaModelVisitor {

    private GenerationContext context;

    public EnumIndexesVisitor(GenerationContext context) {
        this.context = context;
    }

    @Override
    public void visitDeclaration(@NotNull MetaModelDeclaration o) {
        o.acceptChildren(this);
    }

    @Override
    public void visitClassDeclaration(@NotNull MetaModelClassDeclaration o) {

        OrderedClassDeclarationLists thisClassDeclarations = context.classDeclarationsList.computeIfAbsent(o.getTypeDeclaration().getName(), (name) -> new OrderedClassDeclarationLists());

        o.getClassElemDeclarationList().forEach(decl -> {
            if (decl.getRelationDeclaration() != null) {
                MetaModelRelationDeclaration relationDecl = decl.getRelationDeclaration();
                if (ProcessorHelper.getInstance().isPrimitive(relationDecl.getTypeDeclaration())) {
                    thisClassDeclarations.attributes.add(relationDecl);
                } else {
                    thisClassDeclarations.relations.add(relationDecl);
                }
            }
        });
        if (o.getParentsDeclaration() != null && o.getParentsDeclaration().getTypeDeclarationList() != null) {
            o.getParentsDeclaration().getTypeDeclarationList().forEach(parent -> thisClassDeclarations.parents.add(parent.getName()));

        }
    }


}

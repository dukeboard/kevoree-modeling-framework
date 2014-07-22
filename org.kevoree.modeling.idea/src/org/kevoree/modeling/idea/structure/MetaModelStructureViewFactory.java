package org.kevoree.modeling.idea.structure;

import com.intellij.ide.actions.RelatedItemLineMarkerGotoAdapter;
import com.intellij.ide.structureView.*;
import com.intellij.ide.structureView.impl.StructureViewModelWrapper;
import com.intellij.ide.util.treeView.smartTree.TreeElement;
import com.intellij.lang.ASTNode;
import com.intellij.lang.PsiStructureViewFactory;
import com.intellij.navigation.ItemPresentation;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.fileEditor.FileEditor;
import com.intellij.openapi.project.Project;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiFile;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.idea.psi.MetaModelClassDeclaration;
import org.kevoree.modeling.idea.psi.MetaModelRelationDeclaration;
import org.kevoree.modeling.idea.psi.MetaModelTypeDeclaration;
import org.kevoree.modeling.idea.psi.MetaModelVisitor;
import org.kevoree.modeling.util.PrimitiveTypes;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by gregory.nain on 16/07/2014.
 */
public class MetaModelStructureViewFactory implements PsiStructureViewFactory{



    public StructureViewBuilder getStructureViewBuilder(final PsiFile psiFile) {
        return new TreeBasedStructureViewBuilder() {
            @NotNull
            @Override
            public StructureViewModel createStructureViewModel(@Nullable Editor editor) {
                return new MetaModelStructureViewModel(psiFile, buildTree(psiFile, editor));
            }

        };
    }

    private MetaModelStructureViewRootElement buildTree(PsiFile psiFile, final Editor editor) {

        final MetaModelStructureViewRootElement root = new MetaModelStructureViewRootElement(psiFile, editor);

        MetaModelVisitor visitor = new MetaModelVisitor() {

            @Override
            public void visitClassDeclaration(@NotNull MetaModelClassDeclaration o) {
                super.visitClassDeclaration(o);
                if(o.getTypeDeclaration() != null) {
                    MetaModelStructureViewClassElement classElement = new MetaModelStructureViewClassElement(o, editor);
                    if (o.getParentsDeclaration() != null) {
                        for (MetaModelTypeDeclaration d : o.getParentsDeclaration().getTypeDeclarationList()) {
                            classElement.parents.add(new MetaModelStructureViewParentElement(d, editor));
                        }
                    }
                    processReferences(o, classElement, editor);
                    if (o.getTypeDeclaration().getName().lastIndexOf(".") != -1) {
                        processPackages(root, o).innerClasses.add(classElement);
                    } else {
                        root.innerClasses.add(classElement);
                    }
                }
            }

            @Override
            public void visitPsiElement(@NotNull PsiElement o) {
                super.visitPsiElement(o);
                o.acceptChildren(this);
            }
        };
        psiFile.acceptChildren(visitor);

        return root;
    }


    private MetaModelStructureViewPackageElement processPackages(MetaModelStructureViewRootElement root, MetaModelClassDeclaration o) {
        MetaModelStructureViewPackageElement currentPackage = null;
        String oName = o.getTypeDeclaration().getName();
        String fqPackage = oName.substring(0, oName.lastIndexOf("."));
        String[] packages = fqPackage.split(".");

        if(packages.length == 0) {
            currentPackage = getOrPut(root.packages, fqPackage);
        } else {
            for (String pack : packages) {
                if (currentPackage == null) {
                    currentPackage = getOrPut(root.packages, pack);
                } else {
                    currentPackage = getOrPut(currentPackage.packages, pack);
                }
            }
        }
        return currentPackage;
    }

    private MetaModelStructureViewPackageElement getOrPut(Map<String, MetaModelStructureViewPackageElement> packageMap, String packageName) {
        MetaModelStructureViewPackageElement pack = packageMap.get(packageName);
        if(pack == null) {
            pack = new MetaModelStructureViewPackageElement(packageName);
            packageMap.put(packageName, pack);
        }
        return pack;
    }

    private void processReferences(MetaModelClassDeclaration o, MetaModelStructureViewClassElement classElement, Editor editor) {

        for(MetaModelRelationDeclaration relDec : o.getRelationDeclarationList()) {
            MetaModelStructureViewReferenceElement referenceElement = new MetaModelStructureViewReferenceElement(relDec, editor);
            classElement.references.add(referenceElement);
        }


    }

}

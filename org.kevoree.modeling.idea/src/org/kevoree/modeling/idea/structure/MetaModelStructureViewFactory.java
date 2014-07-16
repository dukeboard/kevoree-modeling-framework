package org.kevoree.modeling.idea.structure;

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
                String fqPackage = o.getTypeDeclaration().getName().substring(0, o.getTypeDeclaration().getName().lastIndexOf("."));
                if(fqPackage != null && !fqPackage.equals("")) {
                    MetaModelStructureViewPackageElement currentPackage = null;
                    String[] packages = fqPackage.split(".");

                    if(packages.length == 0) {
                        currentPackage = root.packages.get(fqPackage);
                        if(currentPackage == null) {
                            currentPackage = new MetaModelStructureViewPackageElement(fqPackage);
                            root.packages.put(fqPackage, currentPackage);
                        }
                    } else {
                        for (String pack : packages) {
                            if (currentPackage == null) {
                                currentPackage = root.packages.get(pack);
                                if(currentPackage == null) {
                                    currentPackage = new MetaModelStructureViewPackageElement(pack);
                                    root.packages.put(pack, currentPackage);
                                }
                            } else {
                                MetaModelStructureViewPackageElement inCurrentPackage = currentPackage.packages.get(pack);
                                if (inCurrentPackage == null) {
                                    currentPackage = new MetaModelStructureViewPackageElement(pack);
                                    currentPackage.packages.put(pack, currentPackage);
                                } else {
                                    currentPackage = inCurrentPackage;
                                }
                            }
                        }
                    }
                    currentPackage.innerClasses.add(new MetaModelStructureViewClassElement(o,editor));
                } else {
                    root.innerClasses.add(new MetaModelStructureViewClassElement(o,editor));
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



}

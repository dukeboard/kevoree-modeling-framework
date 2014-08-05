package org.kevoree.modeling.idea.structure;

import com.intellij.ide.structureView.StructureViewTreeElement;
import com.intellij.ide.util.treeView.smartTree.TreeElement;
import com.intellij.navigation.ItemPresentation;
import com.intellij.openapi.application.ApplicationManager;
import com.intellij.openapi.editor.Editor;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiFile;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.MetaModelIcons;
import org.kevoree.modeling.idea.psi.MetaModelClassDeclaration;
import org.kevoree.modeling.idea.psi.MetaModelRelationDeclaration;
import org.kevoree.modeling.idea.psi.MetaModelTypeDeclaration;
import org.kevoree.modeling.idea.psi.MetaModelVisitor;

import javax.swing.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by gregory.nain on 16/07/2014.
 */
public class MetaModelStructureViewRootElement implements StructureViewTreeElement {

    private PsiFile element;
    private Editor editor;
    public List<MetaModelStructureViewClassElement> innerClasses = new ArrayList<MetaModelStructureViewClassElement>();
    public HashMap<String, MetaModelStructureViewPackageElement> packages = new HashMap<String, MetaModelStructureViewPackageElement>();

    public MetaModelStructureViewRootElement(PsiFile element, Editor editor) {
        this.element = element;
        this.editor = editor;
    }

    public void refresh() {
        ApplicationManager.getApplication().runReadAction(new Runnable() {
            public void run() {
                // do whatever you need to do

                innerClasses.clear();
                packages.clear();
                MetaModelVisitor visitor = new MetaModelVisitor() {

                    @Override
                    public void visitClassDeclaration(@NotNull MetaModelClassDeclaration o) {
                        super.visitClassDeclaration(o);
                        if (o.getTypeDeclaration() != null) {
                            MetaModelStructureViewClassElement classElement = new MetaModelStructureViewClassElement(o, editor);
                            if (o.getParentsDeclaration() != null) {
                                for (MetaModelTypeDeclaration d : o.getParentsDeclaration().getTypeDeclarationList()) {
                                    classElement.parents.add(new MetaModelStructureViewParentElement(d, editor));
                                }
                            }
                            processReferences(o, classElement, editor);
                            if (o.getTypeDeclaration().getName().lastIndexOf(".") != -1) {
                                processPackages(MetaModelStructureViewRootElement.this, o).innerClasses.add(classElement);
                            } else {
                                MetaModelStructureViewRootElement.this.innerClasses.add(classElement);
                            }
                        }
                    }

                    @Override
                    public void visitPsiElement(@NotNull PsiElement o) {
                        super.visitPsiElement(o);
                        o.acceptChildren(this);
                    }
                };
                element.acceptChildren(visitor);
            }
        });
    }

    @Override
    public Object getValue() {
        return element;
    }

    @Override
    public void navigate(boolean b) {

    }

    @Override
    public boolean canNavigate() {
        return false;
    }

    @Override
    public boolean canNavigateToSource() {
        return false;
    }

    @NotNull
    @Override
    public ItemPresentation getPresentation() {
        return new ItemPresentation() {
            @Nullable
            @Override
            public String getPresentableText() {
                return element.getVirtualFile().getName().toString();
            }

            @Nullable
            @Override
            public String getLocationString() {
                return element.getVirtualFile().getCanonicalPath();
            }

            @Nullable
            @Override
            public Icon getIcon(boolean b) {
                return MetaModelIcons.KEVS_ICON_16x16;
            }
        };
    }

    @Override
    public TreeElement[] getChildren() {
        List<TreeElement> res = new ArrayList<TreeElement>();
        res.addAll(packages.values());
        res.addAll(innerClasses);
        return res.toArray(new TreeElement[res.size()]);
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

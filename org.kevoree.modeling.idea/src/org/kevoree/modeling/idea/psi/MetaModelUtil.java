package org.kevoree.modeling.idea.psi;

import com.intellij.navigation.ItemPresentation;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiManager;
import com.intellij.psi.search.FileTypeIndex;
import com.intellij.psi.search.GlobalSearchScope;
import com.intellij.util.indexing.FileBasedIndex;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.MetaModelIcons;
import org.kevoree.modeling.MetaModelLanguageType;

import javax.swing.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by duke on 7/14/14.
 */
public class MetaModelUtil {

    public static List<MetaModelTypeDeclaration> findProperties(Project project) {
        final List<MetaModelTypeDeclaration> result = new ArrayList<MetaModelTypeDeclaration>();
        Collection<VirtualFile> virtualFiles = FileBasedIndex.getInstance().getContainingFiles(FileTypeIndex.NAME, MetaModelLanguageType.INSTANCE,
                GlobalSearchScope.allScope(project));
        for (VirtualFile virtualFile : virtualFiles) {
            MetaModelFile simpleFile = (MetaModelFile) PsiManager.getInstance(project).findFile(virtualFile);
            if (simpleFile != null) {


                simpleFile.acceptChildren(new PsiElementVisitor() {
                    @Override
                    public void visitElement(PsiElement element) {
                        if (element instanceof MetaModelDeclaration) {
                            MetaModelDeclaration declaration = (MetaModelDeclaration) element;
                            if (declaration.getClassDeclaration() != null) {
                                result.add(declaration.getClassDeclaration().getTypeDeclaration());
                            }
                            if (declaration.getEnumDeclaration() != null) {
                                result.add(declaration.getEnumDeclaration().getTypeDeclaration());
                            }
                        }
                        super.visitElement(element);
                    }
                });
            }
        }
        return result;
    }

    public static List<MetaModelTypeDeclaration> findProperties(Project project, final String key) {
        final List<MetaModelTypeDeclaration> result = new ArrayList<MetaModelTypeDeclaration>();
        Collection<VirtualFile> virtualFiles = FileBasedIndex.getInstance().getContainingFiles(FileTypeIndex.NAME, MetaModelLanguageType.INSTANCE,
                GlobalSearchScope.allScope(project));
        for (VirtualFile virtualFile : virtualFiles) {
            MetaModelFile simpleFile = (MetaModelFile) PsiManager.getInstance(project).findFile(virtualFile);
            if (simpleFile != null) {
                simpleFile.acceptChildren(new PsiElementVisitor() {
                    @Override
                    public void visitElement(PsiElement element) {
                        if (element instanceof MetaModelDeclaration) {
                            MetaModelDeclaration declaration = (MetaModelDeclaration) element;
                            if (declaration.getClassDeclaration() != null && declaration.getClassDeclaration().getTypeDeclaration() != null) {
                                if (key.equals(declaration.getClassDeclaration().getTypeDeclaration().getName())) {
                                    result.add(declaration.getClassDeclaration().getTypeDeclaration());
                                }
                            }
                            if (declaration.getEnumDeclaration() != null && declaration.getEnumDeclaration().getTypeDeclaration() != null) {
                                if (key.equals(declaration.getEnumDeclaration().getTypeDeclaration().getName())) {
                                    result.add(declaration.getEnumDeclaration().getTypeDeclaration());
                                }
                            }
                        }
                        super.visitElement(element);
                    }
                });
            }
        }
        return result;
    }


    public static PsiElement setName(MetaModelTypeDeclaration element, String newName) {
        System.err.println("Rename not supported yet !!!");
        /*
        ASTNode keyNode = element.getNode().findChildByType(SimpleTypes.KEY);
        if (keyNode != null) {
            MetaModelTypeDeclaration property = SimpleElementFactory.createProperty(element.getProject(), newName);
            ASTNode newKeyNode = property.getFirstChild().getNode();
            element.getNode().replaceChild(keyNode, newKeyNode);
        }
        */
        return element;
    }

    public static PsiElement getNameIdentifier(MetaModelTypeDeclaration element) {
        return element.getIdent();
    }

    public static ItemPresentation getPresentation(final MetaModelTypeDeclaration element) {
        return new ItemPresentation() {
            @Nullable
            @Override
            public String getPresentableText() {
                return element.getName();
            }

            @Nullable
            @Override
            public String getLocationString() {
                return element.getContainingFile().getName();
            }

            @Nullable
            @Override
            public Icon getIcon(boolean unused) {
                return MetaModelIcons.KEVS_ICON_16x16;
            }
        };
    }


}

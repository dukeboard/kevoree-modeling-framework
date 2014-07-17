package org.kevoree.modeling.idea.psi;

import com.intellij.lang.annotation.AnnotationHolder;
import com.intellij.lang.annotation.Annotator;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiFile;
import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling.util.PrimitiveTypes;

/**
 * Created by duke on 7/16/14.
 */
public class MetaModelTypeNamedAnnotator implements Annotator {
    @Override
    public void annotate(@NotNull PsiElement psiElement, @NotNull AnnotationHolder annotationHolder) {
        if (psiElement instanceof MetaModelTypeDeclaration) {
            if (((MetaModelTypeDeclaration) psiElement).getName().indexOf(".") < 1) {
                for (PrimitiveTypes p : PrimitiveTypes.values()) {
                    if (((MetaModelTypeDeclaration) psiElement).getName().equals(p.name())) {
                        return;
                    }
                }
                annotationHolder.createErrorAnnotation(psiElement, "Type identifier must be a qualified name with at least one package as : pack.ClassName");
            } else {

                final MetaModelTypeDeclaration casted = (MetaModelTypeDeclaration) psiElement;
                final boolean[] isValidated = {false};
                for (PrimitiveTypes p : PrimitiveTypes.values()) {
                    if (casted.getName().equals(p.name())) {
                        isValidated[0] = true;
                    }
                }
                if (!isValidated[0]) {
                    PsiElement parent = psiElement.getParent();
                    if (!(parent instanceof MetaModelClassDeclaration)) {
                        PsiFile file = psiElement.getContainingFile();
                        file.acceptChildren(new MetaModelVisitor() {
                            @Override
                            public void visitPsiElement(@NotNull PsiElement o) {
                                super.visitPsiElement(o);
                                if(!isValidated[0]){
                                    o.acceptChildren(this);
                                }
                            }
                            @Override
                            public void visitClassDeclaration(@NotNull MetaModelClassDeclaration o) {
                                if(o.getTypeDeclaration().getName().equals(casted.getName())){
                                    isValidated[0] = true;
                                }
                            }
                        });
                        if(!isValidated[0]){
                            annotationHolder.createErrorAnnotation(psiElement, "Type identifier not found, please declare corresponding class");
                        }
                    }
                }
            }
        }
    }
}

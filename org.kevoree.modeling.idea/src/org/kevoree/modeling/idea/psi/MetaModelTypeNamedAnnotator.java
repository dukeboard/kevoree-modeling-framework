package org.kevoree.modeling.idea.psi;

import com.intellij.lang.annotation.AnnotationHolder;
import com.intellij.lang.annotation.Annotator;
import com.intellij.psi.PsiElement;
import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling.util.PrimitiveTypes;

/**
 * Created by duke on 7/16/14.
 */
public class MetaModelTypeNamedAnnotator implements Annotator {
    @Override
    public void annotate(@NotNull PsiElement psiElement, @NotNull AnnotationHolder annotationHolder) {
        if (psiElement instanceof MetaModelTypeDeclaration) {
              if(((MetaModelTypeDeclaration) psiElement).getName().indexOf(".") <1){

                  for(PrimitiveTypes p : PrimitiveTypes.values()){
                      if(((MetaModelTypeDeclaration) psiElement).getName().equals(p.name())){
                          return;
                      }
                  }

                  annotationHolder.createErrorAnnotation(psiElement,"Type identifier must be a qualified name with at least one package as : pack.ClassName");
              }
        }
    }
}

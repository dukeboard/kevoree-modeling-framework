package org.kevoree.modeling.idea.psi;

import com.intellij.lang.annotation.AnnotationHolder;
import com.intellij.lang.annotation.Annotator;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiFile;
import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling.util.PrimitiveTypes;

/**
 * Created by duke on 7/16/14.
 */
public class MetaModelTypeNamedAnnotator implements Annotator {
    @Override
    public void annotate(@NotNull final PsiElement psiElement, @NotNull final AnnotationHolder annotationHolder) {


        if(psiElement instanceof MetaModelAnnotations){
            MetaModelAnnotations annotations = (MetaModelAnnotations) psiElement;
            Boolean isAttribute = false;
            Boolean isReference = false;
            if(annotations.getParent() instanceof MetaModelRelationDeclaration){
                MetaModelRelationDeclaration declaration = (MetaModelRelationDeclaration) annotations.getParent();

                for(PrimitiveTypes p : PrimitiveTypes.values()){
                    if(p.name().equals(declaration.getTypeDeclaration().getName())){
                        isAttribute = true;
                    }
                }
                isReference = true;
            } else {
                annotationHolder.createErrorAnnotation(psiElement, "Annotation must be placed on references or attributes declaration");
            }
            final Boolean finalIsAttribute = isAttribute;
            final Boolean finalIsReference = isReference;
            annotations.acceptChildren(new PsiElementVisitor() {
                @Override
                public void visitElement(PsiElement element) {
                    if ("@id".equals(element.getText())) {
                        if(!finalIsAttribute){
                            StringBuilder builder =new StringBuilder();
                            for(PrimitiveTypes p : PrimitiveTypes.values()){
                                if(builder.length()!=0){
                                    builder.append(",");
                                }
                                builder.append(p.name());
                            }
                            annotationHolder.createErrorAnnotation(psiElement, "@id is only valid on attributes (with PrimitiveTypes: "+builder+")");
                        }
                    } else {
                        if ("@contained".equals(element.getText())) {
                            if(!finalIsReference){
                                StringBuilder builder =new StringBuilder();
                                for(PrimitiveTypes p : PrimitiveTypes.values()){
                                    if(builder.length()!=0){
                                        builder.append(",");
                                    }
                                    builder.append(p.name());
                                }
                                annotationHolder.createErrorAnnotation(psiElement, "@contained is only valid on references (WITHOUT PrimitiveTypes: "+builder+")");
                            }
                        } else {
                            if (element.getText()!=null&&element.getText().startsWith("@learn")) {
                                if(!finalIsAttribute){
                                    StringBuilder builder =new StringBuilder();
                                    for(PrimitiveTypes p : PrimitiveTypes.values()){
                                        if(builder.length()!=0){
                                            builder.append(",");
                                        }
                                        builder.append(p.name());
                                    }
                                    annotationHolder.createErrorAnnotation(psiElement, "@learn is only valid on attributes (WITHOUT PrimitiveTypes: "+builder+")");
                                }
                            } else {
                                annotationHolder.createErrorAnnotation(psiElement, psiElement.getText()+" is not a valid annotation, @id,@learn or @contained expected");
                            }
                        }
                    }
                }
            });
        }

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
                    if (!(parent instanceof MetaModelClassDeclaration) && !(parent instanceof MetaModelEnumDeclaration)) {
                        PsiFile file = psiElement.getContainingFile();
                        file.acceptChildren(new MetaModelVisitor() {
                            @Override
                            public void visitPsiElement(@NotNull PsiElement o) {
                                super.visitPsiElement(o);
                                if(o != null && !isValidated[0]){
                                    o.acceptChildren(this);
                                }
                            }
                            @Override
                            public void visitClassDeclaration(@NotNull MetaModelClassDeclaration o) {
                                if(o != null && o.getTypeDeclaration() != null && o.getTypeDeclaration().getName() != null && o.getTypeDeclaration().getName().equals(casted.getName())){
                                    isValidated[0] = true;
                                }
                            }

                            @Override
                            public void visitEnumDeclaration(@NotNull MetaModelEnumDeclaration o) {
                                if(o != null && o.getTypeDeclaration() != null && o.getTypeDeclaration().getName() != null && o.getTypeDeclaration().getName().equals(casted.getName())){
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

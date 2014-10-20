package org.kevoree.modeling.generator;

import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling.ast.MModelAttribute;
import org.kevoree.modeling.ast.MModelClass;
import org.kevoree.modeling.ast.MModelReference;
import org.kevoree.modeling.idea.psi.*;


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

        String classFqn = o.getTypeDeclaration().getName();

        MModelClass thisClassDeclaration = getOrAddClass(classFqn);
        /*MModelClass) context.classDeclarationsList.computeIfAbsent(classFqn, (t) -> {
            String classPackage = classFqn.substring(0, classFqn.lastIndexOf("."));
            String className = classFqn.substring(classFqn.lastIndexOf(".") + 1);
            MModelClass cls = new MModelClass(className);
            cls.setPack(classPackage);
            return cls;
        });
        */

        o.getClassElemDeclarationList().forEach(decl -> {
            if (decl.getRelationDeclaration() != null) {
                MetaModelRelationDeclaration relationDecl = decl.getRelationDeclaration();
                if (ProcessorHelper.getInstance().isPrimitive(relationDecl.getTypeDeclaration())) {
                    MModelAttribute attribute = new MModelAttribute(relationDecl.getRelationName().getText(), relationDecl.getTypeDeclaration().getName());
                    if(relationDecl.getAnnotations()!=null) {
                        relationDecl.getAnnotations().getAnnotationList().forEach(ann->{
                            if(ann.getText().equalsIgnoreCase("@id")){
                                attribute.setId(true);
                            } else if(ann.getText().equalsIgnoreCase("@learned")){
                                attribute.setLearned(true);
                            } else {
                                System.out.println("Unrecognized Annotation on Attribute:" + ann.getText());
                            }
                        });
                    }
                    if(relationDecl.getMultiplicityDeclaration() != null) {
                        if(relationDecl.getMultiplicityDeclaration().getMultiplicityDeclarationUpper().getText().equals("*")) {
                            attribute.setSingle(false);
                        } else {
                            attribute.setSingle(true);
                        }
                    } else {
                        attribute.setSingle(true);
                    }
                    thisClassDeclaration.addAttribute(attribute);
                } else {

                    String relationTypeFqn = relationDecl.getTypeDeclaration().getName();
                    MModelClass relationType = getOrAddClass(relationTypeFqn);

                    MModelReference reference = getOrAddReference(thisClassDeclaration, relationDecl.getRelationName().getText());
                    if(relationDecl.getAnnotations() != null) {
                        relationDecl.getAnnotations().getAnnotationList().forEach(ann->{
                            if(ann.getText().equalsIgnoreCase("@contained")){
                                reference.setContained(true);
                            } else {
                                System.out.println("Unrecognized Annotation on Reference:" + ann.getText());
                            }
                        });
                    }
                    if(relationDecl.getMultiplicityDeclaration() != null) {
                        if(relationDecl.getMultiplicityDeclaration().getMultiplicityDeclarationUpper().getText().equals("*")) {
                            reference.setSingle(false);
                        } else {
                            reference.setSingle(true);
                        }
                    } else {
                        reference.setSingle(true);
                    }

                    if(relationDecl.getRelationOpposite() != null) {
                        reference.setOpposite(getOrAddReference(relationType, relationDecl.getRelationOpposite().getIdent().getText()));
                    }
                }
            }
        });

        if (o.getParentsDeclaration() != null && o.getParentsDeclaration().getTypeDeclarationList() != null) {
            o.getParentsDeclaration().getTypeDeclarationList().forEach(parent -> {
                String parentTypeFqn = parent.getName();
                MModelClass parentType = (MModelClass) context.classDeclarationsList.computeIfAbsent(parentTypeFqn, (t) -> {
                    String parentTypePackage = parentTypeFqn.substring(0, parentTypeFqn.lastIndexOf("."));
                    String parentTypeName = parentTypeFqn.substring(parentTypeFqn.lastIndexOf(".") + 1);
                    MModelClass cls = new MModelClass(parentTypeName);
                    cls.setPack(parentTypePackage);
                    return cls;
                });
                thisClassDeclaration.addParent(parentType);
            });

        }
    }

    private MModelReference getOrAddReference(String clazz, String ref) {
        return getOrAddReference(getOrAddClass(clazz), ref);
    }

    private MModelReference getOrAddReference(MModelClass relationType, String ref) {
        for(MModelReference registeredRef : relationType.getReferences()) {
            if(registeredRef.getName().equals(ref)) {
                return registeredRef;
            }
        }
        MModelReference reference = new MModelReference(ref, relationType);
        relationType.addReference(reference);
        return reference;
    }

    private MModelClass getOrAddClass(String clazz) {
        return (MModelClass) context.classDeclarationsList.computeIfAbsent(clazz, (t) -> {
            String relationTypePackage = clazz.substring(0, clazz.lastIndexOf("."));
            String relationTypeName = clazz.substring(clazz.lastIndexOf(".") + 1);
            MModelClass cls = new MModelClass(relationTypeName);
            cls.setPack(relationTypePackage);
            return cls;
        });
    }


}

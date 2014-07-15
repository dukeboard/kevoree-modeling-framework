package org.kevoree.modeling.util;

import com.intellij.core.CoreApplicationEnvironment;
import com.intellij.core.CoreProjectEnvironment;
import com.intellij.openapi.Disposable;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.vfs.CharsetToolkit;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiFile;
import com.intellij.psi.PsiFileFactory;
import com.intellij.psi.impl.PsiFileFactoryImpl;
import com.intellij.testFramework.LightVirtualFile;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.impl.EcoreFactoryImpl;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;
import org.kevoree.modeling.MetaModelLanguage;
import org.kevoree.modeling.MetaModelLanguageType;
import org.kevoree.modeling.MetaModelParserDefinition;
import org.kevoree.modeling.idea.psi.*;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by duke on 7/3/14.
 */
public class StandaloneParser {

    CoreProjectEnvironment projectEnvironment;

    Project project = null;

    public StandaloneParser() {
        CoreApplicationEnvironment environment = new CoreApplicationEnvironment(new Disposable() {
            @Override
            public void dispose() {

            }
        });
        projectEnvironment = new CoreProjectEnvironment(environment.getParentDisposable(), environment);
        environment.registerParserDefinition(new MetaModelParserDefinition());
        environment.registerFileType(MetaModelLanguageType.INSTANCE, "mm");
        project = projectEnvironment.getProject();
    }

    public StandaloneParser(Project project) {
        projectEnvironment = null;
        this.project = project;
    }

    private EClassifier getOrCreateDataType(String name, Resource r, EcoreFactory factory) {
        for (EObject o : r.getContents()) {
            if (o instanceof EDataType && ((EDataType) o).getName().equals(name)) {
                return (EDataType) o;
            }
        }
        EDataType dt = factory.createEDataType();
        dt.setName(name);
        r.getContents().add(dt);
        return dt;
    }

    private EPackage getOrCreatePackage(EPackage base, String packageName, Resource r, EcoreFactory factory) {
        if (base == null) {
            for (EObject o : r.getContents()) {
                if (o instanceof EPackage && ((EPackage) o).getName().equals(packageName)) {
                    return (EPackage) o;
                }
            }
            EPackage newP = factory.createEPackage();
            newP.setName(packageName);
            r.getContents().add(newP);
            return newP;
        } else {
            for (EPackage o : base.getESubpackages()) {
                if (o.getName().equals(packageName)) {
                    return o;
                }
            }
            EPackage newP = factory.createEPackage();
            newP.setName(packageName);
            base.getESubpackages().add(newP);
            return newP;
        }
    }

    private EClass getOrCreate(String name, Resource r, EcoreFactory factory) {
        EPackage previous = null;
        String correctedName = name;
        if (name.contains(".")) {
            String[] packageName = name.split("\\.");
            for (int i = 0; i < packageName.length - 1; i++) {
                previous = getOrCreatePackage(previous, packageName[i], r, factory);
            }
            correctedName = packageName[packageName.length - 1];
        }
        if (previous != null) {
            for (EClassifier lc : previous.getEClassifiers()) {
                if (lc instanceof EClass && lc.getName().equals(correctedName)) {
                    return (EClass) lc;
                }
            }
            EClass newClazz = factory.createEClass();
            newClazz.setName(correctedName);
            previous.getEClassifiers().add(newClazz);
            return newClazz;
        } else {
            for (EObject lc : r.getContents()) {
                if (lc instanceof EClass && ((EClass) lc).getName().equals(correctedName)) {
                    return (EClass) lc;
                }
            }
            EClass newClazz = factory.createEClass();
            newClazz.setName(correctedName);
            r.getContents().add(newClazz);
            return newClazz;
        }
    }

    public void convert2ecore(PsiFile psi, File target) throws Exception {
        HashMap<EReference, String> postProcess = new HashMap<EReference, String>();
        ResourceSetImpl rs = new ResourceSetImpl();
        Resource.Factory.Registry reg = Resource.Factory.Registry.INSTANCE;
        Map<String, Object> m = reg.getExtensionToFactoryMap();
        m.put("ecore", new XMIResourceFactoryImpl());
        Resource r = rs.createResource(URI.createURI(target.getAbsolutePath()));
        EcoreFactory factory = new EcoreFactoryImpl();
        for (PsiElement element : psi.getChildren()) {
            if (element instanceof MetaModelDeclaration) {
                MetaModelDeclaration declaration = (MetaModelDeclaration) element;
                MetaModelClassDeclaration classDeclaration = declaration.getClassDeclaration();
                if (classDeclaration != null) {
                    MetaModelTypeDeclaration typeDeclaration = classDeclaration.getTypeDeclaration();
                    EClass newType = getOrCreate(typeDeclaration.getIdent().getText(), r, factory);
                    //SuperTypes management
                    MetaModelParentsDeclaration parentDeclaration = classDeclaration.getParentsDeclaration();
                    if (parentDeclaration != null) {
                        for (PsiElement parentChild : parentDeclaration.getChildren()) {
                            if (parentChild instanceof MetaModelTypeDeclaration) {
                                MetaModelTypeDeclaration parent = (MetaModelTypeDeclaration) parentChild;
                                EClass parentClazz = getOrCreate(parent.getIdent().getText(), r, factory);
                                newType.getESuperTypes().add(parentClazz);
                            }
                        }
                    }
                    //Attributes and Relationships managements.
                    for (MetaModelRelationDeclaration relation : classDeclaration.getRelationDeclarationList()) {
                        String typeName = relation.getTypeDeclaration().getText();
                        final boolean[] isID = {false};
                        final boolean[] isContained = {false};
                        MetaModelAnnotations annotations = relation.getAnnotations();
                        if (annotations != null) {
                            annotations.acceptChildren(new PsiElementVisitor() {
                                @Override
                                public void visitElement(PsiElement element) {
                                    if ("@id".equals(element.getText())) {
                                        isID[0] = true;
                                    }
                                    if ("@contained".equals(element.getText())) {
                                        isContained[0] = true;
                                    }
                                }
                            });
                        }
                        //Process multiplicity
                        MetaModelMultiplicityDeclaration multiplicityDeclaration = relation.getMultiplicityDeclaration();
                        String lower = null;
                        String upper = null;
                        if (multiplicityDeclaration != null) {
                            if (multiplicityDeclaration.getMultiplicityDeclarationLower() != null) {
                                lower = multiplicityDeclaration.getMultiplicityDeclarationLower().getText();
                            }
                            if (multiplicityDeclaration.getMultiplicityDeclarationUpper() != null) {
                                upper = multiplicityDeclaration.getMultiplicityDeclarationUpper().getText();
                            }
                        }
                        EStructuralFeature structuralFeature = null;
                        if (PrimitiveTypes.isPrimitive(typeName)) {
                            //Create ECore Attribute
                            org.eclipse.emf.ecore.EAttribute eatt = factory.createEAttribute();
                            eatt.setName(relation.getRelationName().getIdent().getText());
                            eatt.setEType(getOrCreateDataType(PrimitiveTypes.toEcoreType(relation.getTypeDeclaration().getIdent().getText()), r, factory));
                            eatt.setID(isID[0]);
                            newType.getEStructuralFeatures().add(eatt);
                            structuralFeature = eatt;
                        } else {
                            //Create ECore Reference
                            EReference ref = factory.createEReference();
                            ref.setContainment(isContained[0]);
                            //TODO manage opposite
                            ref.setEType(getOrCreate(relation.getTypeDeclaration().getIdent().getText(), r, factory));
                            ref.setName(relation.getRelationName().getIdent().getText());
                            newType.getEStructuralFeatures().add(ref);
                            structuralFeature = ref;

                            MetaModelRelationOpposite opposite = relation.getRelationOpposite();
                            if (opposite != null) {
                                postProcess.put(ref, opposite.getIdent().getText());
                            }
                        }

                        if (lower != null) {
                            if (lower.equals("*")) {
                                structuralFeature.setLowerBound(-1);
                            } else {
                                structuralFeature.setLowerBound(Integer.parseInt(lower));
                            }
                        }
                        if (upper != null) {
                            if (upper.equals("*")) {
                                structuralFeature.setUpperBound(-1);
                            } else {
                                structuralFeature.setUpperBound(Integer.parseInt(upper));
                            }
                        }

                    }
                }
            }
        }

        //process opposite link
        for (Map.Entry<EReference, String> entry : postProcess.entrySet()) {
            boolean found = false;
            for (EReference ref : ((EClass) entry.getKey().getEType()).getEAllReferences()) {
                if (ref.getName().equals(entry.getValue())) {
                    entry.getKey().setEOpposite(ref);
                    found = true;
                }
            }
            if (!found) {
                throw new Exception("Opposite not found " + entry.getValue());
            }
        }

        try {
            r.save(Collections.EMPTY_MAP);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public PsiFile parser(File f) throws IOException {
        VirtualFile input = projectEnvironment.getEnvironment().getLocalFileSystem().findFileByIoFile(f);
        return parser(input);
    }

    public PsiFile parser(VirtualFile input) throws IOException {
        LightVirtualFile virtualFile = new LightVirtualFile("hello.mm", MetaModelLanguage.INSTANCE, new String(input.contentsToByteArray()));
        virtualFile.setCharset(CharsetToolkit.UTF8_CHARSET);
        return ((PsiFileFactoryImpl) PsiFileFactory.getInstance(project)).trySetupPsiForFile(virtualFile, MetaModelLanguage.INSTANCE, true, false);
    }

}

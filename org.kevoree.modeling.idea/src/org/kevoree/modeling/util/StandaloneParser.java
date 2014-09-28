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
import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling.MetaModelLanguage;
import org.kevoree.modeling.MetaModelLanguageType;
import org.kevoree.modeling.MetaModelParserDefinition;
import org.kevoree.modeling.idea.psi.*;

import java.io.File;
import java.io.IOException;
import java.util.*;

/**
 * Created by duke on 7/3/14.
 */
public class StandaloneParser {

    CoreProjectEnvironment projectEnvironment;

    Project project = null;

    public static void main(String[] args) throws Exception {
        StandaloneParser parser = new StandaloneParser();
        PsiFile psi = parser.parser(new File("/Users/duke/Documents/dev/dukeboard/kevoree/kevoree-core/org.kevoree.model/metamodel/org.kevoree.mm"));
        //PsiFile psi = parser.parser(new File("/Users/duke/Downloads/Polymer.mm"));


        File t = File.createTempFile("temp", ".ecore");
        //t.deleteOnExit();
        parser.check(psi);
        parser.convert2ecore(psi, t);

        /*
        PrettyPrinter prettyPrinter = new PrettyPrinter();
        PrintWriter w = new PrintWriter(System.err);
        prettyPrinter.prettyPrint(t, w);
        w.flush();
        */

        System.out.println(t.getAbsolutePath());

    }


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
        dt.setInstanceClassName(name);
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
            newP.setNsPrefix(packageName);
            newP.setNsURI("http://" + packageName);
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

    private EClassifier get(String name, Resource r, EcoreFactory factory) {
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
                if (lc.getName().equals(correctedName)) {
                    return lc;
                }
            }
            return null;
        } else {
            for (EObject lc : r.getContents()) {
                if (lc instanceof EClassifier && ((EClassifier) lc).getName().equals(correctedName)) {
                    return (EClassifier) lc;
                }
            }
            return null;
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

    private EEnum getOrCreateEnum(String name, Resource r, EcoreFactory factory) {
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
                if (lc instanceof EEnum && lc.getName().equals(correctedName)) {
                    return (EEnum) lc;
                }
            }
            EEnum newEnum = factory.createEEnum();
            newEnum.setName(correctedName);
            previous.getEClassifiers().add(newEnum);
            return newEnum;
        } else {
            for (EObject lc : r.getContents()) {
                if (lc instanceof EEnum && ((EClass) lc).getName().equals(correctedName)) {
                    return (EEnum) lc;
                }
            }
            EEnum newEnum = factory.createEEnum();
            newEnum.setName(correctedName);
            r.getContents().add(newEnum);
            return newEnum;
        }
    }


    public void convert2ecore(PsiFile psi, File target) throws Exception {
        if (!check(psi).isEmpty()) {
            throw new Exception("Error in PSI file, generation aborded !");
        }
        HashMap<EReference, String> postProcess = new HashMap<EReference, String>();
        ResourceSetImpl rs = new ResourceSetImpl();
        Resource.Factory.Registry reg = Resource.Factory.Registry.INSTANCE;
        Map<String, Object> m = reg.getExtensionToFactoryMap();
        m.put("ecore", new XMIResourceFactoryImpl());
        Resource r = rs.createResource(URI.createURI("file:///" + target.getAbsolutePath()));

        EcoreFactory factory = new EcoreFactoryImpl();
        //First pass process enum
        for (PsiElement element : psi.getChildren()) {
            if (element instanceof MetaModelDeclaration) {
                MetaModelDeclaration declaration = (MetaModelDeclaration) element;
                MetaModelEnumDeclaration enumDeclaration = declaration.getEnumDeclaration();
                if (enumDeclaration != null) {
                    MetaModelTypeDeclaration typeDeclaration = enumDeclaration.getTypeDeclaration();
                    EEnum newType = getOrCreateEnum(typeDeclaration.getIdent().getText(), r, factory);
                    for (MetaModelEnumElemDeclaration elem : enumDeclaration.getEnumElemDeclarationList()) {
                        EEnumLiteral literal = newType.getEEnumLiteralByLiteral(elem.getIdent().getText());
                        if (literal == null) {
                            literal = factory.createEEnumLiteral();
                            literal.setLiteral(elem.getIdent().getText());
                            literal.setName(elem.getIdent().getText());
                            newType.getELiterals().add(literal);
                        }
                    }
                }
            }
        }
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
                    for (MetaModelClassElemDeclaration decl : classDeclaration.getClassElemDeclarationList()) {
                        if (decl.getOperationDeclaration() != null) {
                            MetaModelOperationDeclaration operation = decl.getOperationDeclaration();
                            //check if exists
                            boolean exists = false;
                            for (EOperation op : newType.getEAllOperations()) {
                                if (op.getName().equals(operation.getOperationName().getIdent().getText())) {
                                    exists = true;
                                }
                            }
                            if (!exists) {
                                EOperation eopp = factory.createEOperation();
                                eopp.setName(operation.getOperationName().getIdent().getText());
                                newType.getEOperations().add(eopp);
                                if (operation.getOperationReturn() != null) {
                                    EClassifier previousFound = get(operation.getOperationReturn().getTypeDeclaration().getIdent().getText(), r, factory);
                                    if (previousFound == null) {
                                        if (PrimitiveTypes.isPrimitive(operation.getOperationReturn().getTypeDeclaration().getIdent().getText())) {
                                            previousFound = getOrCreateDataType(PrimitiveTypes.toEcoreType(operation.getOperationReturn().getTypeDeclaration().getIdent().getText()), r, factory);
                                        } else {
                                            previousFound = getOrCreate(operation.getOperationReturn().getTypeDeclaration().getIdent().getText(), r, factory);
                                        }
                                    }
                                    eopp.setEType(previousFound);
                                }
                                if (operation.getOperationParams() != null) {
                                    for (MetaModelOperationParam opp : operation.getOperationParams().getOperationParamList()) {
                                        EParameter epp = factory.createEParameter();
                                        epp.setName(opp.getIdent().getText());
                                        EClassifier previousFound = get(opp.getTypeDeclaration().getIdent().getText(), r, factory);
                                        if (previousFound == null) {
                                            if (PrimitiveTypes.isPrimitive(opp.getTypeDeclaration().getIdent().getText())) {
                                                previousFound = getOrCreateDataType(PrimitiveTypes.toEcoreType(opp.getTypeDeclaration().getIdent().getText()), r, factory);
                                            } else {
                                                previousFound = getOrCreate(opp.getTypeDeclaration().getIdent().getText(), r, factory);
                                            }
                                        }
                                        epp.setEType(previousFound);
                                        eopp.getEParameters().add(epp);
                                    }
                                }
                            }
                        }
                    }
                    for (MetaModelClassElemDeclaration decl : classDeclaration.getClassElemDeclarationList()) {
                        if (decl.getRelationDeclaration() != null) {
                            MetaModelRelationDeclaration relation = decl.getRelationDeclaration();
                            String typeName = relation.getTypeDeclaration().getText();
                            final boolean[] isID = {false};
                            final boolean[] isContained = {false};
                            final boolean[] isLearn = {false};
                            final String[] learnLevel = {""};
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
                                        if (element.getText() != null && element.getText().startsWith("@learn")) {
                                            isLearn[0] = true;
                                            MetaModelAnnotation annot = (MetaModelAnnotation) element;
                                            if (annot.getAnnotationParam() != null) {
                                                learnLevel[0] = annot.getAnnotationParam().getNumber().getText();
                                            }
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
                            EClassifier previousFound = get(relation.getTypeDeclaration().getIdent().getText(), r, factory);
                            if (PrimitiveTypes.isPrimitive(typeName) || previousFound instanceof EEnum) {
                                //Create ECore Attribute
                                org.eclipse.emf.ecore.EAttribute eatt = factory.createEAttribute();
                                eatt.setName(relation.getRelationName().getIdent().getText());
                                if (previousFound != null) {
                                    eatt.setEType(previousFound);
                                } else {
                                    eatt.setEType(getOrCreateDataType(PrimitiveTypes.toEcoreType(relation.getTypeDeclaration().getIdent().getText()), r, factory));
                                }
                                eatt.setID(isID[0]);
                                newType.getEStructuralFeatures().add(eatt);
                                structuralFeature = eatt;
                                if (isLearn[0]) {
                                    EAnnotation annotation = factory.createEAnnotation();
                                    annotation.setSource("learn");
                                    annotation.getDetails().put("level", learnLevel[0]);
                                    eatt.getEAnnotations().add(annotation);
                                }
                            } else {
                                //Create ECore Reference
                                EReference ref = factory.createEReference();
                                ref.setContainment(isContained[0]);
                                EClassifier founded = get(relation.getTypeDeclaration().getIdent().getText(), r, factory);
                                if (founded == null) {
                                    founded = getOrCreate(relation.getTypeDeclaration().getIdent().getText(), r, factory);
                                }
                                ref.setEType(founded);
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
        LightVirtualFile virtualFile = new LightVirtualFile("hello.mm", MetaModelLanguage.INSTANCE, new String(input.contentsToByteArray()).replace("\r", ""));
        virtualFile.setCharset(CharsetToolkit.UTF8_CHARSET);
        return ((PsiFileFactoryImpl) PsiFileFactory.getInstance(project)).trySetupPsiForFile(virtualFile, MetaModelLanguage.INSTANCE, true, false);
    }

    public List<String> check(PsiFile psiFile) {
        final List<String> errors = new ArrayList<String>();
        MetaModelVisitor visitor = new MetaModelVisitor() {

            @Override
            public void visitAnnotations(@NotNull MetaModelAnnotations psiElement) {
                MetaModelAnnotations annotations = (MetaModelAnnotations) psiElement;
                Boolean isAttribute = false;
                Boolean isReference = false;
                if (annotations.getParent() instanceof MetaModelRelationDeclaration) {
                    MetaModelRelationDeclaration declaration = (MetaModelRelationDeclaration) annotations.getParent();

                    for (PrimitiveTypes p : PrimitiveTypes.values()) {
                        if (p.name().equals(declaration.getTypeDeclaration().getName())) {
                            isAttribute = true;
                        }
                    }
                    isReference = true;
                } else {
                    errors.add("Annotation must be placed on references or attributes declaration");
                }
                final Boolean finalIsAttribute = isAttribute;
                final Boolean finalIsReference = isReference;
                annotations.acceptChildren(new PsiElementVisitor() {
                    @Override
                    public void visitElement(PsiElement element) {
                        if ("@id".equals(element.getText())) {
                            if (!finalIsAttribute) {
                                StringBuilder builder = new StringBuilder();
                                for (PrimitiveTypes p : PrimitiveTypes.values()) {
                                    if (builder.length() != 0) {
                                        builder.append(",");
                                    }
                                    builder.append(p.name());
                                }
                                errors.add("@id is only valid on attributes (with PrimitiveTypes: " + builder + ")");
                            }
                        } else {
                            if ("@contained".equals(element.getText())) {
                                if (!finalIsReference) {
                                    StringBuilder builder = new StringBuilder();
                                    for (PrimitiveTypes p : PrimitiveTypes.values()) {
                                        if (builder.length() != 0) {
                                            builder.append(",");
                                        }
                                        builder.append(p.name());
                                    }
                                    errors.add("@contained is only valid on references (WITHOUT PrimitiveTypes: " + builder + ")");
                                }
                            } else {
                                if (element.getText() != null && element.getText().startsWith("@learn")) {
                                    if (!finalIsAttribute) {
                                        StringBuilder builder = new StringBuilder();
                                        for (PrimitiveTypes p : PrimitiveTypes.values()) {
                                            if (builder.length() != 0) {
                                                builder.append(",");
                                            }
                                            builder.append(p.name());
                                        }
                                        errors.add("@learn is only valid on attributes (with PrimitiveTypes: " + builder + ")");
                                    }
                                } else {
                                    errors.add(element.getText() + " is not a valid annotation @id, @learn and @contained expected");
                                }
                            }
                        }
                    }
                });
            }

            @Override
            public void visitTypeDeclaration(final @NotNull MetaModelTypeDeclaration o) {
                for (PrimitiveTypes p : PrimitiveTypes.values()) {
                    if (o.getName().equals(p.name())) {
                        super.visitTypeDeclaration(o);
                        return;
                    }
                }
                if (o.getName() != null && o.getName().indexOf(".") < 1) {
                    errors.add("Type NamedElement must be a qualified name with at least one package : " + o.getName());
                }
                final boolean[] isValidated = {false};
                if (!isValidated[0]) {
                    PsiElement parent = o.getParent();
                    if (!(parent instanceof MetaModelClassDeclaration) && !(parent instanceof MetaModelEnumDeclaration)) {
                        PsiFile file = o.getContainingFile();
                        file.acceptChildren(new MetaModelVisitor() {
                            @Override
                            public void visitPsiElement(@NotNull PsiElement oo) {
                                super.visitPsiElement(oo);
                                if (!isValidated[0]) {
                                    oo.acceptChildren(this);
                                }
                            }

                            @Override
                            public void visitClassDeclaration(@NotNull MetaModelClassDeclaration oo) {
                                if (oo.getTypeDeclaration().getName().equals(o.getName())) {
                                    isValidated[0] = true;
                                }
                            }

                            @Override
                            public void visitEnumDeclaration(@NotNull MetaModelEnumDeclaration oo) {
                                if (oo.getTypeDeclaration().getName().equals(o.getName())) {
                                    isValidated[0] = true;
                                }
                            }
                        });
                        if (!isValidated[0]) {
                            errors.add("Type identifier not found, please declare corresponding class");
                        }
                    }
                }
                super.visitTypeDeclaration(o);
            }

            @Override
            public void visitPsiElement(@NotNull PsiElement o) {
                super.visitPsiElement(o);
                o.acceptChildren(this);
            }
        };
        psiFile.acceptChildren(visitor);
        return errors;
    }

}

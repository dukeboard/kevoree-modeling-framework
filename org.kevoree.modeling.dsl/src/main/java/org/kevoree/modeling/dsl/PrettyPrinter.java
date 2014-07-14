package org.kevoree.modeling.dsl;

import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.common.util.TreeIterator;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;

/**
 * Created by gregory.nain on 03/07/2014.
 */
public class PrettyPrinter {


    public String prettyPrint(File ecoreModel) {

        StringWriter sw = new StringWriter();
        ResourceSet rs = getEcoreModel(ecoreModel);
        TreeIterator<Notifier> iterator = rs.getAllContents();
        while (iterator.hasNext()) {
            Notifier notifier = iterator.next();
            if (notifier instanceof EClass) {
                printClass(sw, (EClass) notifier);
            }
        }
        return sw.toString();

    }

    public String convertType(String typeName) {
        return PrimitiveTypes.convert(typeName);
    }

    private void printClass(StringWriter sw, EClass cls) {
        String superTypes = "";
        if (!cls.getESuperTypes().isEmpty()) {
            for (EClassifier st : cls.getESuperTypes()) {
                superTypes = superTypes + (superTypes.equals("") ? ": " : ",") + fqn(st);
            }
        }

        sw.write("\n");
        sw.write("class " + fqn(cls) + " " + superTypes + " {\n");

        for (EAttribute eAttribute : cls.getEAttributes()) {
            if (eAttribute.isID()) {
                sw.write("    @id\n");
            }
            String multiplicity = "";
            if(eAttribute.getUpperBound() != 1 && eAttribute.getLowerBound() != 1){
                multiplicity = multiplicity + "[";
                if(eAttribute.getLowerBound() == -1){
                    multiplicity = multiplicity + "*";
                } else {
                    multiplicity = multiplicity + eAttribute.getLowerBound();
                }
                multiplicity = multiplicity + ",";
                if(eAttribute.getUpperBound() == -1){
                    multiplicity = multiplicity + "*";
                } else {
                    multiplicity = multiplicity + eAttribute.getUpperBound();
                }
                multiplicity = multiplicity + "]";
            }
            sw.append("    " + eAttribute.getName() + " : " + convertType(fqn(eAttribute.getEType())) +multiplicity+ "\n");
        }

        for (EReference eRef : cls.getEReferences()) {
            if (eRef.isContainment()) {
                sw.write("    @contained\n");
            }
            String multiplicity = "";
            String opposite = "";
            if(eRef.getUpperBound() != 1 && eRef.getLowerBound() != 1){
                multiplicity = multiplicity + "[";
                if(eRef.getLowerBound() == -1){
                    multiplicity = multiplicity + "*";
                } else {
                    multiplicity = multiplicity + eRef.getLowerBound();
                }
                multiplicity = multiplicity + ",";
                if(eRef.getUpperBound() == -1){
                    multiplicity = multiplicity + "*";
                } else {
                    multiplicity = multiplicity + eRef.getUpperBound();
                }
                multiplicity = multiplicity + "]";
            }
            if(eRef.getEOpposite()!= null){
                opposite = " oppositeOf "+eRef.getEOpposite().getName();
            }
            sw.append("    " + eRef.getName() + " : " + convertType(fqn(eRef.getEType())) +multiplicity+ opposite+ "\n");
        }

        sw.write("}\n");
    }


    protected ResourceSet getEcoreModel(File ecorefile) {

        ResourceSetImpl rs = new ResourceSetImpl();
        Resource.Factory.Registry.INSTANCE.getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());
        try {


            System.out.println("[INFO] Loading model file " + ecorefile.getAbsolutePath());
            URI fileUri = URI.createFileURI(ecorefile.getCanonicalPath());
            Resource resource = rs.createResource(fileUri);
            resource.load(null);
            EcoreUtil.resolveAll(resource);
            rs.getResources().add(resource);
            EcoreUtil.resolveAll(rs);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return rs;
    }


    /**
     * Computes the Fully Qualified Name of the package in the context of the model.
     *
     * @param pack the package which FQN has to be computed
     * @return the Fully Qualified package name
     */
    public String fqn(EPackage pack) {

        if (pack == null) {
            try {
                throw new Exception("Null Package , stop generation");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        String locFqn = pack.getName().toLowerCase();
        EPackage parentPackage = pack.getESuperPackage();
        while (parentPackage != null) {
            locFqn = parentPackage.getName() + "." + locFqn;
            parentPackage = parentPackage.getESuperPackage();
        }
        return locFqn;
    }

    /**
     * Computes the Fully Qualified Name of the class in the context of the model.
     *
     * @param cls the class which FQN has to be computed
     * @return the Fully Qualified Class name
     */
    public String fqn(EClassifier cls) {
        if (cls.getEPackage() == null) {
            return cls.getName();
        } else {
            return fqn(cls.getEPackage()) + "." + cls.getName();
        }
    }

}

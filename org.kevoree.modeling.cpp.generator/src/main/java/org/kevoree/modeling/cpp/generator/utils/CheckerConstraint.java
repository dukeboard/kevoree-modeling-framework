package org.kevoree.modeling.cpp.generator.utils;

import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.XMIResource;
import org.kevoree.modeling.cpp.generator.GenerationContext;

import java.io.IOException;
import java.util.Iterator;

/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 29/10/13
 * Time: 16:09
 * To change this templates use File | Settings | File Templates.
 */
public class CheckerConstraint
{
    private GenerationContext context;

    public CheckerConstraint(GenerationContext context) {
       this.context = context;
    }

    public void verify(XMIResource resource) throws IOException {

        resource.load(null) ;
        EcoreUtil.resolveAll(resource);
        for (Iterator i = resource.getAllContents(); i.hasNext();) {
            EObject eo = (EObject)i.next();

            if(eo instanceof EClass){

                // checker
                EClass c = (EClass) eo;
                c.setName(ConverterDataTypes.getInstance().check_class(c.getName()));
                Boolean hasid= false;
                for(EAttribute a : c.getEAllAttributes()){
                    a.setName(ConverterDataTypes.getInstance().check_class(a.getName()));
                    if(a.isID()){
                        hasid = true;
                    }
                }
                if(!hasid){
                    System.out.println("INFO : ADDING UNIQUE ID  "+c.getName());
                    EAttribute generatedKmfIdAttribute = EcoreFactory.eINSTANCE.createEAttribute();
                    generatedKmfIdAttribute.setID(true);
                    generatedKmfIdAttribute.setName("generated_KMF_ID");
                    generatedKmfIdAttribute.setEType(EcorePackage.eINSTANCE.getEString());
                    c.getEStructuralFeatures().add(generatedKmfIdAttribute);

                }
                for(EReference a : c.getEAllReferences()){
                    a.setName(ConverterDataTypes.getInstance().check_class(a.getName()));
                    a.getEReferenceType().setName(ConverterDataTypes.getInstance().check_class(a.getEReferenceType().getName()));
                }



            }
    }         }
}

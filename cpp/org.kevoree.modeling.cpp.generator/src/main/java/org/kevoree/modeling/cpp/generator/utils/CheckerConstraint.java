package org.kevoree.modeling.cpp.generator.utils;

import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.XMIResource;
import org.kevoree.modeling.cpp.generator.GenerationContext;

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

    public void verify(XMIResource resource) throws Exception {

        resource.load(null) ;
        EcoreUtil.resolveAll(resource);
        for (Iterator i = resource.getAllContents(); i.hasNext();) {
            EObject eo = (EObject)i.next();

            if(eo instanceof EClass){

                // checker
                EClass c = (EClass) eo;
                c.setName(ConverterDataTypes.getInstance().check_class_name(c.getName()));
                Boolean hasid= false;
                for(EAttribute a : c.getEAllAttributes()){

                    a.setName(ConverterDataTypes.getInstance().check_class_name(a.getName()));

                    if(a.isID()){
                        hasid = true;
                    }
                }
                if(!hasid){
                    System.out.println("INFO : ADDING UNIQUE ID  "+c.getName());
                    EAttribute generatedKmfIdAttribute = EcoreFactory.eINSTANCE.createEAttribute();
                    generatedKmfIdAttribute.setID(true);
                    generatedKmfIdAttribute.setName(HelperGenerator.internal_id_name);
                    generatedKmfIdAttribute.setEType(EcorePackage.eINSTANCE.getEString());
                    c.getEStructuralFeatures().add(generatedKmfIdAttribute);

                }
                for(EReference a : c.getEAllReferences())
                {   if(a.getEReferenceType() != null){
                    if(a.getEReferenceType().getName() ==null){
                        throw new Exception("no type define for"+a.getName());
                    }
                    a.setName(ConverterDataTypes.getInstance().check_class_name(a.getName()));
                    a.getEReferenceType().setName(ConverterDataTypes.getInstance().check_class_name(a.getEReferenceType().getName()));
                }    else {
                    throw new Exception("TODO  type define for"+a.getName());

                }
                }



            }
    }         }
}

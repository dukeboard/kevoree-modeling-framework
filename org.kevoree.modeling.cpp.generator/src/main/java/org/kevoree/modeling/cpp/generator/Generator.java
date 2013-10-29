package org.kevoree.modeling.cpp.generator;



import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.impl.EClassImpl;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.XMIResource;
import org.eclipse.emf.ecore.xmi.impl.EcoreResourceFactoryImpl;
import org.kevoree.modeling.cpp.generator.model.ClassGenerator;
import org.kevoree.modeling.cpp.generator.utils.FileManager;
import org.kevoree.modeling.cpp.generator.utils.HelperGenerator;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 28/10/13
 * Time: 11:46
 * To change this template use File | Settings | File Templates.
 */
public class Generator {

    private GenerationContext context;
    private File ecoreFile;
    private StringBuilder classes = new StringBuilder();


    public Generator(GenerationContext ctx)
    {
        this.context =ctx;
        this.ecoreFile = ctx.getEcore();
    }

    public void generateModel(String version) throws IOException {
        URI fileUri =  URI.createFileURI(ecoreFile.getAbsolutePath());
        Resource.Factory.Registry.INSTANCE.getExtensionToFactoryMap().put("ecore", new EcoreResourceFactoryImpl());
        ResourceSetImpl rs = new ResourceSetImpl();
        XMIResource resource = (XMIResource) rs.createResource(fileUri);
        resource.load(null) ;
        EcoreUtil.resolveAll(resource);
        String package_name ="default";
        StringBuilder   list_file_h = new StringBuilder();

        ClassGenerator classGenerator =new ClassGenerator(context);

        for (Iterator i = resource.getAllContents(); i.hasNext();) {
            EObject eo = (EObject)i.next();

            if(eo instanceof EClass){
                classGenerator.generateClass((EClass) eo);
                classes.append(HelperGenerator.genIncludeLocal(((EClass) eo).getName()));

            }  else if(eo instanceof EPackage)
            {

                context.setName_package( ((EPackage) eo).getNsPrefix());
                try {
                    context.setRoot(((EClassImpl)EcoreUtil.getRootContainer(eo).eContents().get(0)).getName());

                }   catch (Exception e){

                }
            }



        }

        String output =   context.getRootGenerationDirectory()+File.separatorChar+context.getName_package()+File.separatorChar;

        FileManager.writeFile(output + context.getName_package() + ".h", classes.toString(), false);
    }
}

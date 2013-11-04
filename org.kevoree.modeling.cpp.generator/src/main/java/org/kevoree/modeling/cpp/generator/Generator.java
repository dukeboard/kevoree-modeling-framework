package org.kevoree.modeling.cpp.generator;



import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.impl.EClassImpl;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.XMIResource;
import org.eclipse.emf.ecore.xmi.impl.EcoreResourceFactoryImpl;
import org.kevoree.modeling.cpp.generator.model.ClassGenerator;
import org.kevoree.modeling.cpp.generator.model.FactoryGenerator;
import org.kevoree.modeling.cpp.generator.utils.ConverterDataTypes;
import org.kevoree.modeling.cpp.generator.utils.FileManager;
import org.kevoree.modeling.cpp.generator.utils.HelperGenerator;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;

/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 28/10/13
 * Time: 11:46
 * To change this templates use File | Settings | File Templates.
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
        FactoryGenerator factoryGenerator = new FactoryGenerator(context);


        for (Iterator i = resource.getAllContents(); i.hasNext();) {
            EObject eo = (EObject)i.next();

            if(eo instanceof EClass){

                // checker
                EClass c = (EClass) eo;
                c.setName(ConverterDataTypes.getInstance().check_class(c.getName()));
                for(EAttribute a : c.getEAllAttributes()){
                    a.setName(ConverterDataTypes.getInstance().check_class(a.getName()));
                }
                for(EReference a : c.getEAllReferences()){
                    a.setName(ConverterDataTypes.getInstance().check_class(a.getName()));

                    a.getEReferenceType().setName(ConverterDataTypes.getInstance().check_class(a.getEReferenceType().getName()));
                }

                String curent = classGenerator.generateClass((EClass) eo);
                FileManager.writeFile(context.getPackageGenerationDirectory()+"classes.cpp", curent,true);
                classes.append(HelperGenerator.genIncludeLocal(((EClass) eo).getName()));

            }  else if(eo instanceof EPackage)
            {

                context.setName_package( ((EPackage) eo).getNsPrefix());

                try {
                    context.setRoot(((EClassImpl)EcoreUtil.getRootContainer(eo).eContents().get(0)).getName());

                }   catch (Exception e){

                }
                System.out.println(context.getName_package());
                FileManager.writeFile(context.getPackageGenerationDirectory()+"classes.cpp", HelperGenerator.genIncludeLocal(context.getName_package()),false);
            }



        }

        String output =   context.getRootGenerationDirectory()+File.separatorChar+context.getName_package()+File.separatorChar;

        FileManager.writeFile(output + context.getName_package() + ".h", classes.toString(), false);
    }
}

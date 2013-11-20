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
import org.kevoree.modeling.cpp.generator.utils.CheckerConstraint;
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
    private EnvironnementBuilder cmakeGenerator;


    public Generator(GenerationContext ctx)
    {
        this.context =ctx;
        this.ecoreFile = ctx.getEcore();
        cmakeGenerator = new EnvironnementBuilder(ctx);
    }

    public void generateModel() throws Exception {

        URI fileUri =  URI.createFileURI(ecoreFile.getAbsolutePath());
        Resource.Factory.Registry.INSTANCE.getExtensionToFactoryMap().put("ecore", new EcoreResourceFactoryImpl());
        ResourceSetImpl rs = new ResourceSetImpl();
        XMIResource resource = (XMIResource) rs.createResource(fileUri);

        String package_name ="default";
        StringBuilder   list_file_h = new StringBuilder();

        CheckerConstraint checkerConstraint = new CheckerConstraint(context);
        checkerConstraint.verify(resource);


        ClassGenerator classGenerator =new ClassGenerator(context);



        FactoryGenerator factoryGenerator=null;

        resource.load(null) ;
        EcoreUtil.resolveAll(resource);

        for (Iterator i = resource.getAllContents(); i.hasNext();) {
            EObject eo = (EObject)i.next();

            if(eo instanceof EClass)
            {

                classGenerator.generateClass((EClass) eo);
                factoryGenerator.generateFactory((EClass) eo);

                classes.append(HelperGenerator.genIncludeLocal(((EClass) eo).getName()));

            }  else if(eo instanceof EPackage)
            {
                               String name =   ((EPackage) eo).getNsPrefix();

                context.setName_package( name.replace(".",""));

                try {
                    context.setRoot(((EClassImpl)EcoreUtil.getRootContainer(eo).eContents().get(0)).getName());

                }   catch (Exception e){

                }

                FileManager.writeFile(context.getPackageGenerationDirectory()+"classes.cpp", HelperGenerator.genIncludeLocal(context.getName_package()),false);
                factoryGenerator= new FactoryGenerator(context);
            }



        }
        factoryGenerator.write();
        String output =   context.getRootGenerationDirectory()+File.separatorChar+context.getName_package()+File.separatorChar;

        FileManager.writeFile(output + context.getName_package() + ".h", classes.toString(), false);
    }


    public void generateEnvironnement() throws IOException {
        cmakeGenerator.execute();
    }





}

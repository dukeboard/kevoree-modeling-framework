

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.XMIResource;
import org.eclipse.emf.ecore.xmi.impl.EcoreResourceFactoryImpl;
import org.kevoree.modeling.cpp.generator.GenerationContext;
import org.kevoree.modeling.cpp.generator.Generator;


import java.io.File;
import java.io.IOException;
import java.util.Iterator;

/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 28/10/13
 * Time: 11:04
 * To change this template use File | Settings | File Templates.
 */
public class Main {


    public static void main(String argv[]) throws IOException {

        GenerationContext context = new GenerationContext();
        context.setRootGenerationDirectory("src/main/resources/gen/src");
        context.setEcore("src/main/resources/metamodel/planrouge.ecore");



       Generator gen = new Generator(context);
        gen.generateModel("1.0");




    }
}

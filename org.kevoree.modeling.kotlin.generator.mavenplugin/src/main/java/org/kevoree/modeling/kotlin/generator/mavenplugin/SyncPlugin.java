package org.kevoree.modeling.kotlin.generator.mavenplugin;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.apache.maven.plugins.annotations.ResolutionScope;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.BasicExtendedMetaData;
import org.eclipse.emf.ecore.util.ExtendedMetaData;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;
import org.eclipse.xsd.ecore.EcoreSchemaBuilder;
import org.eclipse.xsd.ecore.XSDEcoreBuilder;
import org.eclipse.xsd.util.XSDResourceImpl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

/**
 * Created by duke on 5/22/14.
 */

@Mojo(name = "sync", defaultPhase = LifecyclePhase.COMPILE, requiresDependencyResolution = ResolutionScope.COMPILE)
public class SyncPlugin extends AbstractMojo {


    public static final String ECORE_FILE_OPTION = "ecore";
    public static final String XSD_FILE_OPTION = "xsd";

    /**
     * Ecore file
     */
    @Parameter
    private File ecore;

    @Override
    public void execute() throws MojoExecutionException, MojoFailureException {
        if (ecore != null) {
            getLog().info(ecore.getAbsolutePath());
        }

        if (ecore != null && ecore.getAbsolutePath().endsWith(".xsd")) {
            String targetF = ecore.getAbsolutePath().replace(".xsd", ".ecore");
            xsd2ecore(ecore.getAbsolutePath(), targetF);
            getLog().info("Generate " + targetF);
        }
        if (ecore != null && ecore.getAbsolutePath().endsWith(".ecore")) {
            String targetF = ecore.getAbsolutePath().replace(".ecore", ".xsd");
            try {
                ecore2xsd(ecore.getAbsolutePath(), targetF);
                getLog().info("Generate " + targetF);
            } catch (IOException e) {
                getLog().error(e);
            }
        }

    }

    public void xsd2ecore(String sourcename, String targetname) {
        XSDEcoreBuilder xsdEcoreBuilder = new XSDEcoreBuilder();
        ResourceSet resourceSet = new ResourceSetImpl();
        Collection eCorePackages = xsdEcoreBuilder.generate(URI.createFileURI(sourcename));
        resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put("xmi", new XMIResourceFactoryImpl());
        Resource resource = resourceSet.createResource(URI.createFileURI(targetname));
        for (Iterator iter = eCorePackages.iterator(); iter.hasNext(); ) {
            EObject element = (EObject) iter.next();
            resource.getContents().add(element);
        }

        try {
            resource.save(null);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void ecore2xsd(String sourcename, String targetname) throws IOException {
        URI sourceURI = URI.createURI(sourcename);
        URI targetURI = URI.createURI(targetname);
        ResourceSet set = new ResourceSetImpl();
        set.getResourceFactoryRegistry().getExtensionToFactoryMap().put(
                Resource.Factory.Registry.DEFAULT_EXTENSION,
                new XMIResourceFactoryImpl());
        Resource resource = set.getResource(sourceURI, true);
        List<EPackage> models = new ArrayList<EPackage>();
        for (EObject o : resource.getContents()) {
            if (o instanceof EPackage)
                models.add((EPackage) o);
            else
                throw new RuntimeException("File contains object that is not an EPackage : " + o);
        }

        Resource xsdResource = new XSDResourceImpl(targetURI);
        ExtendedMetaData xmd = new BasicExtendedMetaData();
        EcoreSchemaBuilder builder = new EcoreSchemaBuilder(xmd);
        for (EPackage ePackage : models) {
            xsdResource.getContents().add(builder.getSchema(ePackage));
        }
        xsdResource.save(null);

    }

}

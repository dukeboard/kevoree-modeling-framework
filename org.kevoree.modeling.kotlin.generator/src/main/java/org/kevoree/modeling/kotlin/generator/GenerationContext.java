/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * Fouquet Francois
 * Nain Gregory
 */
package org.kevoree.modeling.kotlin.generator;

import java.io.*;
import java.util.*;

import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.common.util.TreeIterator;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.XMIResource;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;
import org.kevoree.modeling.aspect.NewMetaClassCreation;
import org.kevoree.modeling.aspect.AspectClass;

/**
 * Created by IntelliJ IDEA.
 * User: gregory.nain
 * Date: 21/03/12
 * Time: 13:43
 */

public class GenerationContext {

    public Boolean timeAware = false;

    public Boolean persistence = false ;

    public String autoBasePackage = "kmf";

    public Boolean ecma3compat = false ;

    public HashMap<String, AspectClass> aspects = new HashMap<String, AspectClass>();

    public List<NewMetaClassCreation> newMetaClasses = new ArrayList<NewMetaClassCreation>()  ;

    /**
     * True if selectByQuery methods have to be generated
     */
    public Boolean genSelector = false;

    /**
     * Package to be added before the RootPackage of the model
     * eg: Root package in the model: 'kevoree'; value of packagePrefix: 'org' would generate code in org.kevoree
     */
    public String packagePrefix = null;

    /**
     * Base folder for the generation process
     * example: "${project.build.directory}/generated-sources/kmf"
     */
    public File rootGenerationDirectory = null;

    public File rootSrcDirectory = null;

    /**
     * Folder containing sources created by users
     * example "src/main/java"
     */
    public File rootUserDirectory = null;


    public List<EClass> getChildrenOf(final EClass parent, XMIResource resource ) {
        final ArrayList<EClass> children = new ArrayList<EClass>();
        TreeIterator<EObject> iterator = resource.getAllContents();
        while(iterator.hasNext()) {
            EObject cls = iterator.next();
            if(cls instanceof EClass && ((EClass)cls).getESuperTypes().contains(parent)) {
                children.add(((EClass)cls));
            }
        }
        return children;
    }


    public void checkEID(EClass current) {
        boolean idFound = false;
        for(EAttribute att : current.getEAllAttributes()){
            if(att.isID()) {
                idFound = true;
                break;
            }
        }
        if(!idFound) {
            EAttribute generatedKmfIdAttribute = EcoreFactory.eINSTANCE.createEAttribute();
            generatedKmfIdAttribute.setID(true);
            generatedKmfIdAttribute.setName("generated_KMF_ID");
            generatedKmfIdAttribute.setEType(EcorePackage.eINSTANCE.getEString());
            current.getEStructuralFeatures().add(generatedKmfIdAttribute);
        }

    }

    public List<File> getRecursiveListOfFiles(File dir, final String ext) {
        ArrayList<File> result = new ArrayList<File>();
        result.addAll(Arrays.asList(dir.listFiles(new FilenameFilter() {
            public boolean accept(File dir, String name) {
                return name.endsWith(ext);
            }
        })));

        for(File subDir : dir.listFiles(new FileFilter() {
            @Override
            public boolean accept(File pathname) {
                return pathname.isDirectory();
            }
        })) {
            result.addAll(getRecursiveListOfFiles(subDir, ext));
        }
        return result;
    }

    private HashMap<File, ResourceSet> cacheEcore = new HashMap<File, ResourceSet>();

    public ResourceSet getEcoreModel(File ecorefile) {
        if (cacheEcore.containsKey(ecorefile)) {
            return cacheEcore.get(ecorefile);
        }

        ResourceSetImpl rs = new ResourceSetImpl();
        Resource.Factory.Registry.INSTANCE.getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());
        try {

            if (ecorefile.isDirectory()) {
                List<File> ecoreFiles = getRecursiveListOfFiles(ecorefile, "ecore");
                for(File eFile : ecoreFiles) {

                    System.out.println("Include Ecore File : " + eFile.getCanonicalPath());

                    Resource resource = rs.createResource(URI.createFileURI(eFile.getCanonicalPath()));
                    resource.load(null);
                    EcoreUtil.resolveAll(resource);
                    rs.getResources().add(resource);
                    EcoreUtil.resolveAll(rs);

                }
            } else {
                System.out.println("[INFO] Loading model file " + ecorefile.getAbsolutePath());
                URI fileUri = URI.createFileURI(ecorefile.getCanonicalPath());
                Resource resource = rs.createResource(fileUri);
                resource.load(null);
                EcoreUtil.resolveAll(resource);
                rs.getResources().add(resource);
                EcoreUtil.resolveAll(rs);
            }

            TreeIterator<Notifier> iterator = rs.getAllContents();
            while(iterator.hasNext()) {
                Notifier notifier = iterator.next();
                if (notifier instanceof EClass) {
                    checkEID((EClass) notifier);
                }
            }

            cacheEcore.put(ecorefile, rs);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return rs;
    }

    /**
     * Fully Qualified Name of the KMF Container Interface
     */
    public String kevoreeContainer = null;

    /**
     * Fully Qualified Name of the KMF Container Implementation
     */
    public String kevoreeContainerImplFQN = "";


    /**
     * Name of the cache class used in SelectByQuery methods.
     * Example: KevoreeResolverCacheInternal
     */
    public String kevoreeCacheResolver = "";


    /**
     * Store of FQN of EClasses for which the loader method has already been generated
     */
    public ArrayList<String> generatedLoaderFiles = new ArrayList<String>();

    /**
     * PrintWriter used for all the loader generation
     */
    public PrintWriter loaderPrintWriter = null;


    /**
     * hosts the package name of the Cloner
     * example "org.kevoree.cloner"
     */
    public String clonerPackage = "";


    //Maps a package with its factory (eg. org.kevoree => org.kevoree.KevoreeFactory)
    public HashMap<String, String> packageFactoryMap = new HashMap<String, String>();
    //Maps a class with its factory (eg. org.kevoree.ContainerRoot => org.kevoree.KevoreeFactory)
    public HashMap<String, String> classFactoryMap = new HashMap<String, String>();

    /**
     * Recursively registers the factories in the maps, though the subpackages relation
     * @param pack : The package where to start the registration
     */
    public void registerFactory(EPackage pack) {

        if (pack.getName() == null || pack.getName().equals("")) {
            return;
        }

        if (pack.getEClassifiers().size() > 0) {

            String formattedFactoryName = pack.getName().substring(0, 1).toUpperCase();
            formattedFactoryName += pack.getName().substring(1);
            formattedFactoryName += "Factory";

            String packageName = ProcessorHelper.getInstance().fqn(this, pack);
            String completeFactoryName = packageName + "." + formattedFactoryName;
            packageFactoryMap.put(packageName, completeFactoryName);
            for(EClassifier cls : pack.getEClassifiers()) {
                classFactoryMap.put(pack + "." + cls.getName(), completeFactoryName);
            }
        }

        for(EPackage subPackage : pack.getESubpackages()) {
            registerFactory(subPackage);
        }
    }

    /**
     * Tells if the code must be JavaScript compliant
     */
    public Boolean js = false;

    public Boolean flyweightFactory = false;

    public Boolean generateEvents = false;

    public EPackage basePackageForUtilitiesGeneration = null;

    public File baseLocationForUtilitiesGeneration = null;

    public void setBaseLocationForUtilitiesGeneration(File metamodelFile) {

        ResourceSet metamodel = getEcoreModel(metamodelFile);

        final ArrayList<EPackage> packages = new ArrayList<EPackage>();

        TreeIterator<Notifier> iterator =  metamodel.getAllContents();
        while(iterator.hasNext()) {
            Notifier notifier = iterator.next();
            if (notifier instanceof EPackage && ((EPackage) notifier).getESuperPackage() == null) {
                // Root package
                packages.add((EPackage) notifier);
            }
        }

        if (packages.size() > 1) {
            // Many packages at the root.
            basePackageForUtilitiesGeneration = EcoreFactory.eINSTANCE.createEPackage();
            basePackageForUtilitiesGeneration.setName(autoBasePackage);
            if (packagePrefix != null) {
                baseLocationForUtilitiesGeneration = new File(rootGenerationDirectory.getAbsolutePath() + File.separator + packagePrefix.replace(".", File.separator) + File.separator + basePackageForUtilitiesGeneration.getName());
            } else {
                baseLocationForUtilitiesGeneration = new File(rootGenerationDirectory.getAbsolutePath() + File.separator + basePackageForUtilitiesGeneration.getName());
            }

        } else if (packages.size() == 1) {
            // One package at the root.
            if (packages.get(0).getEClassifiers().size() > 0) {
                // Classifiers in this root package
                basePackageForUtilitiesGeneration = packages.get(0);
                baseLocationForUtilitiesGeneration = new File(rootGenerationDirectory.getAbsolutePath() + File.separator + ProcessorHelper.getInstance().fqn(this, packages.get(0)).replace(".", File.separator) + File.separator);
            } else {
                baseLocationForUtilitiesGeneration = checkBaseLocation(packages.get(0));
            }
        }
    }

    private File checkBaseLocation(EPackage rootElement) {
        LinkedList<EPackage> packageList = new LinkedList<EPackage>();
        packageList.addLast(rootElement);
        File f = null;

        while (f == null && packageList.size() > 0) {
            EPackage currentPackage = packageList.pollFirst();

            for(EPackage subPack : currentPackage.getESubpackages()) {
                if (subPack.getEClassifiers().size() > 0) {
                    basePackageForUtilitiesGeneration = currentPackage;
                    f = new File(rootGenerationDirectory.getAbsolutePath() + File.separator + ProcessorHelper.getInstance().fqn(this, currentPackage).replace(".", File.separator) + File.separator);
                    break;
                }
            }
            if (f == null) {
                packageList.addAll(currentPackage.getESubpackages());
            }
        }
        return f;
    }

    public Boolean getTimeAware() {
        return timeAware;
    }

    public Boolean getPersistence() {
        return persistence;
    }

    public String getAutoBasePackage() {
        return autoBasePackage;
    }

    public Boolean getEcma3compat() {
        return ecma3compat;
    }

    public HashMap<String, AspectClass> getAspects() {
        return aspects;
    }

    public List<NewMetaClassCreation> getNewMetaClasses() {
        return newMetaClasses;
    }

    public Boolean getGenSelector() {
        return genSelector;
    }

    public String getPackagePrefix() {
        return packagePrefix;
    }

    public File getRootGenerationDirectory() {
        return rootGenerationDirectory;
    }

    public File getRootSrcDirectory() {
        return rootSrcDirectory;
    }

    public File getRootUserDirectory() {
        return rootUserDirectory;
    }

    public String getKevoreeContainer() {
        return kevoreeContainer;
    }

    public String getKevoreeContainerImplFQN() {
        return kevoreeContainerImplFQN;
    }

    public String getKevoreeCacheResolver() {
        return kevoreeCacheResolver;
    }

    public ArrayList<String> getGeneratedLoaderFiles() {
        return generatedLoaderFiles;
    }

    public PrintWriter getLoaderPrintWriter() {
        return loaderPrintWriter;
    }

    public String getClonerPackage() {
        return clonerPackage;
    }

    public HashMap<String, String> getPackageFactoryMap() {
        return packageFactoryMap;
    }

    public HashMap<String, String> getClassFactoryMap() {
        return classFactoryMap;
    }

    public Boolean getJs() {
        return js;
    }

    public Boolean getFlyweightFactory() {
        return flyweightFactory;
    }

    public Boolean getGenerateEvents() {
        return generateEvents;
    }

    public EPackage getBasePackageForUtilitiesGeneration() {
        return basePackageForUtilitiesGeneration;
    }

    public File getBaseLocationForUtilitiesGeneration() {
        return baseLocationForUtilitiesGeneration;
    }
}
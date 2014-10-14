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

import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.common.util.TreeIterator;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EcoreFactory;
import org.eclipse.emf.ecore.EcorePackage;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;

import java.io.File;
import java.io.FileFilter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: gregory.nain
 * Date: 21/03/12
 * Time: 13:43
 */

public class GenerationContext {

    public Boolean timeAware = false;

    public Boolean persistence = false;

    public String autoBasePackage = "kmf";

    public Boolean ecma3compat = false;

    /**
     * Base folder for the generation process
     * example: "${project.build.directory}/generated-sources/kmf"
     */
    public File rootGenerationDirectory = null;

    public File rootCompilationDirectory = null;

    /**
     * Folder containing sources created by users
     * example "src/main/java"
     */
    public File rootUserDirectory = null;

    public void checkEID(EClass current) {
        boolean idFound = false;
        for (EAttribute att : current.getEAllAttributes()) {
            if (att.isID()) {
                idFound = true;
                break;
            }
        }
        if (!idFound) {
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

        for (File subDir : dir.listFiles(new FileFilter() {
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
                for (File eFile : ecoreFiles) {

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
            while (iterator.hasNext()) {
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
     * Tells if the code must be JavaScript compliant
     */
    public Boolean js = false;

    public Boolean generateEvents = false;

    public String basePackageForUtilitiesGeneration = null;

    public File baseLocationForUtilitiesGeneration = null;

    public String metaModelName = null;

    public String formattedName = null;

    public void setBaseLocationForUtilitiesGeneration(String targetName) throws Exception {
        basePackageForUtilitiesGeneration = targetName.toLowerCase();
        baseLocationForUtilitiesGeneration = new File((rootGenerationDirectory.getAbsolutePath() + File.separator + basePackageForUtilitiesGeneration.replace(".", File.separator)).toLowerCase());
        metaModelName = targetName;
        if (targetName.contains(".")) {
            formattedName = targetName.substring(targetName.lastIndexOf(".") + 1);
        } else {
            formattedName = targetName;
        }
        formattedName = formattedName.substring(0, 1).toUpperCase() + formattedName.substring(1);
    }

    public Boolean getTimeAware() {
        return timeAware;
    }

    public Boolean getPersistence() {
        return persistence;
    }

    public File getRootGenerationDirectory() {
        return rootGenerationDirectory;
    }


    public String getKevoreeContainer() {
        return kevoreeContainer;
    }

    public String getKevoreeContainerImplFQN() {
        return kevoreeContainerImplFQN;
    }

    public Boolean getJs() {
        return js;
    }

    public Boolean getGenerateEvents() {
        return generateEvents;
    }


    public String getBasePackageForUtilitiesGeneration() {
        return basePackageForUtilitiesGeneration;
    }

    public File getBaseLocationForUtilitiesGeneration() {
        return baseLocationForUtilitiesGeneration;
    }

}
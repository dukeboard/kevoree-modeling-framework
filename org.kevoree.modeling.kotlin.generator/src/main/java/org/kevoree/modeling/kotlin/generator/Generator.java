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

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 21/09/11
 * Time: 23:05
 */

import com.intellij.psi.PsiFile;
import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EOperation;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.kevoree.modeling.MetaModelLanguageType;
import org.kevoree.modeling.kotlin.generator.factories.FactoryGenerator;
import org.kevoree.modeling.kotlin.generator.model.ModelGenerator;
import org.kevoree.modeling.kotlin.generator.model.TraitGenerator;
import org.kevoree.modeling.util.StandaloneParser;

import java.io.File;
import java.util.HashSet;
import java.util.Iterator;

public class Generator {

    protected File ecoreFile;
    protected GenerationContext ctx;

    /**
     * Generator class. Proposes several methods for generation of Model, Loader, Serializer from a EMF-<i>ecore</i> model.
     *
     * @param ctx       the generation context
     * @param ecoreFile the ecore model that implementation will be generated
     * @throws Exception e
     */
    public Generator(GenerationContext ctx, File ecoreFile, String targetName) throws Exception {
        this.ecoreFile = ecoreFile;
        if (ecoreFile.getAbsolutePath().endsWith(MetaModelLanguageType.DEFAULT_EXTENSION)) {
            StandaloneParser parser = new StandaloneParser();
            PsiFile psi = parser.parser(this.ecoreFile);
            File temp = File.createTempFile("tempKevGen", ".ecore");
            temp.deleteOnExit();
            parser.convert2ecore(psi, temp);
            this.ecoreFile = temp;
        }
        this.ctx = ctx;
        preProcess(targetName);
    }


    private void preProcess(String targetName) throws Exception {
        ResourceSet model = ctx.getEcoreModel(ecoreFile);
        //registering factories
        ctx.setBaseLocationForUtilitiesGeneration(targetName);
        Iterator<Notifier> iterator2 = model.getAllContents();
        while (iterator2.hasNext()) {
            Notifier el = iterator2.next();
            if (el instanceof EPackage) {
                EPackage pack = (EPackage) el;
                if (pack.getName() == null || pack.getName().equals("")) {
                    throw new Exception("Package with an empty name : generation stopped !");
                }
            }
        }
    }

    /**
     * Triggers the generation of the given <i>ecore</i> file implementation.
     *
     * @param modelVersion the version of the model (will be included in headers of generated files).
     * @throws Exception e
     */
    public void generateModel(String modelVersion, String targetName) throws Exception {

        System.out.println("Check Aspect completeness");
        ResourceSet model = ctx.getEcoreModel(ecoreFile);
        checkModel(model);
        //Create new metaClass

        Iterator<Notifier> iterator = model.getAllContents();
        while (iterator.hasNext()) {
            Notifier content = iterator.next();

            if (content instanceof EClass) {
                EClass eclass = (EClass) content;
                //Should have aspect covered all method
                HashSet<EOperation> operationList = new HashSet<EOperation>();

                for (EOperation op : eclass.getEAllOperations()) {
                    if (!op.getName().equals("eContainer")) {
                        operationList.add(op);
                    }
                }
            }

        }

        ModelGenerator modelGen = new ModelGenerator(ctx);

        TraitGenerator.generateContainerTrait(ctx);

        if (ctx.persistence) {
            TraitGenerator.generateContainerPersistenceTrait(ctx);
        }
        TraitGenerator.generateRemoveFromContainerCommand(ctx);
        System.out.println("Launching model generation");
        modelGen.process(model);

        FactoryGenerator.generate(ctx, model, modelVersion, targetName);


        System.out.println("Done with model generation");
    }

    public void checkModel(ResourceSet model) {

        Iterator<Notifier> iterator = model.getAllContents();
        while (iterator.hasNext()) {
            Notifier content = iterator.next();
            if (content instanceof EPackage) {
                EPackage pack = (EPackage) content;
                if (pack.getNsPrefix() == null || pack.getNsPrefix().equals("")) {
                    pack.setNsPrefix(pack.getName());
                    //System.err.println("The Metamodel package " + pack.getName() + " does not have a Namespace Prefix. A namespace has been automatically used for generation.");
                }

                if (pack.getNsURI() == null || pack.getNsURI().equals("")) {
                    pack.setNsURI("http://" + pack.getName());
                    //System.err.println("The Metamodel package " + pack.getName() + " does not have a Namespace URI. A namespace has been automatically used for generation.");
                    //throw new Exception("The base package "+pack.getName+" of the metamodel must contain an XML Namespace. Generation aborted.")
                }
            }
        }
    }

}
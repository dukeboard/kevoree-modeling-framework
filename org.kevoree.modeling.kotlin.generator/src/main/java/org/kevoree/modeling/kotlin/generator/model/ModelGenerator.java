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
package org.kevoree.modeling.kotlin.generator.model;

import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.kevoree.modeling.aspect.NewMetaClassCreation;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.File;
import java.util.Iterator;

/**
 * Created by IntelliJ IDEA.
 * User: gregory.nain
 * Date: 21/03/12
 * Time: 14:02
 * To change this template use File | Settings | File Templates.
 */

public class ModelGenerator {

    public GenerationContext ctx;

    public ModelGenerator(GenerationContext ctx) {
        this.ctx = ctx;
    }

    /**
     * Processes the generation of the model classes. Goes deep in packages hierarchy then generate files.
     *
     * @param model        the XMIResource to be generated
     * @param modelVersion the version of the model to be included in headers
     */
    public void process(ResourceSet model, String modelVersion) {

        ConstantsGenerator.generateConstants(ctx, model);
        ClonerGenerator.generateCloner(ctx, ctx.basePackageForUtilitiesGeneration, model);

        String loaderGenBaseDir = ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath();
        ProcessorHelper.getInstance().checkOrCreateFolder(loaderGenBaseDir);

        DiffGenerator.generateModelTraceAPI(ctx, loaderGenBaseDir);
        DiffGenerator.generateModelTraceCompare(ctx, loaderGenBaseDir);

        Iterator<Notifier> iterator = model.getAllContents();

        while (iterator.hasNext()) {
            Notifier c = iterator.next();
            if (c instanceof EClass || c instanceof EEnum ) {
                EClassifier potentialRoot = (EClassifier) c;
                EPackage currentPackage = potentialRoot.getEPackage();
                String currentPackageDir = ProcessorHelper.getInstance().getPackageGenDir(ctx, currentPackage);
                ProcessorHelper.getInstance().checkOrCreateFolder(currentPackageDir);
                String userPackageDir = ProcessorHelper.getInstance().getPackageUserDir(ctx, currentPackage);
                if (currentPackage.getEClassifiers().size() != 0) {
                    ProcessorHelper.getInstance().checkOrCreateFolder(currentPackageDir + File.separator + "impl");
                    PackageFactoryGenerator.generatePackageFactory(ctx, currentPackageDir, currentPackage, modelVersion);
                    PackageFactoryGenerator.generatePackageFactoryDefaultImpl(ctx, currentPackageDir, currentPackage, modelVersion);
                    if (ctx.flyweightFactory) {
                        PackageFactoryGenerator.generateFlyweightFactory(ctx, currentPackageDir, currentPackage, modelVersion);
                    }
                }
                boolean isHiddenMetaclass = false;
                for (NewMetaClassCreation m : ctx.newMetaClasses) {
                    if ((m.packageName + "." + m.name).equals(ProcessorHelper.getInstance().fqn(ctx, potentialRoot))) {
                        isHiddenMetaclass = true;
                        break;
                    }
                }
                process(currentPackageDir, currentPackage, potentialRoot, userPackageDir, isHiddenMetaclass);
            }
        }
    }

    private void process(String currentPackageDir, EPackage packElement, EClassifier cls, String userPackageDir, Boolean isHiddenMetaClass) {

        if (cls instanceof EClass) {
            EClass cl = (EClass) cls;
            if (!cl.isAbstract() && !cl.isInterface()) {
                ClassGenerator.generateFlatClass(ctx, currentPackageDir, packElement, cl);
            }
            if (!isHiddenMetaClass) {
                APIGenerator.generateAPI(ctx, currentPackageDir, packElement, cl, userPackageDir);
            }
        } else if (cls instanceof EDataType) {
            if (cls instanceof EEnum) {
                EEnum enm = (EEnum) cls;
                EnumGenerator.generateEnum(ctx, currentPackageDir, packElement, enm);
            } else {
                System.out.println("Generic DataType " + cls.getName() + " ignored for generation.");
            }
        } else {
            System.out.println("No processor found for classifier: " + cls);
        }

    }

}

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

import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.kevoree.modeling.aspect.AspectClass;
import org.kevoree.modeling.aspect.AspectMethod;
import org.kevoree.modeling.aspect.AspectParam;
import org.kevoree.modeling.aspect.NewMetaClassCreation;
import org.kevoree.modeling.kotlin.generator.factories.FactoryGenerator;
import org.kevoree.modeling.kotlin.generator.model.ModelGenerator;
import org.kevoree.modeling.kotlin.generator.model.TraitGenerator;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.Iterator;

public class Generator {

    protected File ecoreFile;
    protected GenerationContext ctx;

    /**
     * Generator class. Proposes several methods for generation of Model, Loader, Serializer from a EMF-<i>ecore</i> model.
     * @param ctx the generation context
     * @param ecoreFile the ecore model that implementation will be generated
     */
    public Generator(GenerationContext ctx, File ecoreFile) throws Exception {
        this.ecoreFile = ecoreFile;
        this.ctx = ctx;
        preProcess();
    }


    private void preProcess() throws Exception {
        ResourceSet model = ctx.getEcoreModel(ecoreFile);

        //registering factories
        Iterator<Notifier> iterator1 = model.getAllContents();
        while (iterator1.hasNext()) {
            Notifier el = iterator1.next();
            if(el instanceof EPackage) {
                ctx.registerFactory((EPackage)el);
            }
        }

        ctx.setBaseLocationForUtilitiesGeneration(ecoreFile);

        Iterator<Notifier> iterator2 = model.getAllContents();
        while (iterator2.hasNext()) {
            Notifier el = iterator2.next();
            if(el instanceof EPackage) {
                EPackage pack = (EPackage)el;
                if (pack.getName() == null || pack.getName().equals("")) {
                    throw new Exception("Package with an empty name : generation stopped !");
                }
            }
        }
    }

    /**
     * Triggers the generation of the given <i>ecore</i> file implementation.
     * @param modelVersion the version of the model (will be included in headers of generated files).
     * @throws Exception
     */
    public void  generateModel(String modelVersion) throws Exception {

        FactoryGenerator.generateMainFactory(ctx);

        System.out.println("Check Aspect completeness");
        ResourceSet model = ctx.getEcoreModel(ecoreFile);
        checkModel(model);
        //Create new metaClass

        for(NewMetaClassCreation metaC : ctx.newMetaClasses) {
            System.err.println("Auto creation of metaClass " + metaC.packageName + "." + metaC.name + " super " + metaC.parentName);
            EClass newMeta = EcoreFactory.eINSTANCE.createEClass();
            newMeta.setName(metaC.name);
            model.getResources().get(0).getContents().add(newMeta);

            EPackage p = null;
            Iterator<Notifier> iterator = model.getAllContents();
            while ( (p == null) && iterator.hasNext()) {
                Notifier el = iterator.next();
                if(el instanceof EPackage) {
                    if(ProcessorHelper.getInstance().fqn(ctx, (EPackage)el).equals(metaC.packageName)) {
                        p = (EPackage)el;
                    }
                }
            }
            if(p != null) {
                p.getEClassifiers().add(newMeta);
            } else {
                System.err.println("Create package : " + metaC.packageName);
                EPackage newMetaPack = EcoreFactory.eINSTANCE.createEPackage();
                newMetaPack.setName(metaC.packageName);
                newMetaPack.getEClassifiers().add(newMeta);
                model.getResources().get(0).getContents().add(newMetaPack);
            }


            EClass parentclass = null;
            Iterator<Notifier> iteratorEclass = model.getAllContents();
            while ( (parentclass == null) && iteratorEclass.hasNext()) {
                Notifier el = iteratorEclass.next();
                if(el instanceof EClass) {
                    if(ProcessorHelper.getInstance().fqn(ctx, (EClass)el).equals(metaC.parentName)
                            || ((EClass)el).getName().equals(metaC.parentName)) {
                        parentclass = (EClass)el;
                    }
                }
            }
            if(parentclass != null) {
                newMeta.getESuperTypes().add(parentclass);
            } else {
                throw new Exception("Parent Does not exist");
            }
        }


        AspectMixin.mixin(model, ctx);


        Iterator<Notifier> iterator = model.getAllContents();
        while (iterator.hasNext()) {
            Notifier content = iterator.next();

            if(content instanceof EClass) {
                EClass eclass = (EClass)content;
                //Should have aspect covered all method
                HashSet<EOperation> operationList = new HashSet<EOperation>();

                for(EOperation op : eclass.getEAllOperations()) {
                    if(!op.getName().equals("eContainer")) {
                        operationList.add(op);
                    }
                }

                for(AspectClass aspect :  ctx.aspects.values()) {
                    if (AspectMatcher.aspectMatcher(ctx, aspect, eclass)) {
                        //aspect match
                        for(AspectMethod method : aspect.methods) {

                            EOperation foundOp = null;
                            for(EOperation op : operationList) {
                                if(AspectMethodMatcher.isMethodEqual(op, method, ctx) && !method.privateMethod) {
                                    foundOp = op;
                                    break;
                                }
                            }
                            HashSet<EOperation> toRemove = new HashSet<EOperation>();
                            if(foundOp != null) {
                                for(EOperation opLoop : operationList) {
                                    if (AspectMethodMatcher.isMethodEqual(opLoop, method, ctx)) {
                                        toRemove.add(opLoop);
                                    }
                                }
                                toRemove.add(foundOp);
                                operationList.removeAll(toRemove);
                            }
                        }
                    }
                }

                if (!operationList.isEmpty() && !eclass.isAbstract() && !eclass.isInterface()) {

                    System.err.println("Auto generate Method for aspect " + eclass.getName());

                    File targetSrc = ctx.rootSrcDirectory;
                    File targetFile = new File(targetSrc + File.separator + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration).replace(".", File.separator) + File.separator + "GeneratedAspect_" + eclass.getName() + ".kt");
                    targetFile.getParentFile().mkdirs();
                    FileWriter writer = new FileWriter(targetFile);
                    writer.write("package " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ";\n");
                    writer.write("import org.kevoree.modeling.api.aspect;\n");
                    writer.write("public aspect trait " + "GeneratedAspect_" + eclass.getName() + " : " + ProcessorHelper.getInstance().fqn(ctx, eclass) + " {\n");

                    AspectClass newAspectClass = new AspectClass();
                    newAspectClass.name = "GeneratedAspect_" + eclass.getName();
                    newAspectClass.aspectedClass = eclass.getName();
                    newAspectClass.packageName = ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration);
                    ctx.aspects.put(newAspectClass.packageName + "." + newAspectClass.name, newAspectClass);


                    for(EOperation operation : operationList) {
                        writer.write("\toverride fun " + operation.getName() + "(");
                        boolean isFirst = true;
                        AspectMethod newAspectOperation = new AspectMethod();
                        newAspectOperation.name = operation.getName();
                        newAspectClass.methods.add(newAspectOperation);

                        for(EParameter param : operation.getEParameters()) {
                            AspectParam newParam = new AspectParam();
                            newParam.name = param.getName();
                            newParam.type = ProcessorHelper.getInstance().convertType(param.getEType().getName());
                            newAspectOperation.params.add(newParam);

                            if (!isFirst) {
                                writer.write(",");
                            }
                            if (param.getEType() instanceof EDataType) {
                                writer.write("_" + param.getName() + ":" + ProcessorHelper.getInstance().convertType(param.getEType().getName()));
                            } else {
                                if (param.getEType() != null) {
                                    writer.write("_" + param.getName() + ":" + ProcessorHelper.getInstance().fqn(ctx, param.getEType()));
                                } else {
                                    writer.write("_" + param.getName());
                                }
                            }
                            isFirst = false;
                        }

                        if (operation.getEType() != null) {
                            if (operation.getEType() instanceof EDataType) {
                                String operationReturnType = ProcessorHelper.getInstance().convertType(operation.getEType().getName());
                                System.out.println(operation.getEType().getName() + " converted to " + operationReturnType);
                                if (operationReturnType.startsWith("List") && !ctx.js) {
                                    operationReturnType = "Mutable" + operationReturnType;
                                }
                                writer.write(") : " + operationReturnType + " {\n");
                            } else {
                                String operationReturnType = ProcessorHelper.getInstance().fqn(ctx, operation.getEType());
                                if (operation.getLowerBound() == 0) {
                                    operationReturnType = operationReturnType + "?";
                                }
                                writer.write(") : " + operationReturnType + " {\n");
                            }
                        } else {
                            writer.write("){\n");
                        }
                        writer.write("\t\tthrow Exception(\"Not implemented yet !\");\n");
                        writer.write("\t}\n");
                    }

                    writer.write("}\n");
                    writer.close();
                    //create aspect to be able to be included by the factory
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
        modelGen.process(model, modelVersion);
        System.out.println("Done with model generation");
    }

    public void  checkModel(ResourceSet model) {

        Iterator<Notifier> iterator = model.getAllContents();
        while (iterator.hasNext()) {
            Notifier content = iterator.next();
            if(content instanceof EPackage) {
                EPackage pack = (EPackage)content;
                if (pack.getNsPrefix() == null || pack.getNsPrefix().equals("")) {
                    pack.setNsPrefix(pack.getName());
                    System.err.println("The Metamodel package " + pack.getName() + " does not have a Namespace Prefix. A namespace has been automatically used for generation.");
                }

                if (pack.getNsURI() == null || pack.getNsURI().equals("")) {
                    pack.setNsURI("http://" + pack.getName());
                    System.err.println("The Metamodel package " + pack.getName() + " does not have a Namespace URI. A namespace has been automatically used for generation.");
                    //throw new Exception("The base package "+pack.getName+" of the metamodel must contain an XML Namespace. Generation aborted.")
                }
            }
        }
    }

    public void generateLoader() throws FileNotFoundException, UnsupportedEncodingException {
        System.out.println("Launching loader generation");
        LoaderGenerator loaderGenerator = new LoaderGenerator(ctx);
        loaderGenerator.generateXMILoader();
        System.out.println("Done with loader generation");
    }

    public void  generateJsonLoader() throws FileNotFoundException, UnsupportedEncodingException {
        System.out.println("Launching JSON loader generation");
        LoaderGenerator loaderGenerator = new LoaderGenerator(ctx);
        loaderGenerator.generateJSONLoader();
        System.out.println("Done with JSON loader generation");
    }


    public void  generateSerializer() throws FileNotFoundException, UnsupportedEncodingException {
        System.out.println("Launching serializer generation");
        SerialiserGenerator serializerGenerator = new SerialiserGenerator(ctx);
        serializerGenerator.generateXmiSerializer();
        System.out.println("Done with serializer generation");
    }

    public void  generateJSONSerializer() throws FileNotFoundException, UnsupportedEncodingException {
        System.out.println("Launching json serializer generation");
        SerialiserGenerator serializerGenerator = new SerialiserGenerator(ctx);
        serializerGenerator.generateJsonSerializer();
        System.out.println("Done with serializer generation");
    }

}
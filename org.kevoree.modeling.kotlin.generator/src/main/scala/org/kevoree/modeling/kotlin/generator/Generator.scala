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


package org.kevoree.modeling.kotlin.generator

import factories.FactoryGenerator
import java.io.{FileWriter, File}
import model.ModelGenerator
import org.eclipse.emf.ecore.resource.ResourceSet
import org.eclipse.emf.ecore._
import org.kevoree.modeling.aspect.{AspectParam, AspectClass, AspectMethod}
import scala.collection.JavaConversions._

import org.kevoree.modeling.kotlin.generator.serializer.{SerializerJsonGenerator, SerializerGenerator}
import java.util
import org.kevoree.modeling.kotlin.generator.loader.LoaderGenerator

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 21/09/11
 * Time: 23:05
 */

/**
 * Generator class. Proposes several methods for generation of Model, Loader, Serializer from a EMF-<i>ecore</i> model.
 * @param ctx the generation context
 * @param ecoreFile the ecore model that implementation will be generated
 */
class Generator(ctx: GenerationContext, ecoreFile: File) extends AspectMixin {
  preProcess()

  def preProcess() {
    val model = ctx.getEcoreModel(ecoreFile)

    //registering factories
    model.getAllContents.filter(e => e.isInstanceOf[EPackage]).foreach {
      elem => ctx.registerFactory(elem.asInstanceOf[EPackage])
    }
    ctx.setBaseLocationForUtilitiesGeneration(ecoreFile)
    model.getAllContents.foreach {
      content =>
        if (content.isInstanceOf[EPackage]) {
          val pack = content.asInstanceOf[EPackage]
          if (pack.getName == null || pack.getName == "") {
            throw new Exception("Package with an empty name : generation stopped !");
          }
        }
    }
  }


  /**
   * Triggers the generation of the given <i>ecore</i> file implementation.
   * @param modelVersion the version of the model (will be included in headers of generated files).
   */
  def generateModel(modelVersion: String) {

    val factoryGenerator = new FactoryGenerator(ctx)
    factoryGenerator.generateMainFactory()

    System.out.println("Check Aspect completeness")
    val model = ctx.getEcoreModel(ecoreFile)
    checkModel(model)
    //Create new metaClass
    ctx.newMetaClasses.foreach {
      metaC =>
        System.err.println("Auto creation of metaClass " + metaC.packageName + "." + metaC.name + " super " + metaC.parentName)
        val newMeta = EcoreFactory.eINSTANCE.createEClass();
        newMeta.setName(metaC.name);
        model.getResources.get(0).getContents.add(newMeta)
        model.getAllContents.find(e => e.isInstanceOf[EPackage] && ProcessorHelper.fqn(ctx, e.asInstanceOf[EPackage]) == metaC.packageName) match {
          case Some(p) => {
            p.asInstanceOf[EPackage].getEClassifiers.add(newMeta)
          }
          case None => {
            System.err.println("Create package : " + metaC.packageName);
            val newMetaPack = EcoreFactory.eINSTANCE.createEPackage();
            newMetaPack.setName(metaC.packageName)
            newMetaPack.getEClassifiers.add(newMeta)
            model.getResources.get(0).getContents.add(newMetaPack)
          }
        }
        model.getAllContents.find(e => e.isInstanceOf[EClass] && (ProcessorHelper.fqn(ctx, e.asInstanceOf[EClass]) == metaC.parentName || e.asInstanceOf[EClass].getName == metaC.parentName)) match {
          case Some(parentclass) => {
            newMeta.getESuperTypes.add(parentclass.asInstanceOf[EClass]);
          }
          case None => {
            throw new Exception("Parent Does not exist");
          }
        }


    }

    mixin(model, ctx)

    model.getAllContents.foreach {
      content =>
        content match {
          case eclass: EClass => {
            //Should have aspect covered all method
            val operationList = new util.HashSet[EOperation]()
            operationList.addAll(eclass.getEAllOperations.filter(op => op.getName != "eContainer"))
            ctx.aspects.values().foreach {
              aspect =>
                if (AspectMatcher.aspectMatcher(ctx, aspect, eclass)) {
                  //aspect match
                  aspect.methods.foreach {
                    method =>
                      operationList.find(op => AspectMethodMatcher.isMethodEquel(op, method, ctx) && !method.privateMethod) match {
                        case Some(foundOp) => {
                          operationList.toList.foreach {
                            opLoop =>
                              if (AspectMethodMatcher.isMethodEquel(opLoop, method, ctx)) {
                                operationList.remove(opLoop)
                              }
                          }
                          operationList.remove(foundOp)
                        }
                        case None => {
                        }
                      }
                  }
                }
            }
            if (!operationList.isEmpty && !eclass.isAbstract && !eclass.isInterface) {

              System.err.println("Auto generate Method for aspect " + eclass.getName);
              /*
              operationList.foreach {
                op =>
                  System.err.print(">" + op.getName)
                  op.getEParameters.foreach {
                    p =>
                      System.err.println("," + p.getName + ":" + p.getEType.getName);
                  }
                  System.err.println()
              } */

              val targetSrc = ctx.getRootSrcDirectory();
              val targetFile = new File(targetSrc + File.separator + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration).replace(".", File.separator) + File.separator + "GeneratedAspect_" + eclass.getName + ".kt");
              targetFile.getParentFile.mkdirs();
              val writer = new FileWriter(targetFile);
              writer.write("package " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ";\n")
              writer.write("import org.kevoree.modeling.api.aspect;\n")
              writer.write("public aspect trait " + "GeneratedAspect_" + eclass.getName + " : " + ProcessorHelper.fqn(ctx, eclass) + " {\n")

              val newAspectClass = new AspectClass();
              newAspectClass.name = "GeneratedAspect_" + eclass.getName
              newAspectClass.aspectedClass = eclass.getName
              newAspectClass.packageName = ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration)
              ctx.aspects.put(newAspectClass.packageName + "." + newAspectClass.name, newAspectClass)
              operationList.filter(op => op.getName != "eContainer").foreach {
                operation =>
                  writer.write("\toverride fun " + operation.getName + "(")
                  var isFirst = true
                  val newAspectOperation = new AspectMethod();
                  newAspectOperation.name = operation.getName
                  newAspectClass.methods.add(newAspectOperation)
                  operation.getEParameters.foreach {
                    param =>

                      val newParam = new AspectParam();
                      newParam.name = param.getName
                      newParam.`type` = ProcessorHelper.convertType(param.getEType.getName)
                      newAspectOperation.params.add(newParam)

                      if (!isFirst) {
                        writer.write(",")
                      }
                      if (param.getEType.isInstanceOf[EDataType]) {
                        writer.write("_" + param.getName + ":" + ProcessorHelper.convertType(param.getEType.getName))
                      } else {
                        if (param.getEType != null) {
                          writer.write("_" + param.getName + ":" + ProcessorHelper.fqn(ctx, param.getEType))
                        } else {
                          writer.write("_" + param.getName)
                        }
                      }
                      isFirst = false
                  }
                  if (operation.getEType != null) {
                    if (operation.getEType.isInstanceOf[EDataType]) {
                      var operationReturnType = ProcessorHelper.convertType(operation.getEType.getName)
                      if (operationReturnType.startsWith("List") && !ctx.js) {
                        operationReturnType = "Mutable" + operationReturnType
                      }
                      writer.write(") : " + operationReturnType + " {\n")
                    } else {
                      var operationReturnType = ProcessorHelper.fqn(ctx, operation.getEType)
                      if (operation.getLowerBound == 0) {
                        operationReturnType = operationReturnType + "?"
                      }
                      writer.write(") : " + operationReturnType + " {\n")
                    }
                  } else {
                    writer.write("){\n")
                  }
                  writer.write("\t\tthrow Exception(\"Not implemented yet !\");\n")
                  writer.write("\t}\n")
              }
              writer.write("}\n")
              writer.close()
              //create aspect to be able to be included by the factory
            }
          }
          case _ =>
        }
    }


    val modelGen = new ModelGenerator(ctx)
    modelGen.generateContainerTrait(ctx)
    if (ctx.persistence) {
      modelGen.generateContainerPersistenceTrait(ctx)
    }
    modelGen.generateRemoveFromContainerCommand(ctx)


    System.out.println("Launching model generation")
    modelGen.process(model, modelVersion)

    System.out.println("Done with model generation")


  }

  def checkModel(model: ResourceSet) {

    model.getAllContents.foreach {
      content =>
        content match {
          case pack: EPackage => {
            if (pack.getNsPrefix == null || pack.getNsPrefix == "") {
              pack.setNsPrefix(pack.getName)
              System.err.println("The Metamodel package " + pack.getName + " does not have a Namespace Prefix. A namespace has been automatically used for generation.")
            }

            if (pack.getNsURI == null || pack.getNsURI == "") {
              pack.setNsURI("http://" + pack.getName)
              System.err.println("The Metamodel package " + pack.getName + " does not have a Namespace URI. A namespace has been automatically used for generation.")
              //throw new Exception("The base package "+pack.getName+" of the metamodel must contain an XML Namespace. Generation aborted.")
            }
          }
          case _ =>
        }
    }
  }

  def generateLoader() {

    val model = ctx.getEcoreModel(ecoreFile)
    System.out.println("Launching loader generation")
    val loaderGenerator = new LoaderGenerator(ctx)
    loaderGenerator.generateXMILoader(model)
    System.out.println("Done with loader generation")
  }

  def generateJsonLoader() {
    val model = ctx.getEcoreModel(ecoreFile)
    System.out.println("Launching JSON loader generation")
    val loaderGenerator = new LoaderGenerator(ctx)
    loaderGenerator.generateJSONLoader(model)
    System.out.println("Done with JSON loader generation")
  }


  def generateSerializer() {
    val model = ctx.getEcoreModel(ecoreFile)
    System.out.println("Launching serializer generation")
    val serializerGenerator = new SerializerGenerator(ctx)
    serializerGenerator.generateSerializer(model)
    System.out.println("Done with serializer generation")
  }

  def generateJSONSerializer() {

    val model = ctx.getEcoreModel(ecoreFile)

    System.out.println("Launching json serializer generation")
    val serializerGenerator = new SerializerJsonGenerator(ctx)
    model.getAllContents.foreach {
      elem => elem match {
        case pack: EPackage => serializerGenerator.generateJsonSerializer(pack, model)
        case _ => //println("No serializer generator for containerRoot element of class: " + elem.getClass)
      }
    }
    System.out.println("Done with serializer generation")
  }

}
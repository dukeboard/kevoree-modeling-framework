
package org.kevoree.modeling.kotlin.generator.model

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


import java.io.{File, PrintWriter}
import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore.resource.ResourceSet
import org.eclipse.emf.ecore.util.EcoreUtil
import org.eclipse.emf.ecore.{EEnum, EPackage, EClass}
import scala.collection.JavaConversions._
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}


/**
 * Created by IntelliJ IDEA.
 * User: Francois Fouquet
 * Date: 02/10/11
 * Time: 20:55
 */

trait ClonerGenerator {


  def generateCloner(ctx: GenerationContext, pack: EPackage, model: ResourceSet) {
    //generateClonerFactories(ctx, currentPackageDir, pack, cls)
    generateDefaultCloner(ctx, pack, model)
  }

  def generateDefaultCloner(ctx: GenerationContext, pack: EPackage, model: ResourceSet) {
    ProcessorHelper.checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "cloner")
    val pr = new PrintWriter(new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "cloner" + File.separator + "DefaultModelCloner.kt"), "utf-8")
    val packageName = ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration)
    ctx.clonerPackage = packageName + ".cloner"
    if (!ctx.microframework) {
      ProcessorHelper.copyFromStream("org/kevoree/modeling/api/ModelCloner.kt", ctx.getRootGenerationDirectory.getAbsolutePath)
    }
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName)
    ve.init()
    val template = ve.getTemplate("templates/ModelCloner.vm")
    val ctxV = new VelocityContext()
    ctxV.put("packageName", packageName)
    ctxV.put("potentialRoots", ProcessorHelper.collectAllClassifiersInModel(model))
    ctxV.put("ctx", ctx)
    ctxV.put("helper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    ctxV.put("packages", ctx.packageFactoryMap.values())
    template.merge(ctxV, pr)
    pr.flush()
    pr.close()
  }

  def generateCloneMethods(ctx: GenerationContext, cls: EClass, buffer: PrintWriter, pack: EPackage /*, isRoot: Boolean = false */) = {
      buffer.println("override fun createClone(_factories: "+ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration)+".factory.MainFactory) : org.kevoree.modeling.api.KMFContainer {")
      val formatedFactoryName: String = pack.getName.substring(0, 1).toUpperCase+pack.getName.substring(1)+"Factory"
      val formatedName: String = cls.getName.substring(0, 1).toUpperCase+cls.getName.substring(1)
      buffer.println("val selfObjectClone = _factories.get" + formatedFactoryName + "().create" + formatedName + "()")
      cls.getEAllAttributes.foreach {
        att => {
          if (ProcessorHelper.convertType(att.getEAttributeType, ctx) == "Any" || ProcessorHelper.convertType(att.getEAttributeType, ctx).contains("Class") || att.getEAttributeType.isInstanceOf[EEnum]) {
            buffer.println("val subsubRef_" + att.getName + " = this." + ProcessorHelper.protectReservedWords(att.getName) + "")
            buffer.println("if( subsubRef_" + att.getName + "!=null){selfObjectClone." + ProcessorHelper.protectReservedWords(att.getName) + " = subsubRef_" + att.getName + "}")
          } else {
            buffer.println("selfObjectClone." + ProcessorHelper.protectReservedWords(att.getName) + " = this." + ProcessorHelper.protectReservedWords(att.getName) + "")
          }
        }
      }
    buffer.println("return selfObjectClone")
    buffer.println("\t}") //END METHOD

    //GENERATE CLONE METHOD

    //CALL SUB TYPE OR PROCESS OBJECT
    if (ctx.getJS()) {
      buffer.println("override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) {")
    } else {
      buffer.println("override fun resolve(addrs : java.util.IdentityHashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) {")
    }

    //GET CLONED OBJECT
    buffer.println("if(mutableOnly && isRecursiveReadOnly()){")
    buffer.println("return")
    buffer.println("}")

    buffer.println("val clonedSelfObject = addrs.get(this) as " + ProcessorHelper.fqn(ctx, cls.getEPackage) + ".impl." + cls.getName + "Impl")

    //SET ALL REFERENCE
    cls.getEAllReferences.foreach {
      ref =>
        if (ref.getEReferenceType == null) {
          throw new Exception("Null EType for " + ref.getName + " in " + cls.getName)
        }
        if (ref.getEReferenceType.getName != null) {
          var noOpPrefix = ""
          if (ref.getEOpposite != null) {
            noOpPrefix = "noOpposite_"
          }
          ref.getUpperBound match {
            case 1 => {
              buffer.println("if(this." + ProcessorHelper.protectReservedWords(ref.getName) + "!=null){")
              buffer.println("if(mutableOnly && this." + ProcessorHelper.protectReservedWords(ref.getName) + "!!.isRecursiveReadOnly()){")
              if (ref.getEOpposite != null) {
                buffer.println("clonedSelfObject.noOpposite_" + ref.getName + "(this." + ProcessorHelper.protectReservedWords(ref.getName) + "!!)")
              } else {
                buffer.println("clonedSelfObject." + ProcessorHelper.protectReservedWords(ref.getName) + " = this." + ProcessorHelper.protectReservedWords(ref.getName))
              }
              buffer.println("} else {")
              buffer.println("val interObj = addrs.get(this." + ProcessorHelper.protectReservedWords(ref.getName) + ")")
              buffer.println("if(interObj == null){ throw Exception(\"Non contained " + ref.getName + " from " + cls.getName + " : \"+this." + ProcessorHelper.protectReservedWords(ref.getName) + ")}")
              if (ref.getEOpposite != null) {
                buffer.println("clonedSelfObject.noOpposite_" + ref.getName + "(interObj as " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ")")
              } else {
                buffer.println("clonedSelfObject." + ProcessorHelper.protectReservedWords(ref.getName) + " = (interObj as " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ")")
              }
              buffer.println("}")

              buffer.println("}")
            }
            case _ => {
              buffer.println("for(sub in this." + ProcessorHelper.protectReservedWords(ref.getName) + "){")
              var formatedName: String = ref.getName.substring(0, 1).toUpperCase
              formatedName += ref.getName.substring(1)

              buffer.println("if(mutableOnly && sub.isRecursiveReadOnly()){")
              buffer.println("clonedSelfObject." + noOpPrefix + "add" + formatedName + "(sub)")
              buffer.println("} else {")

              buffer.println("val interObj = addrs.get(sub)")
              buffer.println("if(interObj == null){ throw Exception(\"Non contained " + ref.getName + " from " + cls.getName + " : \"+this." + ProcessorHelper.protectReservedWords(ref.getName) + ")}")
              buffer.println("clonedSelfObject." + noOpPrefix + "add" + formatedName + "(interObj as " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ")")
              buffer.println("}")

              buffer.println("\t\t}")
            }
          }
        } else {
          println("Warning ---- Not found EReferenceType:Name ignored reference " + ref.getName + "->" + ref.getEReferenceType + "||>" + EcoreUtil.resolve(ref.getEReferenceType, ref.eResource()).toString())
        }
        buffer.println()
    }

       /*
      cls.getEAllContainments.foreach {
        contained =>
          contained.getUpperBound match {
            case 1 => {
              buffer.println("val subsubsub" + contained.getName + " = this." + ProcessorHelper.protectReservedWords(contained.getName) + "")
              buffer.println("if(subsubsub" + contained.getName + "!=null){ ")
              buffer.println("(subsubsub" + contained.getName + " as " + ctx.getKevoreeContainerImplFQN + ").resolve(addrs,readOnly,mutableOnly)")
              buffer.println("}")
            }
            case -1 => {
              buffer.println("for(sub in this." + ProcessorHelper.protectReservedWords(contained.getName) + "){")
              buffer.println("\t\t\t(sub as " + ctx.getKevoreeContainerImplFQN + " ).resolve(addrs,readOnly,mutableOnly)")
              buffer.println("\t\t}")
            }
            case _ if (contained.getUpperBound > 1) => {
              buffer.println("for(sub in this." + ProcessorHelper.protectReservedWords(contained.getName) + "){")
              buffer.println("\t\t\t(sub as " + ctx.getKevoreeContainerImplFQN + " ).resolve(addrs,readOnly,mutableOnly)")
              buffer.println("\t\t}")
            }
          }
          buffer.println()
      }

    buffer.println("\t\tif(readOnly){clonedSelfObject.setInternalReadOnly()}")
    buffer.println("return clonedSelfObject") //RETURN CLONED OBJECT
       */

    buffer.println("}") //END METHOD
  }


}
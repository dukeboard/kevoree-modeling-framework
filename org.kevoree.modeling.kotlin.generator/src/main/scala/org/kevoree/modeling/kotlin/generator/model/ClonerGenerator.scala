
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

  private def getGetter(name: String): String = {
    "get" + name.charAt(0).toUpper + name.substring(1) + "()"
  }

  private def getSetter(name: String): String = {
    "set" + name.charAt(0).toUpper + name.substring(1)
  }

  private def generateFactorySetter(ctx: GenerationContext, pr: PrintWriter) {
    ctx.packageFactoryMap.values().foreach {
      factoryFqn =>
        val factoryPackage = factoryFqn.substring(0, factoryFqn.lastIndexOf("."))
        val factoryName = factoryFqn.substring(factoryFqn.lastIndexOf(".") + 1)
        pr.println("override var " + factoryFqn.replace(".", "_") + " : " + factoryFqn + " = " + factoryPackage + ".impl.Default" + factoryName + "()")
    }

  }

  def generateCloneMethods(ctx: GenerationContext, cls: EClass, buffer: PrintWriter, pack: EPackage /*, isRoot: Boolean = false */) = {
    if (ctx.getJS()) {
      buffer.println("override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".factory.MainFactory, mutableOnly: Boolean) {")
    } else {
      buffer.println("override fun getClonelazy(subResult : java.util.IdentityHashMap<Any,Any>, _factories : " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".factory.MainFactory, mutableOnly: Boolean) {")
    }
    buffer.println("if(mutableOnly && isRecursiveReadOnly()){return}")
    var formatedFactoryName: String = pack.getName.substring(0, 1).toUpperCase
    formatedFactoryName += pack.getName.substring(1)
    formatedFactoryName += "Factory"

    var formatedName: String = cls.getName.substring(0, 1).toUpperCase
    formatedName += cls.getName.substring(1)
    buffer.println("\t\tval selfObjectClone = _factories.get" + formatedFactoryName + "().create" + formatedName + "()")
    cls.getEAllAttributes /*.filter(eref => !cls.getEAllContainments.contains(eref))*/ .foreach {
      att => {

        if (ProcessorHelper.convertType(att.getEAttributeType,ctx) == "Any" || ProcessorHelper.convertType(att.getEAttributeType,ctx).contains("Class") || att.getEAttributeType.isInstanceOf[EEnum]) {
          buffer.println("val subsubRef_" + att.getName + " = this." + getGetter(att.getName) + "")
          buffer.println("if( subsubRef_" + att.getName + "!=null){selfObjectClone." + getSetter(att.getName) + "(subsubRef_" + att.getName + ")}")
        } else {
          buffer.println("\t\tselfObjectClone." + getSetter(att.getName) + "(this." + getGetter(att.getName) + ")")
        }

      }
    }
    buffer.println("\t\tsubResult.put(this,selfObjectClone)")


    if ( /*ctx.getJS()*/ true) {
      //TODO evaluate if bad optimisation
      cls.getEAllContainments.foreach {
        contained =>
          val implExt = if (ctx.getGenFlatInheritance) {
            "Impl"
          } else {
            "Internal"
          }
          val fqnName = ProcessorHelper.fqn(ctx, contained.getEReferenceType.getEPackage) + ".impl." + contained.getEReferenceType.getName + implExt
          if (contained.getUpperBound == -1 || contained.getUpperBound > 1) {
            // multiple values
            buffer.println("for(sub in this." + getGetter(contained.getName) + "){")
            buffer.println("(sub as " + fqnName + ").getClonelazy(subResult, _factories,mutableOnly)")
            buffer.println("}")
          } else if (contained.getUpperBound == 1 /*&& contained.getLowerBound == 0*/ ) {
            // optional single ref

            buffer.println("val subsubsubsub" + contained.getName + " = this." + getGetter(contained.getName) + "")
            buffer.println("if(subsubsubsub" + contained.getName + "!= null){ ")
            buffer.println("(subsubsubsub" + contained.getName + " as " + fqnName + " ).getClonelazy(subResult, _factories,mutableOnly)")
            buffer.println("}")
          } else if (contained.getLowerBound > 1) {
            buffer.println("for(sub in this." + getGetter(contained.getName) + "){")
            buffer.println("\t\t\t(sub as " + fqnName + ").getClonelazy(subResult, _factories,mutableOnly)")
            buffer.println("\t\t}")
          } else {
            throw new UnsupportedOperationException("ClonerGenerator::Not standard arrity: " + cls.getName + "->" + contained.getName + "[" + contained.getLowerBound + "," + contained.getUpperBound + "]. Not implemented yet !")
          }
          buffer.println()
      }
    } else {
      buffer.println("for(sub in containedElements()){")
      buffer.println("(sub as " + ctx.getKevoreeContainer.get + ").getClonelazy(subResult, _factories,mutableOnly)")
      buffer.println("}")
    }





    //buffer.println("subResult") //result
    buffer.println("\t}") //END METHOD

    //GENERATE CLONE METHOD

    //CALL SUB TYPE OR PROCESS OBJECT
    if (ctx.getJS()) {
      buffer.println("override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {")
    } else {
      buffer.println("override fun resolve(addrs : java.util.IdentityHashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {")

    }



    //GET CLONED OBJECT
    buffer.println("if(mutableOnly && isRecursiveReadOnly()){")
    buffer.println("return this")
    buffer.println("}")

    if (ctx.getGenFlatInheritance) {
      buffer.println("val clonedSelfObject = addrs.get(this) as " + ProcessorHelper.fqn(ctx, cls.getEPackage) + ".impl." + cls.getName + "Impl")
    } else {
      buffer.println("val clonedSelfObject = addrs.get(this) as " + ProcessorHelper.fqn(ctx, cls.getEPackage) + ".impl." + cls.getName + "Internal")
    }



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
              buffer.println("if(this." + getGetter(ref.getName) + "!=null){")
              buffer.println("if(mutableOnly && this." + getGetter(ref.getName) + "!!.isRecursiveReadOnly()){")
              buffer.println("clonedSelfObject." + noOpPrefix + getSetter(ref.getName) + "(this." + getGetter(ref.getName) + "!!)")
              buffer.println("} else {")

              buffer.println("val interObj = addrs.get(this." + getGetter(ref.getName) + ")")
              buffer.println("if(interObj == null){ throw Exception(\"Non contained " + ref.getName + " from " + cls.getName + " : \"+this." + getGetter(ref.getName) + ")}")
              buffer.println("clonedSelfObject." + noOpPrefix + getSetter(ref.getName) + "(interObj as " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ")")
              buffer.println("}")

              buffer.println("}")
            }
            case _ => {
              buffer.println("for(sub in this." + getGetter(ref.getName) + "){")
              var formatedName: String = ref.getName.substring(0, 1).toUpperCase
              formatedName += ref.getName.substring(1)

              buffer.println("if(mutableOnly && sub.isRecursiveReadOnly()){")
              buffer.println("clonedSelfObject." + noOpPrefix + "add" + formatedName + "(sub)")
              buffer.println("} else {")

              buffer.println("val interObj = addrs.get(sub)")
              buffer.println("if(interObj == null){ throw Exception(\"Non contained " + ref.getName + " from " + cls.getName + " : \"+this." + getGetter(ref.getName) + ")}")
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
    //RECUSIVE CALL ON ECONTAINEMENT

    if ( /*ctx.getJS()*/ true) {
      cls.getEAllContainments.foreach {
        contained =>
          val implExt = if (ctx.getGenFlatInheritance) {
            "Impl"
          } else {
            "Internal"
          }
          val fqnName = ProcessorHelper.fqn(ctx, contained.getEReferenceType.getEPackage) + ".impl." + contained.getEReferenceType.getName + implExt
          contained.getUpperBound match {
            case 1 => {
              buffer.println("val subsubsub" + contained.getName + " = this." + getGetter(contained.getName) + "")
              buffer.println("if(subsubsub" + contained.getName + "!=null){ ")
              buffer.println("(subsubsub" + contained.getName + " as " + fqnName + ").resolve(addrs,readOnly,mutableOnly)")
              buffer.println("}")
            }
            case -1 => {
              buffer.println("for(sub in this." + getGetter(contained.getName) + "){")
              buffer.println("\t\t\t(sub as " + fqnName + " ).resolve(addrs,readOnly,mutableOnly)")
              buffer.println("\t\t}")
            }
            case _ if (contained.getUpperBound > 1) => {
              buffer.println("for(sub in this." + getGetter(contained.getName) + "){")
              buffer.println("\t\t\t(sub as " + fqnName + " ).resolve(addrs,readOnly,mutableOnly)")
              buffer.println("\t\t}")
            }
          }
          buffer.println()
      }
    } else {
      buffer.println("for(sub in containedElements()){")
      buffer.println("(sub as " + ctx.getKevoreeContainer.get + ").resolve(addrs,readOnly,mutableOnly)")
      buffer.println("}")
    }




    buffer.println("\t\tif(readOnly){clonedSelfObject.setInternalReadOnly()}")
    buffer.println("return clonedSelfObject") //RETURN CLONED OBJECT
    buffer.println("}") //END METHOD
  }


}
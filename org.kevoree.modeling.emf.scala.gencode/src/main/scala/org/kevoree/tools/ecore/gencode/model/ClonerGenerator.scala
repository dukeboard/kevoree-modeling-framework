package org.kevoree.tools.ecore.gencode.model

/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * 	Fouquet Francois
 * 	Nain Gregory
 */


import java.io.{File, PrintWriter}
import org.eclipse.emf.ecore.{EPackage, EClass}
import scala.collection.JavaConversions._
import org.kevoree.tools.ecore.gencode.{GenerationContext, ProcessorHelper}


/**
 * Created by IntelliJ IDEA.
 * User: Francois Fouquet
 * Date: 02/10/11
 * Time: 20:55
 * To change this template use File | Settings | File Templates.
 */

trait ClonerGenerator {


  def generateCloner(ctx:GenerationContext, currentPackageDir : String, pack: EPackage) {
    try {

      ctx.getRootContainerInPackage(pack) match {
        case Some(cls: EClass) => {
          generateDefaultCloner(ctx, currentPackageDir, pack, cls)
        }
        case None => throw new UnsupportedOperationException("Root container not found. Returned None")
      }
    } catch {
      case _@e => println("Warn cloner not generated")
    }

  }

  def generateDefaultCloner(ctx : GenerationContext, currentPackageDir : String, pack: EPackage, containerRoot: EClass) {
    ProcessorHelper.checkOrCreateFolder(currentPackageDir + "/cloner")
    val pr = new PrintWriter(new File(currentPackageDir + "/cloner/ModelCloner.scala"), "utf-8")

    val packageName = ProcessorHelper.fqn(ctx, pack)

    pr.println("package " + packageName + ".cloner")
    pr.println("class ModelCloner {")

    pr.println("def clone[A](o : A) : A = {")

    pr.println("o match {")
    pr.println("case o : " + packageName + "." + containerRoot.getName + " => {")
    pr.println("val context = new java.util.IdentityHashMap[Object,Object]()")
    pr.println("o.getClonelazy(context)")
    pr.println("o.resolve(context).asInstanceOf[A]")
    pr.println("}")
    pr.println("case _ => null.asInstanceOf[A]")
    pr.println("}") //END MATCH
    pr.println("}") //END serialize method
    pr.println("}") //END TRAIT
    pr.flush()
    pr.close()
  }

  /*
  def generateCloner(genDir: String, packageName: String, refNameInParent: String, containerRoot: EClass, pack: EPackage, isRoot: Boolean = false): Unit = {
    ProcessorHelper.checkOrCreateFolder(genDir + "/cloner")
    //PROCESS SELF
    val pr = new PrintWriter(new FileOutputStream(new File(genDir + "/cloner/" + containerRoot.getName + "Cloner.scala")))
    pr.println("package " + packageName + ".cloner")
    generateToHashMethod(packageName, containerRoot, pr, pack, isRoot)
    pr.flush()
    pr.close()

    //PROCESS SUB
    containerRoot.getEAllContainments.foreach {
      sub =>
        val subpr = new PrintWriter(new FileOutputStream(new File(genDir + "/cloner/" + sub.getEReferenceType.getName + "Cloner.scala")))
        subpr.println("package " + packageName + ".cloner")
        generateToHashMethod(packageName, sub.getEReferenceType, subpr, pack)
        subpr.flush()
        subpr.close()

        //¨PROCESS ALL SUB TYPE
        ProcessorHelper.getConcreteSubTypes(sub.getEReferenceType).foreach {
          subsubType =>
            generateCloner(genDir, packageName, sub.getName, subsubType, pack)
        }
        generateCloner(genDir, packageName, sub.getName, sub.getEReferenceType, pack)

    }
  }*/


  private def getGetter(name: String): String = {
    "get" + name.charAt(0).toUpper + name.substring(1)
  }

  private def getSetter(name: String): String = {
    "set" + name.charAt(0).toUpper + name.substring(1)
  }

  def generateCloneMethods(packageName: String, cls: EClass, buffer: PrintWriter, pack: EPackage /*, isRoot: Boolean = false */) = {
    /*  buffer.println("import " + packageName + "._")
    buffer.println("trait " + cls.getName + "Cloner ")

    var subTraits = (cls.getEAllContainments).map(sub => sub.getEReferenceType.getName + "Cloner").toSet
    subTraits = (subTraits ++ ProcessorHelper.getConcreteSubTypes(cls).map(sub => sub.getName + "Cloner")).toSet

    if (subTraits.size >= 1) {
      buffer.print(subTraits.mkString(" extends ", " with ", " "))
    }

    buffer.println("{")*/

    //GENERATE GET Hash ADDR



    if (cls.getESuperTypes.size() > 0) {
      buffer.print("override ")
    }
    buffer.println("def getClonelazy(subResult : java.util.IdentityHashMap[Object,Object]): Unit = {")
    //buffer.println("var subResult = new java.util.IdentityHashMap[Object,Object]()")

    var formatedFactoryName: String = pack.getName.substring(0, 1).toUpperCase
    formatedFactoryName += pack.getName.substring(1)
    formatedFactoryName += "Factory"

    var formatedName: String = cls.getName.substring(0, 1).toUpperCase
    formatedName += cls.getName.substring(1)
    buffer.println("val selfObjectClone = " + formatedFactoryName + ".create" + formatedName)
    cls.getEAllAttributes /*.filter(eref => !cls.getEAllContainments.contains(eref))*/ .foreach {
      att =>
        buffer.println("selfObjectClone." + getSetter(att.getName) + "(this." + getGetter(att.getName) + ")")
    }

    // buffer.println("this match {")
    //  ProcessorHelper.getConcreteSubTypes(cls).foreach {
    //   subType =>
    //    buffer.println("case o : " + subType.getName + " =>subResult = subResult ++ get" + subType.getName + "clonelazy(o)")
    // }
    //  buffer.println("case _ => subResult += this -> selfObjectClone")
    // buffer.println("}")

    buffer.println("subResult.put(this,selfObjectClone)")

    cls.getEAllContainments.foreach {
      contained =>
        contained.getUpperBound match {
          case 1 => {
            buffer.println("this." + getGetter(contained.getName) + ".map{ sub =>")
            buffer.println("sub.getClonelazy(subResult)")
            buffer.println("}")
          }
          case -1 => {
            buffer.println("this." + getGetter(contained.getName) + ".foreach{ sub => ")
            buffer.println("sub.getClonelazy(subResult)")
            buffer.println("}")
          }
        }
    }

    //buffer.println("subResult") //result
    buffer.println("}") //END METHOD

    //GENERATE CLONE METHOD

    //CALL SUB TYPE OR PROCESS OBJECT
    if (cls.getESuperTypes.size() > 0) {
      buffer.print("override ")
    }
    buffer.println("def resolve(addrs : java.util.IdentityHashMap[Object,Object]) : " + cls.getName + " = {")

    /*
    buffer.println("this match {")
    ProcessorHelper.getConcreteSubTypes(cls).foreach {
      subType =>
        buffer.println("case o : " + subType.getName + " =>" + subType.getName + "resolve(o,addrs)")
    }
    buffer.println("case _ => {")
*/
    //GET CLONED OBJECT
    buffer.println("val clonedSelfObject = addrs.get(this).asInstanceOf[" + cls.getName + "]")
    //SET ALL REFERENCE
    cls.getEAllReferences.foreach {
      ref =>

        if (ref.getEReferenceType.getName != null) {
          ref.getUpperBound match {
            case 1 => {
              ref.getLowerBound match {
                case 0 => {
                  // 0 to 1 relationship . Test Optional result
                  buffer.println("this." + getGetter(ref.getName) + ".map{sub =>")
                  buffer.println("clonedSelfObject." + getSetter(ref.getName) + "(Some(addrs.get(sub).asInstanceOf[" + ref.getEReferenceType.getName + "]))")
                  buffer.println("}")
                }
                case 1 => {
                  // 1 to 1 relationship
                  buffer.println("clonedSelfObject." + getSetter(ref.getName) + "(addrs.get(this." + getGetter(ref.getName) + ").asInstanceOf[" + ref.getEReferenceType.getName + "])")
                }
              }
            }
            case _ => {
              buffer.println("this." + getGetter(ref.getName) + ".foreach{sub =>")
              var formatedName: String = ref.getName.substring(0, 1).toUpperCase
              formatedName += ref.getName.substring(1)
              buffer.println("clonedSelfObject.add" + formatedName + "(addrs.get(sub).asInstanceOf[" + ref.getEReferenceType.getName + "])")
              buffer.println("}")
            }
          }
        } else {
          println("Warning ---- Not found EReferenceType ignored reference")
        }


    }
    //RECUSIVE CALL ON ECONTAINEMENT
    cls.getEAllContainments.foreach {
      contained =>
        contained.getUpperBound match {
          case 1 => {
            buffer.println("this." + getGetter(contained.getName) + ".map{ sub =>")
            buffer.println("sub.resolve(addrs)")
            buffer.println("}")
          }
          case -1 => {
            buffer.println("this." + getGetter(contained.getName) + ".foreach{ sub => ")
            buffer.println("sub.resolve(addrs)")
            buffer.println("}")
          }
        }
    }

    buffer.println("clonedSelfObject") //RETURN CLONED OBJECT
    buffer.println("}") //END METHOD
  }


}
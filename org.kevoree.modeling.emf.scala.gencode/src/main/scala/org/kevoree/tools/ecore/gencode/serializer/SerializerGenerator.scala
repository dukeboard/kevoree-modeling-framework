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


package org.kevoree.tools.ecore.gencode.serializer

import scala.collection.JavaConversions._
import java.io.{File, FileOutputStream, PrintWriter}
import org.kevoree.tools.ecore.gencode.loader.RootLoader
import org.eclipse.emf.ecore.{EReference, EAttribute, EPackage, EClass}
import org.kevoree.tools.ecore.gencode.ProcessorHelper

/**
 * Created by IntelliJ IDEA.
 * User: duke
 * Date: 02/10/11
 * Time: 20:55
 */

class SerializerGenerator(genBaseDir: String, packagePrefix: Option[String], rootXmiPackage: EPackage, rootXmiContainerClassName: Option[String]) {


  def generateSerializer() {

    val basePackage = packagePrefix match {
      case Some(prefix) => {if(prefix.endsWith(".")){prefix}else{prefix + "."} + rootXmiPackage.getName}
      case None => rootXmiPackage.getName
    }

    ProcessorHelper.lookForRootElement(rootXmiPackage, rootXmiContainerClassName) match {
      case Some(cls: EClass) => {
        generateSerializer(genBaseDir + "/" + rootXmiPackage.getName, basePackage, rootXmiPackage.getName + ":" + cls.getName, cls, rootXmiPackage, true)
        generateDefaultSerializer(genBaseDir + "/" + rootXmiPackage.getName, basePackage, cls, rootXmiPackage)
      }
      case None => throw new UnsupportedOperationException("Root container not found. Returned one.")
    }
  }

  def generateDefaultSerializer(genDir: String, packageName: String, root: EClass, rootXmiPackage: EPackage) {
    ProcessorHelper.checkOrCreateFolder(genDir + "/serializer")
    val pr = new PrintWriter(new File(genDir + "/serializer/" + "ModelSerializer.scala"),"utf-8")
    pr.println("package " + packageName + ".serializer")
    pr.println("class ModelSerializer extends " + root.getName + "Serializer {")
    pr.println()
    pr.println("def serialize(o : Object) : scala.xml.Node = {")
    pr.println()
    pr.println("o match {")
    pr.println("case o : " + packageName + "." + root.getName + " => {")
    pr.println("val context = get" + root.getName + "XmiAddr(o,\"/\")")
    pr.println(root.getName + "toXmi(o,context)")
    pr.println("}")
    pr.println("case _ => null")
    pr.println("}") //END MATCH
    pr.println("}") //END serialize method
    pr.println("}") //END TRAIT
    pr.flush()
    pr.close()
  }


  def generateSerializer(genDir: String, packageName: String, refNameInParent: String, root: EClass, rootXmiPackage: EPackage, isRoot: Boolean = false): Unit = {
    ProcessorHelper.checkOrCreateFolder(genDir + "/serializer")
    //PROCESS SELF
    val pr = new PrintWriter(new File(genDir + "/serializer/" + root.getName + "Serializer.scala"),"utf-8")
    pr.println("package " + packageName + ".serializer")
    generateToXmiMethod(root, pr, rootXmiPackage.getName + ":" + root.getName, isRoot)
    pr.flush()
    pr.close()

    //PROCESS SUB
    root.getEAllContainments.foreach {
      sub =>
        val subpr = new PrintWriter(new File(genDir + "/serializer/" + sub.getEReferenceType.getName + "Serializer.scala"),"utf-8")
        subpr.println("package " + packageName + ".serializer")
        generateToXmiMethod(sub.getEReferenceType, subpr, sub.getName)
        subpr.flush()
        subpr.close()

        //¨PROCESS ALL SUB TYPE
        ProcessorHelper.getConcreteSubTypes(sub.getEReferenceType).foreach {
          subsubType =>
            generateSerializer(genDir, packageName, sub.getName, subsubType, rootXmiPackage)
        }
        generateSerializer(genDir, packageName, sub.getName, sub.getEReferenceType, rootXmiPackage)

    }


  }


  private def getGetter(name: String): String = {
    "get" + name.charAt(0).toUpper + name.substring(1)
  }


  private def generateToXmiMethod(cls: EClass, buffer: PrintWriter, refNameInParent: String, isRoot: Boolean = false) = {
    val packageOfModel = packagePrefix match {
      case Some(prefix) => {if(prefix.endsWith(".")){prefix}else{prefix + "."} + rootXmiPackage.getName}
      case None => rootXmiPackage.getName
    }
    buffer.println("import " + packageOfModel + "._")
    buffer.println()
    buffer.println("trait " + cls.getName + "Serializer ")

    var subTraits = ( cls.getEAllContainments ).map(sub => sub.getEReferenceType.getName + "Serializer").toSet
    subTraits = ( subTraits ++ ProcessorHelper.getConcreteSubTypes(cls).map(sub => sub.getName + "Serializer")).toSet

    if (subTraits.size >= 1) {
      buffer.print(subTraits.mkString(" extends ", " with ", " "))
    }

    buffer.println("{")

    buffer.println()

    //GENERATE GET XMI ADDR
    buffer.println("\tdef get" + cls.getName + "XmiAddr(selfObject : " + cls.getName + ",previousAddr : String): Map[Object,String] = {")
    buffer.println("\t\tvar subResult = Map[Object,String]()")
    buffer.println("\t\tvar i = 0")
    cls.getEAllContainments.foreach {
      subClass =>
        subClass.getUpperBound match {
          case 1 => {
            buffer.println()
            buffer.println("\t\tselfObject." + getGetter(subClass.getName) + ".map{ sub =>")
            buffer.println("\t\t\tsubResult +=  sub -> (previousAddr+\"/@" + subClass.getName + "\" ) ")
            buffer.println("\t\t\tsubResult = subResult ++ get" + subClass.getEReferenceType.getName + "XmiAddr(sub,previousAddr+\"/@" + subClass.getName + "\")")
            buffer.println("\t\t}")
          }
          case -1 => {
            buffer.println("\t\ti=0")
            buffer.println("\t\tselfObject." + getGetter(subClass.getName) + ".foreach{ sub => ")
            buffer.println("\t\t\tsubResult +=  sub -> (previousAddr+\"/@" + subClass.getName + ".\"+i) ")
            buffer.println("\t\t\tsubResult = subResult ++ get" + subClass.getEReferenceType.getName + "XmiAddr(sub,previousAddr+\"/@" + subClass.getName + ".\"+i)")
            buffer.println("\t\t\ti=i+1")
            buffer.println("\t\t}")
            buffer.println()
          }
        }
    }

    buffer.println()
    buffer.println("\t\tselfObject match {")
    ProcessorHelper.getConcreteSubTypes(cls).foreach { subType =>
      buffer.println("\t\t\tcase o : "+subType.getName+" =>subResult = subResult ++ get" + subType.getName + "XmiAddr(o,previousAddr)")
    }
    buffer.println("\t\t\tcase _ => ")
    buffer.println("\t\t}")

    buffer.println("\t\tsubResult")
    buffer.println("\t}")


    if (isRoot) {
      buffer.println("\tdef " + cls.getName + "toXmi(selfObject : " + cls.getName + ", addrs : Map[Object,String]) : scala.xml.Node = {")
    } else {
      buffer.println("\tdef " + cls.getName + "toXmi(selfObject : " + cls.getName + ",refNameInParent : String, addrs : Map[Object,String]) : scala.xml.Node = {")
    }

    buffer.println("\t\tselfObject match {")
    ProcessorHelper.getConcreteSubTypes(cls).foreach {
      subType =>
        buffer.println("\t\t\tcase o : "+subType.getName+" => "+subType.getName+"toXmi(o,refNameInParent,addrs)")
    }

    buffer.println("\t\t\tcase _ => {")
    buffer.println("\t\t\tnew scala.xml.Node {")
    if (!isRoot) {
      buffer.println("\t\t\t\t\tdef label = refNameInParent")
    } else {
      buffer.println("\t\t\t\t\tdef label = \"" + refNameInParent + "\"")
    }


    buffer.println("\t\t\t\t\tdef child = {")
    buffer.println("\t\t\t\t\t\tvar subresult: List[scala.xml.Node] = List()  ")

    cls.getEAllContainments.foreach {
      subClass =>

        subClass.getUpperBound match {
          case 1 => {
            buffer.println("\t\t\t\t\t\tselfObject." + getGetter(subClass.getName) + ".map { so => ")
            buffer.println("\t\t\t\t\t\t\tsubresult = subresult ++ List(" + subClass.getEReferenceType.getName + "toXmi(so,\"" + subClass.getName + "\",addrs))")
            buffer.println("\t\t\t\t\t\t}")
          }
          case -1 => {
            buffer.println("\t\t\t\t\t\tselfObject." + getGetter(subClass.getName) + ".foreach { so => ")
            buffer.println("\t\t\t\t\t\t\tsubresult = subresult ++ List(" + subClass.getEReferenceType.getName + "toXmi(so,\"" + subClass.getName + "\",addrs))")
            buffer.println("\t\t\t\t\t\t}")
          }

        }

    }

    buffer.println("\t\t\t\t\t\tsubresult    ")
    buffer.println("\t\t\t\t\t}              ")





    if (isRoot || cls.getEAllAttributes.size() > 0 || cls.getEAllReferences.filter(eref => !cls.getEAllContainments.contains(eref)).size > 0) {
      buffer.println("\t\t\t\t\toverride def attributes  : scala.xml.MetaData =  { ")
      buffer.println("\t\t\t\t\t\tvar subAtts : scala.xml.MetaData = scala.xml.Null")
      if (isRoot) {
        buffer.println("\t\t\t\t\t\tsubAtts=subAtts.append(new scala.xml.UnprefixedAttribute(\"xmlns:" + cls.getEPackage.getNsPrefix + "\",\"" + cls.getEPackage.getNsURI + "\",scala.xml.Null))")
        buffer.println("\t\t\t\t\t\tsubAtts=subAtts.append(new scala.xml.UnprefixedAttribute(\"xmlns:xsi\",\"http://wwww.w3.org/2001/XMLSchema-instance\",scala.xml.Null))")
        buffer.println("\t\t\t\t\t\tsubAtts=subAtts.append(new scala.xml.UnprefixedAttribute(\"xmi:version\",\"2.0\",scala.xml.Null))")
        buffer.println("\t\t\t\t\t\tsubAtts=subAtts.append(new scala.xml.UnprefixedAttribute(\"xmlns:xml\",\"http://www.omg.org/XMI\",scala.xml.Null))")

      }


      //if (cls.isAbstract || cls.isInterface) {
      //buffer.println("selfObject match {")
      //ProcessorHelper.getConcreteSubTypes(cls).foreach {
      //concreteType =>
      //buffer.println("case concreteT : " + concreteType.getName + " => {")
      buffer.println("\t\t\t\t\t\tsubAtts=subAtts.append(new scala.xml.UnprefixedAttribute(\"xsi:type\",\"" + cls.getEPackage.getName + ":" + cls.getName + "\",scala.xml.Null))")
      // buffer.println("}")
      //}
      //buffer.println("case _ =>")
      //buffer.println("}")
      //}
      cls.getEAllAttributes.foreach {
        att =>
          att.getUpperBound match {
            case 1 => {
              att.getLowerBound match {
                /*
           case 0 => {
             buffer.println("selfObject." + getGetter(att.getName) + ".map{sub =>")
             buffer.println("subAtts= subAtts.append(new scala.xml.UnprefixedAttribute(\"" + att.getName + "\",sub.toString,scala.xml.Null))")
             buffer.println("}")
           }     */
                case _ => {
                  buffer.println("\t\t\t\t\t\tif(selfObject." + getGetter(att.getName) + ".toString != \"\"){")
                  buffer.println("\t\t\t\t\t\t\tsubAtts= subAtts.append(new scala.xml.UnprefixedAttribute(\"" + att.getName + "\",selfObject." + getGetter(att.getName) + ".toString,scala.xml.Null))")
                  buffer.println("\t\t\t\t\t\t}")
                }
              }


            }
            case -1 => println("WTF!")
          }

      }
      cls.getEAllReferences.filter(eref => !cls.getEAllContainments.contains(eref)).foreach {
        ref =>
          ref.getUpperBound match {
            case 1 => {
              ref.getLowerBound match {
                case 0 => {
                  buffer.println("\t\t\t\t\t\tselfObject." + getGetter(ref.getName) + ".map{sub =>")
                  buffer.println("\t\t\t\t\t\t\tsubAtts= subAtts.append(new scala.xml.UnprefixedAttribute(\"" + ref.getName + "\",addrs.get(sub).getOrElse{\"non contained reference\"},scala.xml.Null))")
                  buffer.println("\t\t\t\t\t\t}")
                }
                case 1 => {
                  buffer.println("\t\t\t\t\t\tsubAtts= subAtts.append(new scala.xml.UnprefixedAttribute(\"" + ref.getName + "\",addrs.get(selfObject." + getGetter(ref.getName) + ").getOrElse{\"non contained reference\"},scala.xml.Null))")
                }
              }


            }
            case _ => {
              buffer.println("\t\t\t\t\t\tvar subadrs" + ref.getName + " : List[String] = List()")
              buffer.println("\t\t\t\t\t\tselfObject." + getGetter(ref.getName) + ".foreach{sub =>")
              buffer.println("\t\t\t\t\t\t\tsubadrs" + ref.getName + " = subadrs" + ref.getName + " ++ List(addrs.get(sub).getOrElse{\"non contained reference\"})")
              buffer.println("\t\t\t\t\t\t}")
              buffer.println("\t\t\t\t\t\tif(subadrs" + ref.getName + ".size > 0){")
              buffer.println("\t\t\t\t\t\t\tsubAtts= subAtts.append(new scala.xml.UnprefixedAttribute(\"" + ref.getName + "\",subadrs" + ref.getName + ".mkString(\" \"),scala.xml.Null))")
              buffer.println("\t\t\t\t\t\t}")
            }
          }
      }
      buffer.print("\t\t\t\t\t\tsubAtts")
      buffer.println("\t\t\t\t\t}")
    }

    buffer.println("\t\t\t\t}")

    buffer.println("\t\t\t}") //End new Node
    buffer.println("\t\t}") //End MATCH CASE
    buffer.println("\t}") //END TO XMI
    buffer.println("}") //END TRAIT
  }


}
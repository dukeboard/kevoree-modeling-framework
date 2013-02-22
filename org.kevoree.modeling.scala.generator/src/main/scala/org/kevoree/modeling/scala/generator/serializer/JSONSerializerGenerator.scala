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



package org.kevoree.modeling.scala.generator.serializer

import scala.collection.JavaConversions._
import java.io.{File, PrintWriter}
import org.eclipse.emf.ecore.{EPackage, EClass}
import org.kevoree.modeling.scala.generator.{GenerationContext, ProcessorHelper}

/**
 * Created by IntelliJ IDEA.
 * User: duke
 * Date: 02/10/11
 * Time: 20:55
 */

class JSONSerializerGenerator(ctx: GenerationContext) {


  def generateSerializer(pack: EPackage) {

    val serializerGenBaseDir = ProcessorHelper.getPackageGenDir(ctx, pack) + "/jsonserializer/"
    ProcessorHelper.checkOrCreateFolder(serializerGenBaseDir)

    val modelPackage = ProcessorHelper.fqn(ctx, pack)


    ctx.getRootContainerInPackage(pack) match {
      case Some(cls: EClass) => {
        val subs = generateSerializer(serializerGenBaseDir, modelPackage, pack.getName + ":" + cls.getName, cls, pack, true)
        generateDefaultSerializer(serializerGenBaseDir, modelPackage, cls, pack, subs)
      }
      case None => throw new UnsupportedOperationException("Root container not found. Returned one.")
    }
  }

  private def generateDefaultSerializer(genDir: String, packageName: String, root: EClass, rootJsonPackage: EPackage, sub: Set[String]) {

    val genFile = new File(genDir + "ModelJSONSerializer.scala")
    val pr = new PrintWriter(genFile, "utf-8")
    pr.println("package " + packageName + ".jsonserializer")
    pr.println("class ModelJSONSerializer ")

    if (sub.size > 0) {
      pr.print(sub.mkString(" extends ", " with ", " "))
    }

    pr.println("{")

    pr.println()
    pr.println("def serialize(o : Object,ostream : java.io.OutputStream) = {")
    pr.println()
    pr.println("o match {")
    pr.println("case o : " + ProcessorHelper.fqn(ctx, root) + " => {")
    pr.println("val context = get" + root.getName + "JsonAddr(o,\"/\")")
    pr.println("val wt = new java.io.PrintStream(new java.io.BufferedOutputStream(ostream),false)")
    pr.println("" + root.getName + "toJson(o,context,wt)")
    pr.println("wt.flush")
    pr.println("wt.close")
    pr.println("}")
    pr.println("case _ => null")
    pr.println("}") //END MATCH
    pr.println("}") //END serialize method
    pr.println("}") //END TRAIT
    pr.flush()
    pr.close()

    ProcessorHelper.formatScalaSource(genFile)

  }


  private def generateSerializer(genDir: String, packageName: String, refNameInParent: String, root: EClass, rootJsonPackage: EPackage, isRoot: Boolean = false): Set[String] = {
    var subSerializer = Set[String](root.getName + "Serializer")

    // ProcessorHelper.checkOrCreateFolder(genDir + "/serializer")
    //PROCESS SELF
    //System.out.println("[DEBUG] SerializerGenerator::generateSerializer => " + root.getName)

    val file = new File(genDir + root.getName + "Serializer.scala")

    //if(!file.exists()) {
    val pr = new PrintWriter(file, "utf-8")
    pr.println("package " + packageName + ".serializer")
    generateToJsonMethod(rootJsonPackage, root, pr, rootJsonPackage.getName + ":" + root.getName, isRoot)
    pr.flush()
    pr.close()

    ProcessorHelper.formatScalaSource(file)


    //PROCESS SUB
    root.getEAllContainments.foreach {
      sub =>
        val subfile = new File(genDir + sub.getEReferenceType.getName + "Serializer.scala")
        if (!subfile.exists()) {
          val subpr = new PrintWriter(subfile, "utf-8")
          subpr.println("package " + packageName + ".serializer")
          generateToJsonMethod(rootJsonPackage, sub.getEReferenceType, subpr, sub.getName)
          subpr.flush()
          subpr.close()

          ProcessorHelper.formatScalaSource(subfile)


          //¨PROCESS ALL SUB TYPE
          ProcessorHelper.getAllConcreteSubTypes(sub.getEReferenceType).foreach {
            subsubType =>
              if (subsubType != root) {
                //avoid looping in case of self-containment
                subSerializer = subSerializer ++ generateSerializer(genDir, packageName, sub.getName, subsubType, rootJsonPackage)
              }
          }
          if (sub.getEReferenceType != root) {
            //avoid looping in case of self-containment
            subSerializer = subSerializer ++ generateSerializer(genDir, packageName, sub.getName, sub.getEReferenceType, rootJsonPackage)
          }
        }

    }
    // }

    subSerializer

  }


  private def getGetter(name: String): String = {
    "get" + name.charAt(0).toUpper + name.substring(1)
  }


  private def generateToJsonMethod(pack: EPackage, cls: EClass, buffer: PrintWriter, refNameInParent: String, isRoot: Boolean = false) = {
    val packageOfModel = ProcessorHelper.fqn(ctx, pack)
    buffer.println("import " + packageOfModel + "._")
    buffer.println()
    buffer.println("trait " + cls.getName + "Serializer ")
    var stringListSubSerializers = Set[Tuple2[String, String]]()
    if (cls.getEAllContainments.size > 0) {
      cls.getEAllContainments.foreach {
        contained =>
          if (contained.getEReferenceType != cls) {
            stringListSubSerializers = stringListSubSerializers ++ Set(Tuple2(ProcessorHelper.fqn(ctx, contained.getEReferenceType), contained.getEReferenceType.getName)) // + "Serializer")
          }
      }
    }
    val subTypes = ProcessorHelper.getDirectConcreteSubTypes(cls)
    if (subTypes.size > 0) {
      subTypes.foreach {
        sub =>
          stringListSubSerializers = stringListSubSerializers ++ Set(Tuple2(ProcessorHelper.fqn(ctx, sub), sub.getName)) // + "Serializer")
      }
    }
    buffer.println("{")
    buffer.println()
    stringListSubSerializers.foreach {
      sub =>
        buffer.println("def get" + sub._2 + "JsonAddr(o : " + sub._1 + ",previousAddr : String) : scala.collection.mutable.Map[Object,String]") //PRINT ABSTRACT USEFULL METHOD
        buffer.println("def " + sub._2 + "toJson(o :" + sub._1 + ",refNameInParent : String, addrs : scala.collection.mutable.Map[Object,String], ostream : java.io.PrintStream)")
    }
    buffer.println()
    buffer.println()
    buffer.println()

    //GENERATE GET Json ADDR
    //System.out.println("[DEBUG] SerializerGen::" + cls)
    buffer.println("def get" + cls.getName + "JsonAddr(selfObject : " + ProcessorHelper.fqn(ctx, cls) + ",previousAddr : String): scala.collection.mutable.Map[Object,String] = {")
    buffer.println("var subResult = new scala.collection.mutable.HashMap[Object,String]()")
    buffer.println("if(previousAddr == \"/\"){ subResult.put(selfObject,\"/\") }\n")
    buffer.println("var i = 0")
    cls.getEAllContainments.foreach {
      subClass =>
        subClass.getUpperBound match {
          case 1 => {
            if (subClass.getLowerBound == 0) {
              buffer.println()
              buffer.println("selfObject." + getGetter(subClass.getName) + ".map{ sub =>")
              buffer.println("subResult +=  sub -> (previousAddr+\"/@" + subClass.getName + "\" ) ")
              buffer.println("subResult ++= get" + subClass.getEReferenceType.getName + "JsonAddr(sub,previousAddr+\"/@" + subClass.getName + "\")")
              buffer.println("}")
            } else {
              buffer.println()
              //buffer.println(" + ".map{ sub =>")
              buffer.println("subResult +=  selfObject." + getGetter(subClass.getName) + " -> (previousAddr+\"/@" + subClass.getName + "\" ) ")
              buffer.println("subResult ++= get" + subClass.getEReferenceType.getName + "JsonAddr(selfObject." + getGetter(subClass.getName) + ",previousAddr+\"/@" + subClass.getName + "\")")
              //buffer.println("}")
            }
          }
          case -1 => {
            buffer.println("i=0")
            buffer.println("selfObject." + getGetter(subClass.getName) + ".foreach{ sub => ")
            buffer.println("subResult +=  sub -> (previousAddr+\"/@" + subClass.getName + ".\"+i) ")
            buffer.println("subResult ++= get" + subClass.getEReferenceType.getName + "JsonAddr(sub,previousAddr+\"/@" + subClass.getName + ".\"+i)")
            buffer.println("i=i+1")
            buffer.println("}")
            buffer.println()
          }
        }
    }

    buffer.println()

    if (subTypes.size > 0) {
      buffer.println("selfObject match {")
      subTypes.foreach {
        subType =>
          buffer.println("case o:" + ProcessorHelper.fqn(ctx, subType) + " =>subResult ++= get" + subType.getName + "JsonAddr(selfObject.asInstanceOf[" + ProcessorHelper.fqn(ctx, subType) + "],previousAddr)")
      }

      buffer.println("case _ => \n")//throw new InternalError(\""+ cls.getName +"Serializer did not match anything for selfObject class name: \" + selfObject.getClass.getName)")
      buffer.println("}")
    }



    buffer.println("subResult")
    buffer.println("}")


    if (isRoot) {
      buffer.println("def " + cls.getName + "toJson(selfObject : " + ProcessorHelper.fqn(ctx, cls) + ", addrs : scala.collection.mutable.Map[Object,String], ostream : java.io.PrintStream) = {")
    } else {
      buffer.println("def " + cls.getName + "toJson(selfObject : " + ProcessorHelper.fqn(ctx, cls) + ",refNameInParent : String, addrs : scala.collection.mutable.Map[Object,String], ostream : java.io.PrintStream) = {")
    }
    buffer.println("selfObject match {")
    val subtypesList = ProcessorHelper.getDirectConcreteSubTypes(cls)
    subtypesList.foreach {
      subType =>
        buffer.println("case o:" + ProcessorHelper.fqn(ctx, subType) + " => " + subType.getName + "toJson(selfObject.asInstanceOf[" + ProcessorHelper.fqn(ctx, subType) + "],refNameInParent,addrs,ostream)")
    }
    buffer.println("case _ => {")
    if(isRoot){
      buffer.println("ostream.println(\"<?xml version=\\\"1.0\\\" encoding=\\\"UTF-8\\\"?>\")")
    }

    buffer.println("ostream.print('<')")
    if (!isRoot) {
      buffer.println("ostream.print(refNameInParent)")
    } else {
      buffer.println("ostream.print(\"" + refNameInParent + "\")")
    }
    if (isRoot || cls.getEAllAttributes.size() > 0 || cls.getEAllReferences.filter(eref => !cls.getEAllContainments.contains(eref)).size > 0) {
      if (isRoot) {
        buffer.println("ostream.print(\" xmlns:" + cls.getEPackage.getNsPrefix + "=\\\"" + cls.getEPackage.getNsURI + "\\\"\")")
        buffer.println("ostream.print(\" xmlns:xsi=\\\"http://wwww.w3.org/2001/XMLSchema-instance\\\"\")")
        buffer.println("ostream.print(\" Json:version=\\\"2.0\\\"\")")
        buffer.println("ostream.print(\" xmlns:Json=\\\"http://www.omg.org/Json\\\"\")")
      }
      buffer.println("ostream.print(\" xsi:type=\\\"" + cls.getEPackage.getName + ":" + cls.getName + "\\\"\")")
      cls.getEAllAttributes.foreach {
        att =>
          att.getUpperBound match {
            case 1 => {
              att.getLowerBound match {
                case _ => {
                  buffer.println("if(selfObject." + getGetter(att.getName) + ".toString != \"\"){")
                  buffer.println("ostream.print((\" " + att.getName + "=\\\"\"+selfObject." + getGetter(att.getName) + "+\"\\\"\"))")
                  buffer.println("}")
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
                  buffer.println("selfObject." + getGetter(ref.getName) + ".map{sub =>")
                  buffer.println("ostream.print((\" " + ref.getName + "=\\\"\"+addrs.get(sub).getOrElse{throw new Exception(\"KMF Serialization error : non contained reference\");\"non contained reference "+cls.getName+"/"+ref.getName+" \"}+\"\\\"\"))")
                  buffer.println("}")
                }
                case 1 => {
                  if (ref.getEOpposite != null) {
                    if (ref.getEOpposite.getUpperBound != -1) {
                      buffer.println("ostream.print((\" " + ref.getName + "=\\\"\"+addrs.get(selfObject." + getGetter(ref.getName) + ").getOrElse{throw new Exception(\"KMF Serialization error : non contained reference "+cls.getName+"/"+ref.getName+" \");\"non contained reference\"}+\"\\\"\"))")
                    } else {
                       //OPTIMISATION, WE DON'T SAVE BOTH REFERENCE
                       //WARNING ECLIPSE COMPAT VERIFICATION
                    }
                  } else {
                    buffer.println("ostream.print((\" " + ref.getName + "=\\\"\"+addrs.get(selfObject." + getGetter(ref.getName) + ").getOrElse{throw new Exception(\"KMF Serialization error : non contained reference "+cls.getName+"/"+ref.getName+" \");\"non contained reference\"}+\"\\\"\"))")
                  }

                }
              }
            }
            case _ => {
              //buffer.println("var subadrs" + ref.getName + " : List[String] = List()")
              buffer.println("if(selfObject." + getGetter(ref.getName) + ".size > 0){")
              buffer.println("ostream.print(\" " + ref.getName + "=\\\"\")")
              buffer.println("var firstItLoop = true")
              buffer.println("selfObject." + getGetter(ref.getName) + ".foreach{sub =>")
              buffer.println("if(!firstItLoop){ostream.print(\" \")}")
              buffer.println("ostream.print(addrs.get(sub).getOrElse{throw new Exception(\"KMF Serialization error : non contained reference "+cls.getName+"/"+ref.getName+" \");\"non contained reference\"})")
              buffer.println("firstItLoop=false")
              buffer.println("}")
              buffer.println("ostream.print(\"\\\"\")")
              buffer.println("}")
            }
          }
      }
    }
    buffer.println("ostream.print('>')")
    buffer.println("ostream.println()")
    cls.getEAllContainments.foreach {
      subClass =>
        subClass.getUpperBound match {
          case 1 => {
            if (subClass.getLowerBound == 0) {
              buffer.println("selfObject." + getGetter(subClass.getName) + ".map { so => ")
              buffer.println("" + subClass.getEReferenceType.getName + "toJson(so,\"" + subClass.getName + "\",addrs,ostream)")
              buffer.println("}")
            } else {
              buffer.println("" + subClass.getEReferenceType.getName + "toJson(selfObject." + getGetter(subClass.getName) + ",\"" + subClass.getName + "\",addrs,ostream)")
            }
          }
          case -1 => {
            buffer.println("selfObject." + getGetter(subClass.getName) + ".foreach { so => ")
            buffer.println("" + subClass.getEReferenceType.getName + "toJson(so,\"" + subClass.getName + "\",addrs,ostream)")
            buffer.println("}")
          }
        }
    }
    //Close Tag
    buffer.println("ostream.print(\"</\")")
    if (!isRoot) {
      buffer.println("ostream.print(refNameInParent)")
    } else {
      buffer.println("ostream.print(\"" + refNameInParent + "\")")
    }
    buffer.println("ostream.print('>')")
    buffer.println("ostream.println()")

    buffer.println("}")
    buffer.println("}") //End MATCH CASE
    buffer.println("}") //END TO Json
    buffer.println("}") //END TRAIT
  }


}
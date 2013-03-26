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

package org.kevoree.modeling.kotlin.generator.serializer

import scala.collection.JavaConversions._
import java.io.{File, PrintWriter}
import org.eclipse.emf.ecore.{EEnum, EReference, EPackage, EClass}
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}

/**
 * Created by IntelliJ IDEA.
 * User: duke
 * Date: 02/10/11
 * Time: 20:55
 */

class SerializerJsonGenerator(ctx: GenerationContext) {

  def generateJsonSerializer(pack: EPackage) {

    ctx.getRootContainerInPackage(pack) match {
      case Some(cls: EClass) => {
        val serializerGenBaseDir = ProcessorHelper.getPackageGenDir(ctx, cls.getEPackage) + "/serializer/"
        ProcessorHelper.checkOrCreateFolder(serializerGenBaseDir)

        val modelPackage = ProcessorHelper.fqn(ctx, cls.getEPackage)
        val subs = generateSerializer(serializerGenBaseDir, modelPackage, cls.getEPackage.getName + ":" + cls.getName, cls, pack, true)
        generateDefaultSerializer(serializerGenBaseDir, modelPackage, cls, cls.getEPackage, subs)
      }
      case None => throw new UnsupportedOperationException("Root container not found. Returned one.")
    }
  }


  private def generateDefaultSerializer(genDir: String, packageName: String, root: EClass, rootJsonPackage: EPackage, sub: Set[String]) {

    val genFile = new File(genDir + "ModelJSONSerializer.kt")
    val pr = new PrintWriter(genFile, "utf-8")
    pr.println("package " + packageName + ".serializer")
    pr.println("class ModelJSONSerializer ")
    if (sub.size > 0) {
      pr.print(sub.mkString(" : ", " , ", " "))
    }
    pr.println("{")
    pr.println()
    pr.println("fun serialize(oMS : Any,ostream : java.io.OutputStream) {")
    pr.println()
    pr.println("when(oMS) {")
    pr.println("is " + ProcessorHelper.fqn(ctx, root) + " -> {")
    pr.println("val context = get" + root.getName + "JsonAddr(oMS,\"/\")")
    pr.println("val wt = java.io.PrintStream(java.io.BufferedOutputStream(ostream),false)")
    pr.println("" + root.getName + "toJson(oMS,context,wt)")
    pr.println("wt.flush()")
    pr.println("wt.close()")
    pr.println("}")
    pr.println("else -> { }")
    pr.println("}") //END MATCH
    pr.println("}") //END serialize method
    pr.println("}") //END TRAIT
    pr.flush()
    pr.close()


  }
  var alreadyGenerated = Set[EClass]()


  private def generateSerializer(genDir: String, packageName: String, refNameInParent: String, root: EClass, rootJsonPackage: EPackage, isRoot: Boolean = false): Set[String] = {
    var subSerializer = Set[String](root.getName + "JsonSerializer")
    val file = new File(genDir + root.getName + "JsonSerializer.kt")
    val pr = new PrintWriter(file, "utf-8")
    pr.println("package " + packageName + ".serializer")
    generateToJsonMethod(rootJsonPackage, root, pr, rootJsonPackage.getName + ":" + root.getName, isRoot)
    pr.flush()
    pr.close()
    //PROCESS SUB
    root.getEAllContainments.foreach {
      sub =>
        val subfile = new File(genDir + sub.getEReferenceType.getName + "JsonSerializer.kt")
        //if (!subfile.exists()) {
          val subpr = new PrintWriter(subfile, "utf-8")
          subpr.println("package " + packageName + ".serializer")
          generateToJsonMethod(rootJsonPackage, sub.getEReferenceType, subpr, sub.getName)
          subpr.flush()
          subpr.close()
          //¨PROCESS ALL SUB TYPE
          ProcessorHelper.getAllConcreteSubTypes(sub.getEReferenceType).foreach {
            subsubType =>
              if (subsubType != root && !alreadyGenerated.contains(subsubType)) {
                //avoid looping in case of self-containment
                alreadyGenerated = alreadyGenerated ++ Set(subsubType)
                subSerializer = subSerializer ++ generateSerializer(genDir, packageName, sub.getName, subsubType, rootJsonPackage)
              }
          }
          if (sub.getEReferenceType != root  && !alreadyGenerated.contains(sub.getEReferenceType)) {
            //avoid looping in case of self-containment
            alreadyGenerated = alreadyGenerated ++ Set(sub.getEReferenceType)
            subSerializer = subSerializer ++ generateSerializer(genDir, packageName, sub.getName, sub.getEReferenceType, rootJsonPackage)
          }
    }
    subSerializer
  }


  private def getGetter(name: String): String = {
    "get" + name.charAt(0).toUpper + name.substring(1)
  }


  private def generateToJsonMethod(pack: EPackage, cls: EClass, buffer: PrintWriter, refNameInParent: String, isRoot: Boolean = false) = {
    val packageOfModel = ProcessorHelper.fqn(ctx, pack)

    buffer.println("import " + packageOfModel + ".*")
    buffer.println()
    buffer.println("trait " + cls.getName + "JsonSerializer ")


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
        buffer.println("open fun get" + sub._2 + "JsonAddr(o : " + sub._1 + ",previousAddr : String) : Map<Any,String>") //PRINT ABSTRACT USEFULL METHOD
        buffer.println("open fun " + sub._2 + "toJson(o :" + sub._1 + ",refNameInParent : String, addrs : Map<Any,String>, ostream : java.io.PrintStream)")
    }
    buffer.println()
    buffer.println()
    buffer.println()


    //GENERATE GET Json ADDR                                                                              0
    buffer.println("fun get" + cls.getName + "JsonAddr(selfObject : " + ProcessorHelper.fqn(ctx, cls) + ",previousAddr : String): Map<Any,String> {")
    buffer.println("var subResult = java.util.HashMap<Any,String>()")
    buffer.println("if(previousAddr == \"/\"){ subResult.put(selfObject,\"/\") }\n")

    if (cls.getEAllContainments.filter(subClass => subClass.getUpperBound == -1).size > 0){
      buffer.println("var i = 0")
    }

    var firstUsed = true

    cls.getEAllContainments.foreach {
      subClass =>
        subClass.getUpperBound match {
          case 1 => {
              buffer.println("val sub"+subClass.getName+" = selfObject."+getGetter(subClass.getName)+"()")
              buffer.println("if(sub"+subClass.getName+"!= null){")
              buffer.println("subResult.put(sub"+subClass.getName+",previousAddr+\"/@" + subClass.getName + "\" )")
              buffer.println("subResult.putAll(get" + subClass.getEReferenceType.getName + "JsonAddr(sub"+subClass.getName+",previousAddr+\"/@" + subClass.getName + "\"))")
              buffer.println("}")
          }
          case -1 => {
            if (!firstUsed){
              buffer.println("i=0")
            }
            firstUsed = false
            buffer.println("for(sub in selfObject." + getGetter(subClass.getName) + "()){")
            buffer.println("subResult.put(sub,(previousAddr+\"/@" + subClass.getName + ".\"+i))")
            buffer.println("subResult.putAll(get" + subClass.getEReferenceType.getName + "JsonAddr(sub,previousAddr+\"/@" + subClass.getName + ".\"+i))")
            buffer.println("i=i+1")
            buffer.println("}")
            buffer.println()
          }
        }
    }

    buffer.println()
    if (subTypes.size > 0) {
      buffer.println("when(selfObject) {")
      subTypes.foreach {
        subType =>
          buffer.println("is " + ProcessorHelper.fqn(ctx, subType) + " -> { subResult.putAll(get" + subType.getName + "JsonAddr(selfObject as " + ProcessorHelper.fqn(ctx, subType) + ",previousAddr)) }")
      }
      buffer.println("else -> {}")//throw new InternalError(\""+ cls.getName +"Serializer did not match anything for selfObject class name: \" + selfObject.getClass.getName)")
      buffer.println("}")
    }
    buffer.println("return subResult")
    buffer.println("}")
    if (isRoot) {
      buffer.println("fun " + cls.getName + "toJson(selfObject : " + ProcessorHelper.fqn(ctx, cls) + ", addrs : Map<Any,String>, ostream : java.io.PrintStream) {")
    } else {
      buffer.println("fun " + cls.getName + "toJson(selfObject : " + ProcessorHelper.fqn(ctx, cls) + ",refNameInParent : String, addrs : Map<Any,String>, ostream : java.io.PrintStream) {")
    }
    buffer.println("when(selfObject) {")
    val subtypesList = ProcessorHelper.getDirectConcreteSubTypes(cls)
    subtypesList.foreach {
      subType =>
        buffer.println("is " + ProcessorHelper.fqn(ctx, subType) + " -> {" + subType.getName + "toJson(selfObject as " + ProcessorHelper.fqn(ctx, subType) + ",refNameInParent,addrs,ostream) }")
    }
    buffer.println("else -> {")
    buffer.println("ostream.print('{')")
    buffer.println("ostream.print(\" \\\"eClass\\\":\\\""+cls.getEPackage.getName+":"+cls.getName+"\\\" \")")
    if (cls.getEAllAttributes.size() > 0 || cls.getEAllReferences.filter(eref => !cls.getEAllContainments.contains(eref)).size > 0) {
      cls.getEAllAttributes.foreach {
        att =>
          att.getUpperBound match {
            case 1 => {
              att.getLowerBound match {
                case _ => {
                  if (att.getEAttributeType.isInstanceOf[EEnum]){
                    buffer.println("if(selfObject." + getGetter(att.getName) + "() != null){")
                    buffer.println("ostream.println(',')")
                    buffer.println("ostream.print(\" \\\"" + att.getName + "\\\":\\\"\"+selfObject." + getGetter(att.getName) + "()!!.name()+\"\\\"\")")
                    buffer.println("}")
                  } else {
                    buffer.println("if(selfObject." + getGetter(att.getName) + "().toString() != \"\"){")
                    buffer.println("ostream.println(',')")
                    buffer.println("ostream.print(\" \\\"" + att.getName + "\\\":\\\"\"+selfObject." + getGetter(att.getName) + "()+\"\\\"\")")
                    buffer.println("}")
                  }
                }
              }
            }
            case -1 => println("WTF! "+att.getName)
          }
      }


      def generateRef(ref : EReference){
        buffer.println("val subsub"+ref.getName+" = selfObject."+getGetter(ref.getName)+"()")
        buffer.println("if(subsub"+ref.getName+" != null){")
        buffer.println("val subsubsub"+ref.getName+" = addrs.get(subsub"+ref.getName+")")
        buffer.println("if(subsubsub"+ref.getName+" != null){")
        buffer.println("ostream.println(',')")
        buffer.println("ostream.print(\" \\\"" + ref.getName + "\\\":\\\"\"+subsubsub"+ref.getName+"+\"\\\"\")")
        buffer.println("} else {")
        buffer.println("throw Exception(\"KMF "+cls.getName+" Serialization error : No address found for reference "+ref.getName+"(id:\"+subsub"+ref.getName+"+\" container:\"+subsub"+ref.getName+".eContainer()+\")\")")
        buffer.println("}")
        buffer.println("}")
      }

      cls.getEAllReferences.filter(eref => !cls.getEAllContainments.contains(eref)).foreach {
        ref =>
          ref.getUpperBound match {
            case 1 => {
              ref.getLowerBound match {
                case 0 => {
                  generateRef(ref)
                }
                case 1 => {
                  if (ref.getEOpposite != null) {
                    if (ref.getEOpposite.getUpperBound != -1) {
                      generateRef(ref)
                    } else {
                      //OPTIMISATION, WE DON'T SAVE BOTH REFERENCE
                      //WARNING ECLIPSE COMPAT VERIFICATION
                    }
                  } else {
                    generateRef(ref)
                  }
                }
              }
            }
            case _ => {
              buffer.println("if(selfObject." + getGetter(ref.getName) + "().size() > 0){")
              buffer.println("ostream.println(',')")
              buffer.println("ostream.print(\" \\\"" + ref.getName + "\\\": [\")")
              buffer.println("var firstItLoop = true")
              buffer.println("for(sub in selfObject." + getGetter(ref.getName) + "()){")
              buffer.println("if(!firstItLoop){ostream.println(\",\")}")
              buffer.println("val subsub = addrs.get(sub)")
              buffer.println("if(subsub != null){")
              buffer.println("ostream.print(\"{ \\\"ref\\\" : \\\"\"+subsub+\"\\\"} \")")
              buffer.println("} else {")
              buffer.println("throw Exception(\"KMF Serialization error : non contained reference "+cls.getName+"/"+ref.getName+" \")")
              buffer.println("}")
              buffer.println("firstItLoop=false")
              buffer.println("}")
              buffer.println("ostream.print(\"]\")")
              buffer.println("}")
            }
          }
      }
    }
    cls.getEAllContainments.foreach {
      subClass =>
        subClass.getUpperBound match {
          case 1 => {
            if (subClass.getLowerBound == 0) {
              buffer.println("val sub"+subClass.getName+" = selfObject."+getGetter(subClass.getName)+"()")
              buffer.println("if(sub"+subClass.getName+"!= null){")
              buffer.println("ostream.println(',')")
              buffer.println("ostream.print(\"\\\""+subClass.getName+"\\\":\")")
              buffer.println("" + subClass.getEReferenceType.getName + "toJson(sub"+subClass.getName+",\"" + subClass.getName + "\",addrs,ostream)")
              buffer.println("}")
            } else {
              buffer.println("ostream.println(',')")
              buffer.println("ostream.println(\"\\\""+subClass.getName+"\\\":\")")
              buffer.println("" + subClass.getEReferenceType.getName + "toJson(selfObject." + getGetter(subClass.getName) + "()!!,\"" + subClass.getName + "\",addrs,ostream)")
            }
          }
          case -1 => {
            buffer.println("ostream.println(',')")
            buffer.println("ostream.println(\"\\\""+subClass.getName+"\\\": [\")")
            buffer.println("var iloop_first_"+subClass.getName+" = true")
            buffer.println("for(so in selfObject." + getGetter(subClass.getName) + "()){")
            buffer.println("if(!iloop_first_"+subClass.getName+"){ostream.println(',')}")
            buffer.println("" + subClass.getEReferenceType.getName + "toJson(so,\"" + subClass.getName + "\",addrs,ostream)")
            buffer.println("iloop_first_"+subClass.getName+" = false")
            buffer.println("}")
            buffer.println("ostream.println(']')")
          }
        }
    }
    //Close Tag
    buffer.println("ostream.println('}')")
    buffer.println("}")
    buffer.println("}") //End MATCH CASE
    buffer.println("}") //END TO Json
    buffer.println("}") //END TRAIT
  }


}
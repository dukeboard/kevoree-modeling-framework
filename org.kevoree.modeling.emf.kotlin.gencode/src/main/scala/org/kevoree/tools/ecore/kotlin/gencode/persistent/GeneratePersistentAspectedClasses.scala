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
package org.kevoree.tools.ecore.kotlin.gencode.persistent

import org.eclipse.emf.ecore._
import org.kevoree.tools.ecore.kotlin.gencode.ProcessorHelper._
import org.kevoree.tools.ecore.kotlin.gencode.{ProcessorHelper, GenerationContext}
import java.io.{PrintWriter, File}
import scala.collection.JavaConversions._
import java.text.SimpleDateFormat
import java.util.Date
import scala.Some

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 15/02/13
 * Time: 10:31
 */
class GeneratePersistentAspectedClasses(ctx: GenerationContext) {

  def hasID(cls: EClass): Boolean = {
    cls.getEAllAttributes.exists {
      att => att.isID
    }
  }

  def getIdAtt(cls: EClass) = {
    cls.getEAllAttributes.find {
      att => att.isID
    }
  }

  /*
def generateGetIDAtt(cls: EClass) = {
if (getIdAtt(cls).isEmpty) {
  println(cls.getName)
}
"get" + getIdAtt(cls).get.getName.substring(0, 1).toUpperCase + getIdAtt(cls).get.getName.substring(1)
}  */

  def generateContainerTrait(packageGenDir: String, packElement: EPackage) {
    var formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase
    formatedFactoryName += packElement.getName.substring(1)
    formatedFactoryName += "Container"

    ProcessorHelper.checkOrCreateFolder(packageGenDir)
    val localFile = new File(packageGenDir + File.separator + formatedFactoryName + "Internal.kt")
    val pr = new PrintWriter(localFile, "utf-8")

    pr.println("package " + ProcessorHelper.fqn(ctx, packElement) + ".persistency.mdb;")
    pr.println()
    pr.println(ProcessorHelper.generateHeader(packElement))
    //case class name
    pr.println("trait " + formatedFactoryName + "Internal {")
    pr.println()
    pr.println("internal open var internal_eContainer : String?")
    pr.println("internal open var internal_unsetCmd : (()->Unit)?")

    //generate getter
    pr.println("fun eContainer() : String? { return internal_eContainer }")
    //pr.println("open fun setRecursiveReadOnly()")


    //generate setter
    pr.print("\nfun setEContainer( container : String?, unsetCmd : (()->Unit)?) {\n")
    pr.println("if(internal_readOnlyElem){throw Exception(\"ReadOnly Element are not modifiable\")}")
    pr.println("if(internal_unsetCmd != null){")
    pr.println("internal_unsetCmd!!()")
    pr.println("}")

    pr.println("internal_eContainer = container\n")
    pr.println("internal_unsetCmd = unsetCmd")
    pr.println("}")

    pr.println("internal open var internal_readOnlyElem : Boolean")
    pr.println("fun setInternalReadOnly(){")
    pr.println("internal_readOnlyElem = true")
    pr.println("}")

    pr.println("fun isReadOnly() : Boolean {")
    pr.println("return internal_readOnlyElem")
    pr.println("}")

    //pr.println("fun internalGetQuery(selfKey : String) : String? { return null }")

    pr.println("}")

    pr.flush()
    pr.close()
  }
  def generateHeader(packElement: EPackage): String = {
    var header = ""
    val formateur = new SimpleDateFormat("'Date:' dd MMM yy 'Time:' HH:mm")
    header += "/**\n"
    header += " * Created by Kevoree Model Generator(KMF).\n"
    header += " * @developers: Gregory Nain, Fouquet Francois\n"
    header += " * " + formateur.format(new Date) + "\n"
    header += " * Meta-Model:NS_URI=" + packElement.getNsURI + "\n"
    header += " */"
    header
  }

  def generateReadOnlyMethods(pr: PrintWriter) {
    pr.println("")
    pr.println("internal var internal_readOnlyElem : Boolean = false")
    pr.println("")
    pr.println("override fun setInternalReadOnly(){")
    pr.println("internal_readOnlyElem = true")
    pr.println("}")
    pr.println("")
    pr.println("override fun isReadOnly() : Boolean {")
    pr.println("return internal_readOnlyElem")
    pr.println("}")
    pr.println("")
  }

  def generateKMF_IdMethods(cls : EClass, pr : PrintWriter) {
    pr.println("")
    pr.println("var _generated_KMF_ID : String? = null")
    pr.println("")
    pr.println("fun getGenerated_KMF_ID() : String {")

    if (cls.getEAllAttributes.find(att => att.isID).isEmpty) {
      pr.println("if(_generated_KMF_ID == null){")
      pr.println("_generated_KMF_ID = java.util.UUID.randomUUID().toString()")
      pr.println("}")
    }
    pr.println("return _generated_KMF_ID!!")
    pr.println("}")
    pr.println("")
    pr.println("fun setGenerated_KMF_ID(id : String) {")
    pr.println("_generated_KMF_ID = id")
    pr.println("}")
    pr.println("")
  }

  def generatePLayer(ecoreFile: File, modelVersion: String) {

    val model = ctx.getEcoreModel(ecoreFile)
    model.getContents.foreach {
      elem =>
        elem match {
          case pack: EPackage => {
            ctx.getRootContainerInPackage(pack) match {
              case Some(rootContainerClass) => {
                var formatedFactoryName: String = pack.getName.substring(0, 1).toUpperCase
                formatedFactoryName += pack.getName.substring(1)
                formatedFactoryName += "Container"
                val FQNPack = ProcessorHelper.fqn(ctx, pack) + ".persistency.mdb"
                generateContainerTrait(ctx.getRootGenerationDirectory + File.separator + FQNPack.replace(".", File.separator), pack)
                ctx.setKevoreeContainer(Some(ProcessorHelper.fqn(ctx, pack) + "." + formatedFactoryName))
                ctx.setKevoreeContainerImplFQN(ProcessorHelper.fqn(ctx, pack) + ".persistency.mdb." + formatedFactoryName + "Internal")

              }
              case _ => print("No container root found in package : " + pack.getName)
            }
          }
          case _ => println("No model generator for containerRoot element of class: " + elem.getClass)
        }
    }

    model.getAllContents.filter(el => el.isInstanceOf[EPackage] && el.asInstanceOf[EPackage].getEClassifiers.size() > 0).foreach {
      pack =>
        generatePackageFactoryPersistentImpl(ctx, pack.asInstanceOf[EPackage], modelVersion)
    }



    model.getAllContents.foreach {
      eAll =>
        if (eAll.isInstanceOf[EClassifier]) {
          val eClass = eAll.asInstanceOf[EClassifier]

          var getterMapName: String = eClass.getEPackage.getName.substring(0, 1).toUpperCase
          getterMapName += eClass.getEPackage.getName.substring(1)
          getterMapName += "MapGetter"


          val FQNPack = ProcessorHelper.fqn(ctx, eClass.getEPackage) + ".persistency.mdb"
          val FQNPackBase = ProcessorHelper.fqn(ctx, eClass.getEPackage) + "."


          val packPath = ctx.getRootGenerationDirectory + File.separator + FQNPack.replace(".", File.separator)
          ProcessorHelper.checkOrCreateFolder(packPath)

          val className = eClass.getName + "Persistent"

          val localFile = new File(packPath + File.separator + className + ".kt")


          val pr = new PrintWriter(localFile, "utf-8")

          pr.println("package " + FQNPack + ";")
          pr.println()
          pr.println(generateHeader(eClass.getEPackage))
          pr.print("class " + className)
          pr.println("(val mapGetter : " + getterMapName + ") : " + FQNPackBase + eClass.getName + ", "+ctx.getKevoreeContainerImplFQN+", java.io.Serializable { ")


          if (eClass.isInstanceOf[EClass]) {
            val cls = eClass.asInstanceOf[EClass]

            pr.println("override var internal_readOnlyElem: Boolean = false")
            pr.println("override var internal_eContainer: String? = null")
            pr.println("override var internal_unsetCmd : (()->Unit)? = null")

            pr.println("private var entityDB : MutableMap<String,Any>? = null")
            pr.println("private fun getEntityMap() : MutableMap<String,Any>{")
            pr.println("if(entityDB == null){")
            if(hasID(cls)) {
              pr.println("if(_generated_KMF_ID == null){throw Exception(\"Set ID before any use of entity " + eClass.getName + "\")}")
              pr.println("entityDB=mapGetter.get" + eClass.getName + "Entity(_generated_KMF_ID!!)")
            } else {
              pr.println("entityDB=mapGetter.get" + eClass.getName + "Entity(getGenerated_KMF_ID())")
            }

            pr.println("}")
            pr.println("return entityDB!!")
            pr.println("}")
            pr.println("")
            pr.println("fun getAPIClass() : java.lang.Class<"+ProcessorHelper.fqn(ctx,eClass)+"> { return javaClass<" + ProcessorHelper.fqn(ctx,eClass) + ">()}")
            pr.println("")
            pr.println("")
            pr.println("")
            pr.println("")

            //GENERATE CALL GET&SET
            cls.getEAllAttributes.foreach {
              att =>
              //Generate getter
                if (ProcessorHelper.convertType(att.getEAttributeType) == "Any" || att.getEAttributeType.isInstanceOf[EEnum]) {
                  pr.print("override fun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "() : " + ProcessorHelper.convertType(att.getEAttributeType) + "? {\n")
                } else {
                  pr.print("override fun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "() : " + ProcessorHelper.convertType(att.getEAttributeType) + " {\n")
                }
                pr.println(" return getEntityMap().get(\"" + att.getName + "\") as " + ProcessorHelper.convertType(att.getEAttributeType) + "\n}")

                //generate setter
                pr.print("\n override fun set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1))
                pr.print("(" + protectReservedWords(att.getName) + " : " + ProcessorHelper.convertType(att.getEAttributeType) + ") {\n")
                pr.println("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}")
                if (att.isID) {
                  pr.println("_generated_KMF_ID = " + protectReservedWords(att.getName))
                }
                pr.println("getEntityMap().put(\"" + att.getName + "\"," + protectReservedWords(att.getName) + ")")
                pr.println("}")
            }

            cls.getEAllReferences.foreach {
              ref =>
                val typeRefName = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
                ref.isMany match {
                  case false => {
                    //generate setter
                    pr.print("\n override fun set" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1))
                    pr.print("(" + protectReservedWords(ref.getName) + " : " + typeRefName + "?) {\n")
                    pr.println("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}")
                    pr.println("getEntityMap().put(\"" + ref.getName + "\"," + protectReservedWords(ref.getName) + "!!.path()!!)")
                    pr.println("}")
                    //generate getter
                    pr.print("override fun get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "() : " + typeRefName + "? {\n")
                    pr.println(" return getEntityMap().get(\"" + ref.getName + "\") as " + typeRefName + "\n}")
                  }
                  case true => {
                    generateGetter(cls, ref, typeRefName, pr)
                    generateSetter(ctx, cls, ref, typeRefName, pr)
                    pr.println(generateAddMethod(cls, ref, typeRefName, ctx))
                    pr.println(generateRemoveMethod(cls, ref, typeRefName, true, ctx))
                  }
                }
                if (hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)) {
                  pr.println("override fun find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(key : String) : " + protectReservedWords(ProcessorHelper.fqn(ctx, ref.getEReferenceType)) + "? {")
                  pr.println("throw UnsupportedOperationException()")
                  pr.println("}")
                }
            }

            //OK methods
            //generateReadOnlyMethods(pr)
            generateKMF_IdMethods(cls, pr)



            //TODO: SHOULD NOT EXIST IN THE END
            generateMissingMethodsForCompilation(ctx, cls, pr)


          }
          pr.println("}")
          pr.flush()
          pr.close()
        }
    }
  }


  def generateMapGetter(ctx: GenerationContext, packElement: EPackage, modelVersion: String) {
    var formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase
    formatedFactoryName += packElement.getName.substring(1)
    formatedFactoryName += "MapGetter"
    val FQNPackBaseImpl = ProcessorHelper.fqn(ctx, packElement) + ".persistency.mdb"
    val packPath = ctx.getRootGenerationDirectory + File.separator + FQNPackBaseImpl.replace(".", File.separator)
    ProcessorHelper.checkOrCreateFolder(packPath)
    val localFile = new File(packPath + "/" + formatedFactoryName + ".kt")
    val pr = new PrintWriter(localFile, "utf-8")
    pr.println("package " + FQNPackBaseImpl + ";")
    pr.println("trait " + formatedFactoryName + " {")

    packElement.getEClassifiers.foreach {
      cls =>
        cls match {
          case eclass: EClass => {
            pr.println("fun get" + eclass.getName + "Entity(id : String) : MutableMap<String,Any>")
            eclass.getEAllReferences.foreach {
              eRef =>
                pr.println("fun get" + eclass.getName + "_" + eRef.getName + "Relation(id : String) : MutableMap<String,Any>")
            }
          }
          case _@e => println("ignored=" + e) //TODO ENUM EDATATYPE
        }
    }

    pr.println("}")
    pr.flush()
    pr.close()
  }

  def generatePackageFactoryPersistentImpl(ctx: GenerationContext, packElement: EPackage, modelVersion: String) {

    generateMapGetter(ctx, packElement, modelVersion)

    var formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase
    formatedFactoryName += packElement.getName.substring(1)
    formatedFactoryName += "Factory"

    val FQNPackBaseImpl = ProcessorHelper.fqn(ctx, packElement) + ".persistency.mdb"
    val packPath = ctx.getRootGenerationDirectory + File.separator + FQNPackBaseImpl.replace(".", File.separator)
    ProcessorHelper.checkOrCreateFolder(packPath)

    var getterMapName: String = packElement.getName.substring(0, 1).toUpperCase
    getterMapName += packElement.getName.substring(1)
    getterMapName += "MapGetter"


    val localFile = new File(packPath + "/Persistent" + formatedFactoryName + ".kt")
    val pr = new PrintWriter(localFile, "utf-8")

    val packageName = ProcessorHelper.fqn(ctx, packElement)

    pr.println("package " + FQNPackBaseImpl + ";")
    pr.println()
    pr.println("import " + packageName + "." + formatedFactoryName + ";")
    packElement.getEClassifiers.filter(cls => cls.isInstanceOf[EClass]).foreach {
      cls =>
        pr.println("import " + packageName + "." + cls.getName + ";")
    }
    pr.println("import org.mapdb.*;")
    pr.println()
    pr.println(ProcessorHelper.generateHeader(packElement))
    //case class name
    pr.println("open class Persistent" + formatedFactoryName + "(val basedir : java.io.File) : " + formatedFactoryName + ", " + getterMapName + " {")

    pr.println()
    pr.println("{")

    pr.println("if(!basedir.exists()){basedir.mkdirs()}")
    pr.println("if(!basedir.isDirectory()){")
    pr.println("throw java.lang.UnsupportedOperationException(\"Basedir param must be a directory\")")
    pr.println("}")
    pr.println("}")

    // pr.println("\t fun eINSTANCE() = " + formatedFactoryName)
    pr.println("\t override fun getVersion() = \"" + modelVersion + "\"")
    pr.println()
    packElement.getEClassifiers.filter(cls => cls.isInstanceOf[EClass]).foreach {
      cls =>
        val methodName = "create" + cls.getName
        val className = cls.getName + "Persistent"
        pr.println("\t override fun " + methodName + "() : " + cls.getName + " { return " + className + "(this) }")
    }
    pr.println()

    pr.println("private val dbs = java.util.HashMap<String,DB>()")

    //Generate DB Method
    packElement.getEClassifiers.foreach {
      cls =>
        cls match {
          case eclass: EClass => {

            pr.println("private final val dbkey_" + eclass.getName + " : String = \"" + eclass.getName + "\"")
            pr.println("override fun get" + eclass.getName + "Entity(id : String) : MutableMap<String,Any> {")
            pr.println("var res = dbs.get(dbkey_" + eclass.getName + ")")
            pr.println("if(res == null){")
            pr.println("res = DBMaker.newFileDB(java.io.File(basedir.getAbsolutePath()+java.io.File.separator+\"" + ProcessorHelper.fqn(ctx, eclass) + "_entity\"))!!.closeOnJvmShutdown()!!.make()")
            pr.println("dbs.put(dbkey_" + eclass.getName + ",res!!)")
            pr.println("}")
            pr.println("return res!!.getTreeMap(id)!!")
            pr.println("}")
            eclass.getEAllReferences.foreach {
              eRef =>
                pr.println("private final val dbkey_" + eclass.getName + "_" + eRef.getName + "Relation : String = \"" + eclass.getName + "_" + eRef.getName + "\"")
                pr.println("override fun get" + eclass.getName + "_" + eRef.getName + "Relation(id : String) : MutableMap<String,Any> {")
                pr.println("var res = dbs.get(dbkey_" + eclass.getName + "_" + eRef.getName + "Relation)")
                pr.println("if(res == null){")
                pr.println("res = DBMaker.newFileDB(java.io.File(basedir.getAbsolutePath()+java.io.File.separator+\"" + ProcessorHelper.fqn(ctx, eclass) + "_" + eRef.getName + "\"))!!.closeOnJvmShutdown()!!.make()")
                pr.println("dbs.put(dbkey_" + eclass.getName + "_" + eRef.getName + "Relation,res!!)")
                pr.println("}")
                pr.println("return res!!.getTreeMap(id)!!")
                pr.println("}")

            }
          }
          case _@e => println("ignored=" + e) //TODO ENUM EDATATYPE
        }
    }


    pr.println("}")

    pr.flush()
    pr.close()

  }


  private def generateRemoveMethod(cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, ctx: GenerationContext): String = {
    generateRemoveMethodOp(cls, ref, typeRefName, isOptional, false, ctx) + generateRemoveAllMethod(cls, ref, typeRefName, isOptional, false, ctx) +
      (if (ref.getEOpposite != null) {
        generateRemoveMethodOp(cls, ref, typeRefName, isOptional, true, ctx) + generateRemoveAllMethod(cls, ref, typeRefName, isOptional, true, ctx)
      } else {
        ""
      })
  }

  private def generateRemoveMethodOp(cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, noOpposite: Boolean, ctx: GenerationContext): String = {
    //generate remove
    var res = ""
    val formatedMethodName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)

    val refTypeImpl = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".persistency.mdb." + ref.getEReferenceType.getName + "Persistent"


    if (noOpposite) {
      res += "\nfun noOpposite_remove" + formatedMethodName
    } else {
      res += "\noverride fun remove" + formatedMethodName
    }

    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ") {\n"

    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    res += "mapGetter.get" + cls.getName + "_" + ref.getName + "Relation(getGenerated_KMF_ID())"
    res += ".remove((" + protectReservedWords(ref.getName) + " as " + refTypeImpl + " ).getGenerated_KMF_ID())\n"

    if (ref.isContainment) {
      //TODO
      res += "(" + protectReservedWords(ref.getName) + "!! as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null,null)\n"
    }

    val oppositRef = ref.getEOpposite
    if (!noOpposite && oppositRef != null) {
      val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
      val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Internal"

      if (oppositRef.isMany) {
        res += "(" + protectReservedWords(ref.getName) + " as " + refInternalClassFqn + ").noOpposite_remove" + formatedOpositName + "(this)\n"
      } else {
        res += "(" + protectReservedWords(ref.getName) + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(null)\n"
      }
    }
    // res += "}\n"
    res += "}\n"
    res
  }

  private def generateRemoveAllMethod(cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, noOpposite: Boolean, ctx: GenerationContext): String = {
    var res = ""
    if (noOpposite) {
      res += "\nfun noOpposite_removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "() {\n"
    } else {
      res += "\noverride fun removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "() {\n"
    }
    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    if ((!noOpposite && ref.getEOpposite != null) || ref.isContainment) {
      val getterCall = "get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "()"
      if (hasID(ref.getEReferenceType)) {
        res += "for(elm in " + getterCall + "!!){\n"
        res += "val el = elm\n"
      } else {
        res += "val temp_els = java.util.Collections.unmodifiableList(" + getterCall + ")\n"
        res += "for(el in temp_els){\n"
      }
      if (ref.isContainment) {
        res += "(el as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null,null)\n"
      }
      if (ref.getEOpposite != null && !noOpposite) {
        val opposite = ref.getEOpposite
        val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)
        val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Internal"

        if (!opposite.isMany) {
          res += "(el as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(null)"
        } else {
          res += "(el as " + refInternalClassFqn + ").noOpposite_remove" + formatedOpositName + "(this)"
        }
      }
      res += "}\n"
    }
    res += "mapGetter.get" + cls.getName + "_" + ref.getName + "Relation(getGenerated_KMF_ID()).clear()\n"
    res += "}"
    res
  }

  private def generateAddMethod(cls: EClass, ref: EReference, typeRefName: String, ctx: GenerationContext): String = {
    generateAddMethodOp(cls, ref, typeRefName, false, ctx) + generateAddAllMethodOp(cls, ref, typeRefName, false, ctx) +
      (if (ref.getEOpposite != null) {
        generateAddMethodOp(cls, ref, typeRefName, true, ctx) + generateAddAllMethodOp(cls, ref, typeRefName, true, ctx)
      } else {
        ""
      })
  }

  private def generateAddAllMethodOp(cls: EClass, ref: EReference, typeRefName: String, noOpposite: Boolean, ctx: GenerationContext): String = {

    var res = ""
    res += "\n"

    val refTypeImpl = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".persistency.mdb." + ref.getEReferenceType.getName + "Persistent"


    if (noOpposite) {
      res += "\nfun noOpposite_addAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    } else {
      res += "\noverride fun addAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    }
    res += "(" + protectReservedWords(ref.getName) + " :List<" + typeRefName + ">) {\n"
    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")

    res += "val " + protectReservedWords(ref.getName) + "Map = mapGetter.get" + cls.getName + "_" + ref.getName + "Relation(getGenerated_KMF_ID())\n"

    res += "for(el in " + protectReservedWords(ref.getName) + "){\n"
    res += protectReservedWords(ref.getName) + "Map.put((el as " + refTypeImpl + ").getGenerated_KMF_ID(), el.path()!!)\n"
    res += "}\n"



    if ((!noOpposite && ref.getEOpposite != null) || ref.isContainment) {
      res += "for(el in " + protectReservedWords(ref.getName) + "){\n"
      if (ref.isContainment) {

        res += "(el as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(getAPIClass().getName() + \"[\" + getGenerated_KMF_ID() + \"]\",{()->this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(el)})\n"
      }
      if (ref.getEOpposite != null && !noOpposite) {
        val opposite = ref.getEOpposite
        val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)
        val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Internal"
        if (!opposite.isMany) {
          res += "(el as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)"
        } else {
          res += "(el as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)"
        }
      }
      res += "}\n"
    }
    res += "}\n"
    res
  }

  private def generateAddMethodOp(cls: EClass, ref: EReference, typeRefName: String, noOpposite: Boolean, ctx: GenerationContext): String = {
    //generate add
    var res = ""
    val formatedAddMethodName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    val refTypeImpl = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".persistency.mdb." + ref.getEReferenceType.getName + "Persistent"

    if (noOpposite) {
      res += "\nfun noOpposite_add" + formatedAddMethodName
    } else {
      res += "\noverride fun add" + formatedAddMethodName
    }
    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ") {\n"
    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")

    if (ref.isContainment) {
      res += "(" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(getAPIClass().getName() + \"[\" + getGenerated_KMF_ID() + \"]\",{()->this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + protectReservedWords(ref.getName) + ")})\n"
    }

    res += "val " + protectReservedWords(ref.getName) + "Map = mapGetter.get" + cls.getName + "_" + ref.getName + "Relation(getGenerated_KMF_ID())\n"
    res += protectReservedWords(ref.getName) + "Map.put((" + protectReservedWords(ref.getName) + " as " + refTypeImpl + ").getGenerated_KMF_ID(), " + protectReservedWords(ref.getName) + ".path()!!)\n"

    if (ref.getEOpposite != null && !noOpposite) {
      val opposite = ref.getEOpposite
      val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)

      val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Internal"

      if (!opposite.isMany) {
        res += "(" + protectReservedWords(ref.getName) + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)"
      } else {
        res += "(" + protectReservedWords(ref.getName) + " as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)"
      }
    }
    res += "}"
    res
  }

  private def generateGetter(cls: EClass, ref: EReference, typeRefName: String, pr: PrintWriter) {
    val methName = "get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    pr.print("override fun " + methName + "() : ")
    pr.print("List<")
    pr.print(typeRefName)
    pr.println("> {")
    pr.println("val " + protectReservedWords(ref.getName + "Map") + " = mapGetter.get" + cls.getName + "_" + ref.getName + "Relation(getGenerated_KMF_ID())")
    pr.println("val " + protectReservedWords(ref.getName + "List") + " = java.util.ArrayList<"+typeRefName+">()")
    pr.println("for("+protectReservedWords(ref.getName)+" in "+protectReservedWords(ref.getName + "Map.keySet()")+"){")
    //TODO:Call the factory
    pr.println("//TODO:Call the factory")
    pr.println("}")
    pr.println("return " + protectReservedWords(ref.getName + "List"))
    pr.println("}")
  }

  private def generateSetter(ctx: GenerationContext, cls: EClass, ref: EReference, typeRefName: String, pr: PrintWriter) {
    val oppositRef = ref.getEOpposite
    if (oppositRef != null && !ref.isMany) {
      //Generates the NoOpposite_Set method only the local reference is a single ref. (opposite managed on the * side)
      generateSetterOp(ctx, cls, ref, typeRefName, true, pr)
    }
    generateSetterOp(ctx, cls, ref, typeRefName, false, pr)
  }

  private def generateSetterOp(ctx: GenerationContext, cls: EClass, ref: EReference, typeRefName: String, noOpposite: Boolean, pr: PrintWriter) {
    //generate setter
    val formatedLocalRefName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Internal"
    val refTypeImpl = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".persistency.mdb." + ref.getEReferenceType.getName + "Persistent"


    if (noOpposite) {
      pr.print("fun noOpposite_set" + formatedLocalRefName)
    } else {
      pr.print("override fun set" + formatedLocalRefName)
    }
    pr.print("(" + protectReservedWords(ref.getName) + " : ")
    pr.print("List<" + typeRefName + ">")
    pr.println(" ) {")
    //Read only protection
    pr.println("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}")
    if (ref.isMany) {
      pr.println("if(" + protectReservedWords(ref.getName) + " == null){ throw IllegalArgumentException(\"The list in parameter of the setter cannot be null. Use removeAll to empty a collection.\") }")
    }
    val oppositRef = ref.getEOpposite
    // -> Collection ref : * or +

    pr.println("val " + protectReservedWords(ref.getName) + "Map = mapGetter.get" + cls.getName + "_" + ref.getName + "Relation(getGenerated_KMF_ID())\n")
    pr.println(protectReservedWords(ref.getName) + "Map.clear()")
    pr.println("for(el in " + protectReservedWords(ref.getName) + "){")
    pr.println(protectReservedWords(ref.getName) + "Map.put((el as "+refTypeImpl+").getGenerated_KMF_ID(),el.path()!!)")
    pr.println("}")

    if (ref.isContainment) {
      if (oppositRef != null) {
        pr.println("for(elem in " + protectReservedWords(ref.getName) + "){")
        pr.println("(elem as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(getAPIClass().getName() + \"[\" + getGenerated_KMF_ID() + \"]\",{()->this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(elem)})")
        val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
        if (oppositRef.isMany) {
          pr.println("(elem as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)")
        }
        pr.println("}")
      } else {
        pr.println("for(elem in " + protectReservedWords(ref.getName) + "){(elem as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(getAPIClass().getName() + \"[\" + getGenerated_KMF_ID() + \"]\",{()->this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(elem)})}")
      }
    } else {
      if (oppositRef != null) {
        val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
        if (oppositRef.isMany) {
          pr.println("for(elem in " + protectReservedWords(ref.getName) + "){(elem as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)}")
        } else {
          val callParam = "this"
          pr.println("for(elem in " + protectReservedWords(ref.getName) + "){(elem as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(" + callParam + ")}")
        }
      }
    }
    pr.println("}") //END Method
  }


  //TODO: SHOULD NOT EXIST IN THE END
  private def generateMissingMethodsForCompilation(ctx: GenerationContext, cls: EClass, pr: PrintWriter) {
    pr.println("override fun setRecursiveReadOnly() {")
    pr.println("  throw UnsupportedOperationException()")
    pr.println("}")

    pr.println("override fun selectByQuery(query: String): List<Any> {")
    pr.println("  throw UnsupportedOperationException()")
    pr.println("}")
    pr.println("override fun <A> findByPath(query: String, clazz: Class<A>): A? {")
    pr.println(" throw UnsupportedOperationException()")
    pr.println(" }")
    pr.println(" override fun findByPath(query: String): Any? {")
    pr.println(" throw UnsupportedOperationException()")
    pr.println(" }")
    pr.println(" override fun path(): String? {")
    pr.println(" throw UnsupportedOperationException()")
    pr.println(" }")

  }

}

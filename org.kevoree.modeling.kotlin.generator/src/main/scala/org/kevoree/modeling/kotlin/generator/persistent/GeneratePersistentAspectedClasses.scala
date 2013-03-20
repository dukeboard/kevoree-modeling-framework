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
package org.kevoree.modeling.kotlin.generator.persistent

import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore._
import org.kevoree.modeling.kotlin.generator.model.KMFQLFinder
import org.kevoree.modeling.kotlin.generator.ProcessorHelper._
import org.kevoree.modeling.kotlin.generator.{ProcessorHelperClass, ProcessorHelper, GenerationContext}
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
class GeneratePersistentAspectedClasses(ctx: GenerationContext) extends KMFQLFinder {

  def hasID(cls: EClass): Boolean = {
    cls.getEAllAttributes.exists {
      att => att.isID
    }
  }

  def hasFindByIDMethod(cls: EClass): Boolean = {
    cls.getEReferences.exists(ref => {
      hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)
    })
  }

  def getIdAtt(cls: EClass) = {
    cls.getEAllAttributes.find {
      att => att.isID
    }
  }

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
    pr.println("trait " + formatedFactoryName + "Internal : "+ProcessorHelper.fqn(ctx, packElement) + "." + formatedFactoryName +"{")
    pr.println()
    pr.println("internal open var internal_eContainer : String?")
    pr.println("internal open var internal_unsetCmd : (()->Unit)?")

    //generate getter
    pr.println("override fun eContainer() : "+ProcessorHelper.fqn(ctx, packElement) + "." + formatedFactoryName+"?")
    pr.println("internal open var internal_containmentRefName : String?")
    pr.println("fun setContainmentRefName(name : String?)")


    //generate setter
    pr.print("\nfun setEContainer( container : String?, unsetCmd : (()->Unit)?)")

    pr.println("internal open var internal_readOnlyElem : Boolean")
    pr.println("override fun setInternalReadOnly(){")
    pr.println("internal_readOnlyElem = true")
    pr.println("}")

    pr.println("override fun isReadOnly() : Boolean {")
    pr.println("return internal_readOnlyElem")
    pr.println("}")

    pr.println("open fun getGenerated_KMF_ID() : String ")
    pr.println("open fun setGenerated_KMF_ID(id : String) ")

    pr.println("open fun getAPIClass() : java.lang.Class<out "+ctx.getKevoreeContainer.get+">")


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
    header += " * @developers: Gregory Nain, Francois Fouquet\n"
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
    pr.println("override fun getGenerated_KMF_ID() : String {")

    if (cls.getEAllAttributes.filter{att => !att.getName.equals("generated_KMF_ID")}.find(att => att.isID).isEmpty) {
      pr.println("if(_generated_KMF_ID == null){")
      pr.println("_generated_KMF_ID = java.util.UUID.randomUUID().toString()")
      pr.println("}")
    }
    pr.println("return _generated_KMF_ID!!")
    pr.println("}")
    pr.println("")
    pr.println("override fun setGenerated_KMF_ID(id : String) {")
    pr.println("_generated_KMF_ID = id")
    pr.println("}")
    pr.println("")

    var formatedFactoryName: String = ProcessorHelper.fqn(ctx, cls.getEPackage) + ".persistency.mdb.Persistent" + cls.getEPackage.getName.substring(0, 1).toUpperCase
    formatedFactoryName += cls.getEPackage.getName.substring(1)
    formatedFactoryName += "Factory"

    pr.println("fun equals(o : Any) : Boolean {")
    pr.println("if(_generated_KMF_ID == null || o !is "+ProcessorHelper.fqn(ctx, cls.getEPackage)+".persistency.mdb." + cls.getName +"Persistent){return false}")
    pr.println("if(!(mapGetter as "+formatedFactoryName+").basedir.equals((o as "+formatedFactoryName+").basedir)){return false}")
    pr.println("return _generated_KMF_ID.equals((o as " + ProcessorHelper.fqn(ctx, cls.getEPackage) + ".persistency.mdb." + cls.getName + "Persistent)._generated_KMF_ID)")
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
                ctx.clonerPackage = ProcessorHelper.fqn(ctx, pack) + ".cloner"
                ctx.setKevoreeContainer(Some(ProcessorHelper.fqn(ctx, pack) + "." + formatedFactoryName))
                ctx.setKevoreeContainerImplFQN(ProcessorHelper.fqn(ctx, pack) + ".persistency.mdb." + formatedFactoryName + "Internal")

                generateContainerTrait(ctx.getRootGenerationDirectory + File.separator + FQNPack.replace(".", File.separator), pack)

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

    val classList = model.getAllContents.filter{elem => elem.isInstanceOf[EClass]}
    classList.foreach{ elem =>
      var generatedKmfIdAttribute : EAttribute = null
      if(!hasID(elem.asInstanceOf[EClass])) {
        generatedKmfIdAttribute = EcoreFactory.eINSTANCE.createEAttribute()
        generatedKmfIdAttribute.setID(true)
        generatedKmfIdAttribute.setName("generated_KMF_ID")
        generatedKmfIdAttribute.setEType(EcorePackage.eINSTANCE.getEString)
        elem.asInstanceOf[EClass].getEStructuralFeatures.add(generatedKmfIdAttribute)
      }
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
            pr.println("override var internal_containmentRefName : String? = null")
            pr.println("override var internal_unsetCmd : (()->Unit)? = null")

            pr.println("private var entityDB : MutableMap<String,Any>? = null")

            var formatedFactoryName: String = ProcessorHelper.fqn(ctx, cls.getEPackage) + ".persistency.mdb.Persistent" + cls.getEPackage.getName.substring(0, 1).toUpperCase
            formatedFactoryName += cls.getEPackage.getName.substring(1)
            formatedFactoryName += "Factory"

            pr.println("override fun eContainer() : "+ctx.getKevoreeContainer.get+"? {")
            pr.println("if(internal_eContainer == null) {")
            pr.println("val eContainer = mapGetter.get" + eClass.getName + "Entity().get(getGenerated_KMF_ID() + \"_eContainer\")")
              pr.println("val containmentRefName = mapGetter.get" + eClass.getName + "Entity().get(getGenerated_KMF_ID() + \"_containmentRefName\")")
              pr.println("if(eContainer == null) {")
              pr.println("return null")
              pr.println("} else {")
              pr.println("internal_eContainer = eContainer as String")
              pr.println("internal_containmentRefName = containmentRefName as String")
              pr.println("}")
              pr.println("}")
              pr.println("val bracketIndex = internal_eContainer!!.indexOf(\"[\")")
            pr.println("return (mapGetter as "+formatedFactoryName+").createEntity(internal_eContainer!!.substring(0,bracketIndex), internal_eContainer!!.substring(bracketIndex+1, internal_eContainer!!.length-1)) as "+ctx.getKevoreeContainer.get)
            pr.println("}")
            pr.println("")
            pr.println("override fun setEContainer( container : String?, unsetCmd : (()->Unit)?) {")
            pr.println("if(internal_readOnlyElem){throw Exception(\"ReadOnly Element are not modifiable\")}")
            pr.println("if(internal_unsetCmd != null){")
            pr.println("internal_unsetCmd!!()")
            pr.println("}")
            pr.println("internal_eContainer = container\n")
            pr.println("if(container != null){")
            pr.println("mapGetter.get" + eClass.getName + "Entity().put(getGenerated_KMF_ID() + \"_eContainer\", container)")
            pr.println("} else {")
            pr.println("mapGetter.get" + eClass.getName + "Entity().remove(getGenerated_KMF_ID() + \"_eContainer\")")
            pr.println("}")
            pr.println("internal_unsetCmd = unsetCmd")
            pr.println("}")
            pr.println("")
            pr.println("override fun setContainmentRefName(name : String?){")
            //pr.println("println(\"setting containmentRef:\"+name+\" for instance \" + this.toString())")
            pr.println("if(name != null){")
            pr.println("mapGetter.get" + eClass.getName + "Entity().put(getGenerated_KMF_ID() + \"_containmentRefName\", name)")
            pr.println("} else {")
            pr.println("mapGetter.get" + eClass.getName + "Entity().remove(getGenerated_KMF_ID() + \"_containmentRefName\")")
            pr.println("}")
            pr.println("internal_containmentRefName = name")
            pr.println("}")
            pr.println("")
            pr.println("override fun getAPIClass() : java.lang.Class<"+ProcessorHelper.fqn(ctx,eClass)+"> { return javaClass<" + ProcessorHelper.fqn(ctx,eClass) + ">()}")
            pr.println("")

            pr.println("")
            pr.println("")

            //GENERATE CALL GET&SET
            cls.getEAllAttributes.filter{att => !att.getName.equals("generated_KMF_ID")}.foreach {
              att =>
              //Generate getter
                if (ProcessorHelper.convertType(att.getEAttributeType) == "Any" || att.getEAttributeType.isInstanceOf[EEnum]) {
                  pr.print("override fun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "() : " + ProcessorHelper.convertType(att.getEAttributeType) + "? {\n")
                } else {
                  pr.print("override fun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "() : " + ProcessorHelper.convertType(att.getEAttributeType) + " {\n")
                }
                //pr.println(" return getEntityMap().get(\"" + att.getName + "\") as " + ProcessorHelper.convertType(att.getEAttributeType) + "\n}")
                /*if(hasID(cls)) {
                  pr.println(" return mapGetter.get" + eClass.getName + "Entity().get(_generated_KMF_ID!! + \"_"+ProcessorHelper.protectReservedWords(att.getName)+"\") as " + ProcessorHelper.convertType(att.getEAttributeType) + "\n}")
                } else {
                */
                  pr.println(" return mapGetter.get" + eClass.getName + "Entity().get(getGenerated_KMF_ID() + \"_"+ProcessorHelper.protectReservedWords(att.getName)+"\") as " + ProcessorHelper.convertType(att.getEAttributeType) + "\n}")
                //}
                //generate setter
                pr.print("\n override fun set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1))
                pr.print("(" + protectReservedWords(att.getName) + " : " + ProcessorHelper.convertType(att.getEAttributeType) + ") {\n")
                pr.println("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}")
                if (att.isID) {
                  pr.println("_generated_KMF_ID = " + protectReservedWords(att.getName))
                }


                //if(hasID(cls)) {
                //  pr.println("mapGetter.get" + eClass.getName + "Entity().put(_generated_KMF_ID!! + \"_"+ProcessorHelper.protectReservedWords(att.getName)+"\","+ protectReservedWords(att.getName) + ")")
               // } else {
                  pr.println("mapGetter.get" + eClass.getName + "Entity().put(getGenerated_KMF_ID() + \"_"+ProcessorHelper.protectReservedWords(att.getName)+"\","+ protectReservedWords(att.getName) + ")")
                //}

                //pr.println("getEntityMap().put(\"" + att.getName + "\"," + protectReservedWords(att.getName) + ")")
                pr.println("}")
            }

            cls.getEAllReferences.foreach {
              ref =>
                val typeRefName = ProcessorHelper.fqn(ctx, ref.getEReferenceType)

                var formatedFactoryName: String = ProcessorHelper.fqn(ctx, cls.getEPackage) + ".persistency.mdb.Persistent" + cls.getEPackage.getName.substring(0, 1).toUpperCase
                formatedFactoryName += cls.getEPackage.getName.substring(1)
                formatedFactoryName += "Factory"

                ref.isMany match {
                  case false => {

                    //generate setter
                    /*pr.print("\n override fun set" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1))
                    pr.print("(" + protectReservedWords(ref.getName) + " : " + typeRefName + "?) {\n")
                    pr.println("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}")
                    val refTypeImpl = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".persistency.mdb." + ref.getEReferenceType.getName + "Persistent"
                    pr.println("if("+ protectReservedWords(ref.getName)+" != null){")
                    pr.println("getEntityMap().put(\"" + ref.getName + "\",(" + protectReservedWords(ref.getName) + " as "+ctx.getKevoreeContainerImplFQN+").getAPIClass().getName())")
                    pr.println("} else {")
                    pr.println("getEntityMap().remove(\""+ ref.getName +"\")")
                    pr.println("}")
                    pr.println("}")*/
                    generateSetter(ctx, cls, ref, typeRefName, pr)

                    //generate getter
                    pr.print("override fun get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "() : " + typeRefName + "? {\n")



                    //pr.println("getEntityMap().get(\"" + ref.getName +"\") as? String")
                    //if(hasID(cls)) {
                    //  pr.println("val ref = mapGetter.get" + eClass.getName + "Entity().get(_generated_KMF_ID!! + \"_"+ref.getName+"\") as? String")
                    //} else {
                      pr.println("val ref = mapGetter.get" + eClass.getName + "Entity().get(getGenerated_KMF_ID() + \"_"+ref.getName+"\") as? String")
                    //}


                    pr.println("if(ref != null) {")
                    pr.println(" return (mapGetter as "+formatedFactoryName+").create"+ref.getEReferenceType.getName.substring(0, 1).toUpperCase + ref.getEReferenceType.getName.substring(1)+"(ref)")// as " + typeRefName + "\n}")
                    pr.println("} else {")
                    pr.println("return null")
                    pr.println("}")
                    pr.println("}")
                  }
                  case true => {
                    generateGetter(cls, ref, typeRefName, pr)
                    generateSetter(ctx, cls, ref, typeRefName, pr)

                    //if(ref.isMany){
                    pr.println(generateAddMethod(cls, ref, typeRefName, ctx))
                    pr.println(generateRemoveMethod(cls, ref, typeRefName, true, ctx))

                    if(ref.getEReferenceType.getEIDAttribute.getName.equals("generated_KMF_ID")) {
                      pr.println("fun find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(key : String) : " + protectReservedWords(ProcessorHelper.fqn(ctx, ref.getEReferenceType)) + "? {")
                    } else {
                      pr.println("override fun find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(key : String) : " + protectReservedWords(ProcessorHelper.fqn(ctx, ref.getEReferenceType)) + "? {")
                    }
                    pr.println(" return (mapGetter as "+formatedFactoryName+").create"+ref.getEReferenceType.getName.substring(0, 1).toUpperCase + ref.getEReferenceType.getName.substring(1)+"(key)")
                    pr.println("}")


                    //}
                  }
                }

            }

            //OK methods

            generateKMF_IdMethods(cls, pr)
            generateFindByPathMethods(ctx, cls, pr)
            generatePathMethod(ctx, cls, pr)

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
            //pr.println("fun get" + eclass.getName + "Entity(id : String) : MutableMap<String,Any>")
            pr.println("fun get" + eclass.getName + "Entity() : MutableMap<String,Any>")
            eclass.getEAllReferences.foreach {
              eRef =>
                pr.println("fun get" + eclass.getName + "_" + eRef.getName + "Relation() : java.util.NavigableSet<org.mapdb.Fun.Tuple3<Any, Any, Any>>")
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

    var getterMapName: String = packElement.getName.substring(0, 1).toUpperCase
    getterMapName += packElement.getName.substring(1)
    getterMapName += "MapGetter"


    val packPath = ctx.getRootGenerationDirectory + File.separator + (ProcessorHelper.fqn(ctx, packElement) +".persistency.mdb").replace(".", File.separator)
    ProcessorHelper.checkOrCreateFolder(packPath)

    val localFile = new File(packPath + File.separator + "Persistent"+ formatedFactoryName + ".kt")
    val pr = new PrintWriter(localFile, "utf-8")




    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName)
    ve.init()
    val template = ve.getTemplate("templates/PersistentFactory.vm")
    val ctxV = new VelocityContext()
    ctxV.put("formatedFactoryName",formatedFactoryName)
    ctxV.put("getterMapName",getterMapName)
    ctxV.put("packElem",ProcessorHelper.fqn(ctx, packElement))
    ctxV.put("ePackage",packElement)
    ctxV.put("modelVersion",modelVersion)
    ctxV.put("ProcessorHelper", new ProcessorHelperClass)
    ctxV.put("FQNPackBaseImpl",ProcessorHelper.fqn(ctx, packElement) +".persistency.mdb")
    ctxV.put("ctx",ctx)
    template.merge(ctxV,pr)

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
    res += "val "+protectReservedWords(ref.getName)+"Map = mapGetter.get" + cls.getName + "_" + ref.getName + "Relation()\n"
    res += protectReservedWords(ref.getName) + "Map.remove(org.mapdb.Fun.t3(getGenerated_KMF_ID(), (" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").getGenerated_KMF_ID(), (" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").getAPIClass().getName())!!)\n"

    if (ref.isContainment) {
      //TODO
      res += "(" + protectReservedWords(ref.getName) + "!! as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null,null)\n"
      res += "(" + protectReservedWords(ref.getName) + "!! as " + ctx.getKevoreeContainerImplFQN + ").setContainmentRefName(null)\n"
    }

    val oppositRef = ref.getEOpposite
    if (!noOpposite && oppositRef != null) {
      val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
      val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".persistency.mdb." + ref.getEReferenceType.getName + "Persistent"
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
    res += "val "+protectReservedWords(ref.getName)+"Set = mapGetter.get" + cls.getName + "_" + ref.getName + "Relation()\n"
    res += "val old"+protectReservedWords(ref.getName)+" = java.util.HashSet<org.mapdb.Fun.Tuple3<Any, Any, Any>>()\n"
    if ((!noOpposite && ref.getEOpposite != null) || ref.isContainment) {
      val getterCall = "get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "()"
      if (hasID(ref.getEReferenceType)) {
        res += "for(el in " + getterCall + "!!){\n"
      } else {
        res += "val temp_els = java.util.Collections.unmodifiableList(" + getterCall + ")\n"
        res += "for(el in temp_els){\n"
      }
      if (ref.isContainment) {
        res += "(el as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null,null)\n"
        res += "(el as " + ctx.getKevoreeContainerImplFQN + ").setContainmentRefName(null)\n"
      }
      val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".persistency.mdb." + ref.getEReferenceType.getName + "Persistent"
      // res += protectReservedWords(ref.getName)+"Map.remove(getGenerated_KMF_ID() + \"_\" + (el as "+refInternalClassFqn+").getGenerated_KMF_ID())\n"
      res += "old" + protectReservedWords(ref.getName) + ".add(org.mapdb.Fun.t3(getGenerated_KMF_ID(), (el as " + ctx.getKevoreeContainerImplFQN + ").getGenerated_KMF_ID(), (el as " + ctx.getKevoreeContainerImplFQN + ").getAPIClass().getName())!!)\n"
      if (ref.getEOpposite != null && !noOpposite) {
        val opposite = ref.getEOpposite
        val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)
        if (!opposite.isMany) {
          res += "(el as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(null)\n"
        } else {
          res += "(el as " + refInternalClassFqn + ").noOpposite_remove" + formatedOpositName + "(this)\n"
        }
      }
      res += "}\n"
    }
    res += protectReservedWords(ref.getName)+"Set.removeAll(old" + protectReservedWords(ref.getName) + ")\n"
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

    res += "val " + protectReservedWords(ref.getName) + "Set = mapGetter.get" + cls.getName + "_" + ref.getName + "Relation()\n"
    res += "val " + protectReservedWords(ref.getName) + "SubSet = " + protectReservedWords(ref.getName) + "Set.subSet(org.mapdb.Fun.t3(getGenerated_KMF_ID(), null, null)!!, org.mapdb.Fun.t3(getGenerated_KMF_ID(), org.mapdb.Fun.HI, org.mapdb.Fun.HI)!!)\n"
    res += "val new" + protectReservedWords(ref.getName) + " = java.util.HashSet<org.mapdb.Fun.Tuple3<Any, Any, Any>>()\n"
    res += "for(el in " + protectReservedWords(ref.getName) + "){\n"
    res += "val " + protectReservedWords(ref.getName) + "SubSubSet = " + protectReservedWords(ref.getName) + "SubSet.subSet(org.mapdb.Fun.t3(getGenerated_KMF_ID(), (" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").getGenerated_KMF_ID(), null)!!, org.mapdb.Fun.t3(getGenerated_KMF_ID(), (" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").getGenerated_KMF_ID(), org.mapdb.Fun.HI)!!)\n"
    res += "if(" + protectReservedWords(ref.getName) + "SubSubSet.size == 0) {\n"
    res += "new" + protectReservedWords(ref.getName) + ".add(org.mapdb.Fun.t3(getGenerated_KMF_ID(), (" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").getGenerated_KMF_ID(), (" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").getAPIClass().getName())!!)\n"

    if (ref.getEOpposite != null && !noOpposite) {
      val opposite = ref.getEOpposite
      val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)

      val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".persistency.mdb." + ref.getEReferenceType.getName + "Persistent"

      if (!opposite.isMany) {
        res += "(" + protectReservedWords(ref.getName) + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)\n"
      } else {
        res += "(" + protectReservedWords(ref.getName) + " as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)\n"
      }
    }

    res += "}\n"
    res += "}\n"
    res +=  protectReservedWords(ref.getName) + "Set.addAll(new" + protectReservedWords(ref.getName) + ")"


    res += "}\n"
    res
  }

  private def generateAddMethodOp(cls: EClass, ref: EReference, typeRefName: String, noOpposite: Boolean, ctx: GenerationContext): String = {
    //generate add
    var res = ""
    val formatedAddMethodName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)

    if (noOpposite) {
      res += "\nfun noOpposite_add" + formatedAddMethodName
    } else {
      res += "\noverride fun add" + formatedAddMethodName
    }
    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ") {\n"
    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")

    if (ref.isContainment) {
      res += "(" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(getAPIClass().getName() + \"[\" + getGenerated_KMF_ID() + \"]\",{()->this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + protectReservedWords(ref.getName) + ")})\n"
      res += "(" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").setContainmentRefName(\""+protectReservedWords(ref.getName)+"\")\n"
    }

    res += "val " + protectReservedWords(ref.getName) + "Set = mapGetter.get" + cls.getName + "_" + ref.getName + "Relation()\n"

    res += "val " + protectReservedWords(ref.getName) + "SubSet = " + protectReservedWords(ref.getName) + "Set.subSet(org.mapdb.Fun.t3(getGenerated_KMF_ID(), (" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").getGenerated_KMF_ID(), null)!!, org.mapdb.Fun.t3(getGenerated_KMF_ID(), (" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").getGenerated_KMF_ID(), org.mapdb.Fun.HI)!!)\n"
    res += "if(" + protectReservedWords(ref.getName) + "SubSet.size == 0) {\n"
    res +=  protectReservedWords(ref.getName) + "Set.add(org.mapdb.Fun.t3(getGenerated_KMF_ID(), (" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").getGenerated_KMF_ID(), (" + protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + ").getAPIClass().getName())!!)\n"

    if (ref.getEOpposite != null && !noOpposite) {
      val opposite = ref.getEOpposite
      val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)

      val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".persistency.mdb." + ref.getEReferenceType.getName + "Persistent"

      if (!opposite.isMany) {
        res += "(" + protectReservedWords(ref.getName) + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)\n"
      } else {
        res += "(" + protectReservedWords(ref.getName) + " as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)\n"
      }
    }
    res += "}\n" //ENFIF
    res += "}" // END METHOD
    res
  }

  private def generateGetter(cls: EClass, ref: EReference, typeRefName: String, pr: PrintWriter) {
    val methName = "get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    pr.print("override fun " + methName + "() : ")
    pr.print("List<")
    pr.print(typeRefName)
    pr.println("> {")

    /*
    val outgoingTransitionMap = mapGetter.getState_outgoingTransitionRelation()
        val transitions = outgoingTransitionMap.getOrElse(getGenerated_KMF_ID(),{""}).split(";")
        val outgoingTransitionList = java.util.ArrayList<org.fsmSample.Transition>()
        for(outgoingTransition in transitions){
            val tType = outgoingTransitionMap.get(getGenerated_KMF_ID() + "_" + outgoingTransition)!!
            outgoingTransitionList.add((mapGetter as org.fsmSample.persistency.mdb.PersistentFsmSampleFactory).createEntity(tType,outgoingTransition) as org.fsmSample.Transition)
        }
     */


    pr.println("val " + protectReservedWords(ref.getName + "Set") + " = mapGetter.get" + cls.getName + "_" + ref.getName + "Relation()")
    pr.println("val my" + protectReservedWords(ref.getName ) + " = " + protectReservedWords(ref.getName + "Set") + ".subSet(org.mapdb.Fun.t3(getGenerated_KMF_ID(), null, null)!!, org.mapdb.Fun.t3(getGenerated_KMF_ID(), org.mapdb.Fun.HI, org.mapdb.Fun.HI)!!)")
    pr.println("val " + protectReservedWords(ref.getName + "List") + " = java.util.ArrayList<"+typeRefName+">()")
    pr.println("for("+protectReservedWords(ref.getName)+" in my"+protectReservedWords(ref.getName)+"){")
    var formatedFactoryName: String = ProcessorHelper.fqn(ctx, cls.getEPackage) + ".persistency.mdb.Persistent" + cls.getEPackage.getName.substring(0, 1).toUpperCase
    formatedFactoryName += cls.getEPackage.getName.substring(1)
    formatedFactoryName += "Factory"
    pr.println(protectReservedWords(ref.getName + "List") + ".add((mapGetter as "+formatedFactoryName+").createEntity(" + protectReservedWords(ref.getName) + ".c," + protectReservedWords(ref.getName) + ".b) as "+typeRefName+")")
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
    val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".persistency.mdb." + ref.getEReferenceType.getName + "Persistent"


    if (noOpposite) {
      pr.print("fun noOpposite_set" + formatedLocalRefName)
    } else {
      pr.print("override fun set" + formatedLocalRefName)
    }
    pr.print("(" + protectReservedWords(ref.getName) + " : ")

    if(ref.isMany) {
      pr.print("List<" + typeRefName + ">")
    } else {
      pr.print(typeRefName + "?")
    }

    pr.println(" ) {")
    //Read only protection
    pr.println("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}")
    if (ref.isMany) {
      pr.println("if(" + protectReservedWords(ref.getName) + " == null){ throw IllegalArgumentException(\"The list in parameter of the setter cannot be null. Use removeAll to empty a collection.\") }")
    }
    val oppositRef = ref.getEOpposite
    // -> Collection ref : * or +
    if(ref.isMany) {
      pr.println("val " + protectReservedWords(ref.getName) + "Set = mapGetter.get" + cls.getName + "_" + ref.getName + "Relation()\n")
      //pr.println(protectReservedWords(ref.getName) + "Map.clear()")
      //pr.println("removeAll" + formatedLocalRefName + "()")
      pr.println(protectReservedWords(ref.getName) + "Set.removeAll(" + protectReservedWords(ref.getName) + "Set.subSet(org.mapdb.Fun.t3(getGenerated_KMF_ID(), null, null)!!, org.mapdb.Fun.t3(getGenerated_KMF_ID(), org.mapdb.Fun.HI, org.mapdb.Fun.HI)!!))")
      pr.println("val new" + protectReservedWords(ref.getName) + " = java.util.HashSet<org.mapdb.Fun.Tuple3<Any, Any, Any>>()")
      pr.println("for(el in " + protectReservedWords(ref.getName) + "){")
      pr.println("new" + protectReservedWords(ref.getName) + ".add(org.mapdb.Fun.t3(getGenerated_KMF_ID(),(el as "+ctx.getKevoreeContainerImplFQN+").getGenerated_KMF_ID(), (el as "+ctx.getKevoreeContainerImplFQN+").getAPIClass().getName())!!)")
      //pr.println(protectReservedWords(ref.getName) + "Map.put(getGenerated_KMF_ID() + \"_\" + (el as "+ctx.getKevoreeContainerImplFQN+").getGenerated_KMF_ID(), (el as "+ctx.getKevoreeContainerImplFQN+").getAPIClass().getName())")
      if (!noOpposite && oppositRef != null) {
        val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
        if (oppositRef.isMany) {
          pr.println("(el as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)")
        } else {
          pr.println("(el as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)")
        }
      }
      if(ref.isContainment) {
        pr.println("(el as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(getAPIClass().getName() + \"[\" + getGenerated_KMF_ID() + \"]\",{()->this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(el)})")
        pr.println("(el as " + ctx.getKevoreeContainerImplFQN + ").setContainmentRefName(\""+protectReservedWords(ref.getName)+"\")")
      }
      pr.println("}")
      //pr.println(protectReservedWords(ref.getName) + "Map.put(getGenerated_KMF_ID(),"+protectReservedWords(ref.getName)+".map{e -> (e as "+ctx.getKevoreeContainerImplFQN+").getGenerated_KMF_ID()}.makeString(\";\"))")
      pr.println(protectReservedWords(ref.getName) + "Set.addAll(new"+protectReservedWords(ref.getName)+")")
    } else {
      pr.println("if("+ protectReservedWords(ref.getName)+" != null){")

      //pr.println("getEntityMap().put(\"" + ref.getName + "\",(" + protectReservedWords(ref.getName) + " as "+ctx.getKevoreeContainerImplFQN+").getGenerated_KMF_ID())")
      //if(hasID(cls)) {
      //  pr.println("mapGetter.get" + cls.getName + "Entity().put(_generated_KMF_ID!! + \"_"+ref.getName+"\",(" + protectReservedWords(ref.getName) + " as "+ctx.getKevoreeContainerImplFQN+").getGenerated_KMF_ID())")
      //} else {
        pr.println("mapGetter.get" + cls.getName + "Entity().put(getGenerated_KMF_ID() + \"_"+ref.getName+"\",(" + protectReservedWords(ref.getName) + " as "+ctx.getKevoreeContainerImplFQN+").getGenerated_KMF_ID())")
      //}

      if (!noOpposite && oppositRef != null) {
        val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
        if (oppositRef.isMany) {
          pr.println("("+protectReservedWords(ref.getName)+" as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)")
        } else {
          pr.println("("+protectReservedWords(ref.getName)+" as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)")
        }
      }
      if(ref.isContainment) {
        pr.println("("+protectReservedWords(ref.getName)+" as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(getAPIClass().getName() + \"[\" + getGenerated_KMF_ID() + \"]\",{()->this.set" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(null)})")
        pr.println("("+protectReservedWords(ref.getName)+" as " + ctx.getKevoreeContainerImplFQN + ").setContainmentRefName(\""+protectReservedWords(ref.getName)+"\")")
      }
      pr.println("} else {")
      if (!noOpposite && oppositRef != null) {
        val getMethName = "get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
        val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
        if (oppositRef.isMany) {
          pr.println("("+getMethName+"() as " + refInternalClassFqn + ").noOpposite_remove" + formatedOpositName + "(this)")
        } else {
          pr.println("("+getMethName+"() as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(null)")
        }
      }

      // pr.println("getEntityMap().remove(\""+ ref.getName +"\")")
     // if(hasID(cls)) {
     //   pr.println("mapGetter.get" + cls.getName + "Entity().remove(_generated_KMF_ID!! + \"_"+ref.getName+"\")")
      //} else {
        pr.println("mapGetter.get" + cls.getName + "Entity().remove(getGenerated_KMF_ID() + \"_"+ref.getName+"\")")
      //}


      pr.println("}")
    }

    pr.println("}") //END Method
  }


  private def generatePathMethod(ctx:GenerationContext, cls : EClass, pr : PrintWriter) {
    pr.println(" override fun path(): String? {")
    pr.println("val container = eContainer()")
    pr.println("if(container != null) {")
    pr.println("val parentPath = container!!.path()")
      pr.println("return  if(parentPath == null){\"\"}else{parentPath + \"/\"} + internal_containmentRefName + \"[\"+getGenerated_KMF_ID()+\"]\"")
    //pr.println("return container!!.path() + \"/\" + internal_containmentRefName + \"[\"+getGenerated_KMF_ID()+\"]\"")
    pr.println("} else {")
    pr.println("return null")
    pr.println("}")
    pr.println("}")
  }




  //TODO: SHOULD NOT EXIST IN THE END
  private def generateMissingMethodsForCompilation(ctx: GenerationContext, cls: EClass, pr: PrintWriter) {
    pr.println("override fun setRecursiveReadOnly() {")
    pr.println("  throw UnsupportedOperationException()")
    pr.println("}")
    pr.println("override fun isRecursiveReadOnly() : Boolean{")
    pr.println("  throw UnsupportedOperationException()")
    pr.println("}")
    pr.println("fun selectByQuery(query: String): List<Any> {")
    pr.println("  throw UnsupportedOperationException()")
    pr.println("}")
    pr.println("override fun getClonelazy(subResult : java.util.IdentityHashMap<Any,Any>, _factories : "+ctx.clonerPackage+".ClonerFactories, mutableOnly: Boolean) {")
    pr.println(" throw UnsupportedOperationException()")
    pr.println(" }")
    pr.println("override fun resolve(addrs : java.util.IdentityHashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any  {")
    pr.println(" throw UnsupportedOperationException()")
    pr.println(" }")


  }




}

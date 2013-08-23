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

import java.io.File
import java.text.SimpleDateFormat
import java.util.Date
import org.eclipse.emf.ecore.resource.ResourceSet
import scala.collection.JavaConversions._
import collection.mutable.Buffer
import org.eclipse.emf.ecore._


/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 22/09/11
 * Time: 09:49
 */

class ProcessorHelperClass {

  def getLastName(name: String): String = {
    return name.substring(name.lastIndexOf(".") + 1)
  }


  def getEClassInEPackage(ePackage: EPackage): java.util.List[EClass] = {
    val list = ePackage.getEClassifiers.filter {
      cls => cls.isInstanceOf[EClass]
    }.map {
      cls => cls.asInstanceOf[EClass]
    }
    list
  }


  def checkOrCreateFolder(path: String) {
    val file = new File(path)
    if (!file.exists) file.mkdirs
  }


  def convertType(aType: EDataType, ctx : GenerationContext): String = {
    aType match {
      case theType: EEnum => ProcessorHelper.fqn(ctx,theType.getEPackage)+"."+theType.getName
      case _@theType => convertType(theType.getInstanceClassName)
    }
  }

  def convertJType(aType: EDataType, ctx : GenerationContext): String = {
    aType match {
      case theType: EEnum => ProcessorHelper.fqn(ctx,theType.getEPackage)+"."+theType.getName
      case _@theType => convertJType(theType.getInstanceClassName)
    }
  }

  def convertJType(theType: String): String = {
    theType match {
      case "EBooleanObject" | "EBoolean" | "bool" | "boolean" | "java.lang.Boolean" | "Boolean" => "boolean"
      case "EString" | "java.lang.String" | "String" => "String"
      case "EIntegerObject" | "int" | "java.lang.Integer" | "Integer" | "EInt" => "int"
      case "float" | "java.lang.Float" => "float"
      case "double" | "java.lang.Double" | "EDouble" | "EDoubleObject" => "double"
      case "long" | "java.lang.Long" => "long"
      case "java.lang.Object" | "EResource" | "EJavaObject" => "Object"
      case "char" | "Char" => "char"
      case "java.lang.Class" | "EJavaClass"=> "java.lang.Class"
      case "org.eclipse.emf.common.util.Enumerator" => "Object"
      case "ETreeIterator" => "java.util.Iterator"
      case "EEList" => "java.util.List"
      case _ => theType
      //case _ => System.err.println("ProcessorHelper::convertType::No matching found for type: " + theType + " replaced by 'Any'"); "Any"
    }
  }


  def convertType(theType: String): String = {
    theType match {
      case "EBooleanObject" | "EBoolean" | "bool" | "boolean" | "java.lang.Boolean" | "Boolean" => "Boolean"
      case "EString" | "java.lang.String" | "String" => "String"
      case "EIntegerObject" | "int" | "java.lang.Integer" | "Integer" | "EInt" => "Int"
      case "float" | "java.lang.Float" => "Float"
      case "double" | "java.lang.Double" | "EDouble" | "EDoubleObject" => "Double"
      case "long" | "java.lang.Long" => "Long"
      case "java.lang.Object" | "EResource" | "EJavaObject" => "Any"
      case "java.util.Date" => "java.util.Date"
      case "ETreeIterator" => "MutableIterator<*>"
      case "org.eclipse.emf.common.util.Enumerator" => "Any"
      case "EEList" => "List<Any?>"
      //case "org.eclipse.emf.common.util.EList" => "java.util.List<Object>"
      case "byte[]" => "Array<Byte>"
      case "char" | "Char" => "Char"
      case "java.math.BigInteger" => "java.math.BigInteger"
      case "java.lang.Class" | "EJavaClass" => "Class<out jet.Any?>"
      case _ => /*System.err.println("ProcessorHelper::convertType::No matching found for type: " + theType + " replaced by 'Any'");*/ "Any"
    }
  }

  def protectReservedWords(word: String): String = {
    word match {
      case "type" => "`type`"
      case "object" => "`object`"
      case "requires" => "`requires`"
      case "interfaces" => "`interfaces`"
      case "package" => "`package`"
      case _ => word //throw new UnsupportedOperationException("ProcessorHelper::protectReservedWords::No matching found for word: " + word);null
    }
  }

  def protectReservedJWords(word: String): String = {
    word match {
      case "long" => "_long_"
      case "int" => "_int_"
      case "float" => "_float_"
      case "double" => "_double_"
      case "short" => "_short_"
      case "char" => "_char_"
      case "boolean" => "_boolean_"
      case "byte" => "_byte_"
      case "type" => "_type_"
      case "object" => "_object_"
      case "requires" => "_requires_"
      case "transient" => "_transient_"
      case "package" => "_package_"
      case "default" => "_default_"
      case "interface" => "_interface_"
      case "enumeration" => "_enumeration_"
      case "volatile" => "_volatile_"
      case "abstract" => "_abstract_"
      case "enum" => "_enum_"
      case "class" => "_class_"
      case _ => word //throw new UnsupportedOperationException("ProcessorHelper::protectReservedWords::No matching found for word: " + word);null
    }
  }

  def generateHeader(packElement: EPackage): String = {
    var header = "";
    val formateur = new SimpleDateFormat("'Date:' dd MMM yy 'Time:' HH:mm")
    header += "/**\n"
    header += " * Created by Kevoree Model Generator(KMF).\n"
    header += " * @developers: Gregory Nain, Fouquet Francois\n"
    header += " * " + formateur.format(new Date) + "\n"
    header += " * Meta-Model:NS_URI=" + packElement.getNsURI + "\n"
    header += " */"
    header
  }


  def generateSuperTypes(ctx: GenerationContext, cls: EClass, packElement: EPackage): Option[String] = {
    var superTypeList: Option[String] = None
    superTypeList = Some(" : " + ctx.getKevoreeContainer.get)
    // superTypeList = Some(superTypeList.get + "with " + packElement.getName.substring(0, 1).toUpperCase + packElement.getName.substring(1) + "Mutable")
    cls.getESuperTypes.foreach {
      superType => superTypeList = Some(superTypeList.get + " , " + fqn(ctx, superType))
    }
    superTypeList
  }

  def generateSuperTypesPlusSuperAPI(ctx: GenerationContext, cls: EClass, packElement: EPackage): Option[String] = {
    var superTypeList: Option[String] = None
    superTypeList = Some(" : " + ctx.getKevoreeContainerImplFQN + ", " + fqn(ctx, packElement) + "." + cls.getName)
    cls.getESuperTypes.foreach {
      superType =>
        val superName = fqn(ctx, superType.getEPackage) + ".impl." + superType.getName + "Internal"
        superTypeList = Some(superTypeList.get + " , " + superName)
    }
    superTypeList
  }


  def getAllConcreteSubTypes(iface: EClass): java.util.List[EClass] = {
    var res = new java.util.LinkedList[EClass]()
    iface.getEPackage.getEClassifiers.filter(cl => cl.isInstanceOf[EClass]).foreach {
      cls =>
        if (!cls.asInstanceOf[EClass].isInterface
          && !cls.asInstanceOf[EClass].isAbstract
          && cls.asInstanceOf[EClass].getEAllSuperTypes.contains(iface)) {

          if (!res.exists(previousC => cls.asInstanceOf[EClass].getEAllSuperTypes.contains(previousC))) {
            res.addFirst(cls.asInstanceOf[EClass])
          } else {
            res.addLast(cls.asInstanceOf[EClass])
          }
        }
    }
    res
  }

  def getDirectConcreteSubTypes(iface: EClass): List[EClass] = {
    var res = List[EClass]()
    iface.getEPackage.getEClassifiers.filter(cl => cl.isInstanceOf[EClass]).foreach {
      cls =>
        if (!cls.asInstanceOf[EClass].isInterface
          && !cls.asInstanceOf[EClass].isAbstract
          && cls.asInstanceOf[EClass].getEAllSuperTypes.contains(iface)) {

          //adds an element only if the collection does not already contain one of its supertypes
          if (!res.exists(previousC => cls.asInstanceOf[EClass].getEAllSuperTypes.contains(previousC))) {
            //remove potential subtypes already inserted in the collection
            res = res.filterNot {
              c => c.asInstanceOf[EClass].getEAllSuperTypes.contains(cls)
            }
            res = res ++ List(cls.asInstanceOf[EClass])
          }
        }
    }
    res
  }

  /**
   * Returns the absolute path of the folder in which to generate classes of a package.
   * @param ctx The generation context
   * @param pack the package to be generated
   * @return The absolute path of the folder where to generate the content of the package.
   */
  def getPackageGenDir(ctx: GenerationContext, pack: EPackage): String = {
    var modelGenBaseDir = ctx.getRootGenerationDirectory.getAbsolutePath + "/"
    ctx.getPackagePrefix.map(prefix => modelGenBaseDir += prefix.replace(".", "/") + "/")
    modelGenBaseDir += fqn(pack).replace(".", "/") + "/"
    modelGenBaseDir
  }

  /**
   * Returns the absolute path of the folder containing implementations made by users for the given package.
   * @param ctx The generation context
   * @param pack the package required
   * @return The absolute path of the folder where to find any implementation made by developers.
   */
  def getPackageUserDir(ctx: GenerationContext, pack: EPackage): String = {
    if (ctx.getRootUserDirectory != null) {
      var modelGenBaseDir = ctx.getRootUserDirectory.getAbsolutePath + "/"
      ctx.getPackagePrefix.map(prefix => modelGenBaseDir += prefix.replace(".", "/") + "/")
      modelGenBaseDir += fqn(pack).replace(".", "/") + "/"
      modelGenBaseDir
    } else {
      ""
    }
  }


  /**
   * Computes the Fully Qualified Name of the package in the context of the model.
   * @param pack the package which FQN has to be computed
   * @return the Fully Qualified package name
   */
  def fqn(pack: EPackage): String = {

    if (pack == null) {
      throw new Exception("Null Package , stop generation")
    }

    var locFqn = protectReservedWords(pack.getName.toLowerCase)
    var parentPackage = pack.getESuperPackage
    while (parentPackage != null) {
      locFqn = parentPackage.getName + "." + locFqn
      parentPackage = parentPackage.getESuperPackage
    }
    locFqn
  }

  /**
   * Computes the Fully Qualified Name of the package in the context of the generation (i.e. including the package prefix if any).
   * @param ctx the generation context
   * @param pack the package which FQN has to be computed
   * @return the Fully Qualified package name
   */
  def fqn(ctx: GenerationContext, pack: EPackage): String = {

    if (pack == null) {
      if (ctx.getPackagePrefix.isDefined) {
        return ctx.getPackagePrefix.get
      } else {
        return ""
      }
    }

    ctx.getPackagePrefix match {
      case Some(prefix) => {
        if ("".equals(pack.getName)) {
          prefix
        } else {
          if (prefix.endsWith(".")) {
            prefix + fqn(pack)
          } else {
            prefix + "." + fqn(pack)
          }
        }
      }
      case None => fqn(pack)
    }
  }

  /**
   * Computes the Fully Qualified Name of the class in the context of the model.
   * @param cls the class which FQN has to be computed
   * @return the Fully Qualified Class name
   */
  def fqn(cls: EClassifier): String = {
    fqn(cls.getEPackage) + "." + cls.getName
  }

  /**
   * Computes the Fully Qualified Name of the class in the context of the generation (i.e. including the package prefix if any).
   * @param ctx the generation context
   * @param cls the class which FQN has to be computed
   * @return the Fully Qualified Class name
   */
  def fqn(ctx: GenerationContext, cls: EClassifier): String = {
    if (cls.getEPackage != null) {
      fqn(ctx, cls.getEPackage) + "." + cls.getName
    } else {
      if (ctx.getPackagePrefix.isEmpty) {
        cls.getName
      } else {
        ctx.getPackagePrefix.get + "." + cls.getName
      }
    }
  }


  private def lookForRootElementByName(rootXmiPackage: EPackage, rootContainerClassName: String): Option[EClass] = {
    var possibleRoot: Option[EClass] = None
    //Search in the current package
    if (rootXmiPackage.getEClassifiers.forall(classifier => {
      classifier match {
        case cls: EClass => {
          if (cls.getName.equals(rootContainerClassName)) {
            possibleRoot = Some(cls)
            false
          } else {
            true
          }
        }
        case _ => true
      }
    })) {
      // not found, looking into sub-packages
      rootXmiPackage.getESubpackages.forall(subpackage => {
        possibleRoot = lookForRootElementByName(subpackage, rootContainerClassName)
        possibleRoot match {
          case Some(cls) => false
          case None => true
        }
      })
    }
    possibleRoot
  }

  def lookForRootElement(rootXmiPackage: EPackage, rootContainerClassName: Option[String] = None): Option[EClass] = {

    var referencedElements: List[String] = List[String]()
    var possibleRoot: Option[EClass] = None

    rootContainerClassName match {
      case Some(className) => {
        possibleRoot = lookForRootElementByName(rootXmiPackage, className)
      }
      case None => {
        rootXmiPackage.getEClassifiers.foreach {
          classifier => classifier match {
            case cls: EClass => {
              //System.out.println("Class::" + cls.getName)
              cls.getEAllContainments.foreach {
                reference =>
                  if (!referencedElements.contains(reference.getEReferenceType.getName)) {
                    referencedElements = referencedElements ++ List(reference.getEReferenceType.getName)
                    reference.getEReferenceType.getEAllSuperTypes.foreach {
                      st =>
                        if (!referencedElements.contains(st.getName)) {
                          referencedElements = referencedElements ++ List(st.getName)
                        }
                    }
                  }
                //System.out.println("\t\tReference::[name:" + reference.getName + ", type:" + reference.getEReferenceType.getName + ", isContainement:" + reference.isContainment + ", isContainer:" + reference.isContainer + "]")
              }
            }
            //case cls: EDataType => // Ignore
            case _@e => //Ignore throw new UnsupportedOperationException(e.getClass.getName + " did not match anything while looking for containerRoot element.")
          }
        }

        //System.out.println("References:" + referencedElements.mkString(","))

        rootXmiPackage.getEClassifiers.filter {
          classif =>
            classif match {
              case cls: EClass => {

                if (cls.getEAllContainments.size() == 0) {
                  false
                } else if (referencedElements.contains(cls.getName)) {
                  false
                } else {
                  // System.out.println(cls.getEAllSuperTypes.mkString(cls.getName +" supertypes [\n\t\t",",\n\t\t","]"))
                  cls.getEAllSuperTypes.find {
                    st =>
                      val mat = referencedElements.contains(st.getName)
                      // System.out.println(st.getName + " Match:: " + mat)
                      mat
                  } match {
                    case Some(s) => false
                    case None => true
                  }
                }
              }
              case _ => false
            }
        } match {
          case b: Buffer[EClassifier] => {
            if (b.size != 1) {
              b.foreach(classifier => System.out.println("Possible containerRoot:" + classifier.getName))
            } else {
              System.out.println("RootElement:" + b.get(0).getName)
              possibleRoot = Some(b.get(0).asInstanceOf[EClass])
            }
          }
          case _@e => System.out.println("Root element not found. Returned:" + e.getClass); null
        }
      }
    }
    possibleRoot
  }


  def collectAllClassifiersInModel(model: ResourceSet): java.util.ArrayList[EClassifier] = {
    val allClassifiers: java.util.ArrayList[EClassifier] = new java.util.ArrayList[EClassifier]
    for (content <- model.getAllContents) {
      content match {
        case cls: EClass => {
          allClassifiers.add(cls)
        }
        case enm: EEnum => {
          allClassifiers.add(enm)
        }
        case pack: EPackage => {
          allClassifiers.addAll(collectAllClassifiersInPackage(pack))
        }
        case _@e => {
          //println("Got an element of type " + e.getClass + " while looking for PossibleElementAtRoot. Don't know what to do with that.")
        }
      }
    }
    allClassifiers
  }


  def collectAllClassifiersInPackage(pack: EPackage): java.util.ArrayList[EClassifier] = {
    val allClassifiers: java.util.ArrayList[EClassifier] = new java.util.ArrayList[EClassifier]
    for (classifier <- pack.getEClassifiers) {
      if (!classifier.isInstanceOf[EDataType] || classifier.isInstanceOf[EEnum]) {
        allClassifiers.add(classifier)
      }
    }
    for (subPackage <- pack.getESubpackages) {
      allClassifiers.addAll(collectAllClassifiersInPackage(subPackage))
    }
    allClassifiers
  }

  /**
   * Separates contained classifiers from not contained classifiers; from a collection of classifiers.
   * @param allClassifiers The classifier collection to sort
   * @return a 2-tuple with _1 > ContainedClassifiers and _2 > NotContainedClassifiers
   */
  def getPartClassifiersByContainement(allClassifiers: java.util.ArrayList[EClassifier]): (java.util.ArrayList[EClassifier], java.util.ArrayList[EClassifier]) = {
    val containedClassifiers: java.util.ArrayList[EClassifier] = new java.util.ArrayList[EClassifier]
    val notContainedClassifiers: java.util.ArrayList[EClassifier] = new java.util.ArrayList[EClassifier]
    for (classifier <- allClassifiers) {
      classifier match {
        case cls: EClass => {
          for (containedRef <- cls.getEAllContainments) {
            containedClassifiers.add(containedRef.getEReferenceType)
          }
        }
        case enm: EEnum => {
          containedClassifiers.add(enm)
        }
      }
    }

    for (classifier <- allClassifiers) {
      if (!containedClassifiers.contains(classifier)) {
        notContainedClassifiers.add(classifier)
      }
    }

    (containedClassifiers, notContainedClassifiers)
  }

}
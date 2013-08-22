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

import java.io.{PrintWriter, File}
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl
import org.eclipse.emf.ecore.resource.{ResourceSet, Resource}
import org.eclipse.emf.ecore.util.EcoreUtil
import org.eclipse.emf.ecore.xmi.XMIResource
import org.eclipse.emf.common.util.{URI => EmfUri}

import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl
import org.eclipse.emf.ecore._
import java.util
import org.kevoree.modeling.aspect.AspectClass

/**
 * Created by IntelliJ IDEA.
 * User: gregory.nain
 * Date: 21/03/12
 * Time: 13:43
 */

class GenerationContext {

  var microframework: Boolean = false

  def usemicrofwk(): Boolean = microframework

  var genTrace: Boolean = false

  def isGenTrace(): Boolean = genTrace

  var genFlatInheritance: Boolean = false

  def getGenFlatInheritance = genFlatInheritance

  def setGenFlatInheritance() {
    genFlatInheritance = true
  }

  var aspects : java.util.HashMap[String, AspectClass] = new java.util.HashMap[String, AspectClass]()

  /**
   * True if selectByQuery methods have to be generated
   */
  var genSelector: Boolean = false

  def getGenSelector = genSelector


  /**
   * Package to be added before the RootPackage of the model
   * eg: Root package in the model: 'kevoree'; value of packagePrefix: 'org' would generate code in org.kevoree
   */
  private var packagePrefix: Option[String] = None

  def setPackagePrefix(pack: Option[String]) {
    packagePrefix = pack
  }

  def getPackagePrefix = packagePrefix

  /**
   * Base folder for the generation process
   * example: "${project.build.directory}/generated-sources/kmf"
   */
  private var rootGenerationDirectory: File = null

  def setRootGenerationDirectory(dir: File) {
    rootGenerationDirectory = dir
  }

  def getRootGenerationDirectory = rootGenerationDirectory

  var rootSrcDirectory : File = null;

  def setRootSrcDirectory(rootSrc : File){
    rootSrcDirectory = rootSrc;
  }

  def getRootSrcDirectory() : File = {
    return rootSrcDirectory;
  }

  /**
   * Folder containing sources created by users
   * example "src/main/java"
   */
  private var rootUserDirectory: File = null

  def setRootUserDirectory(dir: File) {
    rootUserDirectory = dir
  }

  def getRootUserDirectory = rootUserDirectory


  /**
   * Specifies the RootContainer class name.
   * Example: "ContainerRoot"
   */
  private var rootXmiContainerClassName: Option[String] = None

  def setRootContainerClassName(className: Option[String]) {
    rootXmiContainerClassName = className
  }

  def getRootContainerClassName = rootXmiContainerClassName


  def getChildrenOf(parent: EClass, resource: XMIResource): List[EClass] = {
    import scala.collection.JavaConversions._
    resource.getAllContents.filter(cls => cls.isInstanceOf[EClass] && cls.asInstanceOf[EClass].getESuperTypes.contains(parent)).toList.asInstanceOf[List[EClass]]
  }

  def checkEID(current: EClass, resource: XMIResource) {
    import scala.collection.JavaConversions._
    if (current.getEAllAttributes.find(att => att.isID).isEmpty && !current.isAbstract) {
      val generatedKmfIdAttribute = EcoreFactory.eINSTANCE.createEAttribute()
      generatedKmfIdAttribute.setID(true)
      generatedKmfIdAttribute.setName("generated_KMF_ID")
      generatedKmfIdAttribute.setEType(EcorePackage.eINSTANCE.getEString)
      current.getEStructuralFeatures.add(generatedKmfIdAttribute)
    }
    getChildrenOf(current, resource).foreach {
      child => checkEID(child, resource)
    }
  }

  def getRecursiveListOfFiles(dir: File, ext: String): Array[File] = {
    val these = dir.listFiles.filter(f => f.getName.endsWith(ext))
    these ++ these.filter(_.isDirectory).flatMap(getRecursiveListOfFiles(_, ext))
  }

  def getEcoreModel(ecorefile: File): ResourceSet = {
    import scala.collection.JavaConversions._
    val rs = new ResourceSetImpl()
    Resource.Factory.Registry.INSTANCE.getExtensionToFactoryMap.put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl())

    if (ecorefile.isDirectory) {
      val ecoreFiles = getRecursiveListOfFiles(ecorefile, "ecore")
      ecoreFiles.foreach {
        eFile =>
          val resource = rs.createResource(EmfUri.createFileURI(eFile.getAbsolutePath)).asInstanceOf[XMIResource]
          resource.load(null)
          EcoreUtil.resolveAll(resource)
          /* select all root */
          resource.getAllContents.filter(cls => cls.isInstanceOf[EClass] && cls.asInstanceOf[EClass].getEAllSuperTypes.isEmpty).foreach {
            modelElm =>
              checkEID(modelElm.asInstanceOf[EClass], resource)
          }
          rs.getResources.add(resource)
      }
    } else {
      System.out.println("[INFO] Loading model file " + ecorefile.getAbsolutePath)
      val fileUri = EmfUri.createFileURI(ecorefile.getAbsolutePath)
      val resource = rs.createResource(fileUri).asInstanceOf[XMIResource]
      resource.load(null)
      EcoreUtil.resolveAll(resource)
      /* select all root */
      resource.getAllContents.filter(cls => cls.isInstanceOf[EClass] && cls.asInstanceOf[EClass].getEAllSuperTypes.isEmpty).foreach {
        modelElm =>
          checkEID(modelElm.asInstanceOf[EClass], resource)
      }
      rs.getResources.add(resource)
      EcoreUtil.resolveAll(rs)
    }
    rs
  }

  /**
   * Fully Qualified Name of the KMF Container Interface
   */
  private var kevoreeContainer: Option[String] = None

  def getKevoreeContainer = kevoreeContainer

  def setKevoreeContainer(ct: Option[String]) {
    kevoreeContainer = ct
  }

  /**
   * Fully Qualified Name of the KMF Container Implementation
   */
  private var kevoreeContainerImplFQN: String = ""

  def getKevoreeContainerImplFQN = kevoreeContainerImplFQN

  def setKevoreeContainerImplFQN(s: String) {
    kevoreeContainerImplFQN = s
  }


  /**
   * Name of the cache class used in SelectByQuery methods.
   * Example: KevoreeResolverCacheInternal
   */
  private var kevoreeCacheResolver: String = ""

  def getkevoreeCacheResolver = kevoreeCacheResolver

  def setkevoreeCacheResolver(s: String) {
    kevoreeCacheResolver = s
  }

  /**
   * Store of FQN of EClasses for which the loader method has already been generated
   */
  var generatedLoaderFiles = new util.ArrayList[String]()

  /**
   * PrintWriter used for all the loader generation
   */
  var loaderPrintWriter: PrintWriter = null


  /**
   * hosts the package name of the Cloner
   * example "org.kevoree.cloner"
   */
  var clonerPackage: String = ""

  def getClonerPackage = clonerPackage

  //Maps a package with its factory (eg. org.kevoree => org.kevoree.KevoreeFactory)
  var packageFactoryMap: util.HashMap[String, String] = new util.HashMap[String, String]()
  //Maps a class with its factory (eg. org.kevoree.ContainerRoot => org.kevoree.KevoreeFactory)
  var classFactoryMap: util.HashMap[String, String] = new util.HashMap[String, String]()

  /**
   * Recursively registers the factories in the maps, though the subpackages relation
   * @param pack : The package where to start the registration
   */
  def registerFactory(pack: EPackage) {
    import scala.collection.JavaConversions._
    if (pack.getEClassifiers.size() > 0) {
      var formatedFactoryName: String = pack.getName.substring(0, 1).toUpperCase
      formatedFactoryName += pack.getName.substring(1)
      formatedFactoryName += "Factory"

      val packageName = ProcessorHelper.fqn(this, pack)
      packageFactoryMap.put(packageName, packageName + "." + formatedFactoryName)
      pack.getEClassifiers.foreach {
        cls =>
          classFactoryMap.put(pack + "." + cls.getName, packageFactoryMap.get(pack))
      }
    }
    pack.getESubpackages.foreach {
      subPackage => registerFactory(subPackage)
    }
  }

  /**
   * Tells if the code must be JavaScript compliant
   */
  var js = false

  def getJS(): Boolean = {
    js
  }

  def setJS(isJS: Boolean) {
    js = isJS
    if (isJS) {
      /* Kotlin workaround */
      genFlatInheritance = true
    }
  }


  var flyweightFactory = false

  var generateEvents = false

  def setGenerateEvents(evt: Boolean) {
    generateEvents = evt
  }


  var basePackageForUtilitiesGeneration: EPackage = null

  def getBasePackageForUtilitiesGeneration = basePackageForUtilitiesGeneration

  var baseLocationForUtilitiesGeneration: File = null

  def getBaseLocationForUtilitiesGeneration = baseLocationForUtilitiesGeneration

  def setBaseLocationForUtilitiesGeneration(metamodelFile: File) {
    import scala.collection.JavaConversions._

    val metamodel = getEcoreModel(metamodelFile)

    val packages = new util.ArrayList[EPackage]()
    metamodel.getAllContents.foreach{ content =>
        if(content.isInstanceOf[EPackage]){
          packages.add(content.asInstanceOf[EPackage])
        }
    }
    if (packages.size > 1) {
      // Many packages at the root.
      basePackageForUtilitiesGeneration = EcoreFactory.eINSTANCE.createEPackage()
      basePackageForUtilitiesGeneration.setName("")
      if (getPackagePrefix.isDefined) {
        baseLocationForUtilitiesGeneration = new File(getRootGenerationDirectory.getAbsolutePath + File.separator + getPackagePrefix.get.replace(".", File.separator))
      } else {
        baseLocationForUtilitiesGeneration = getRootGenerationDirectory
      }

    } else if (packages.size == 1) {
      // One package at the root.
      if (packages.get(0).getEClassifiers.size() > 0) {
        // Classifiers in this root package
        basePackageForUtilitiesGeneration = packages.get(0)
        baseLocationForUtilitiesGeneration = new File(getRootGenerationDirectory.getAbsolutePath + File.separator + ProcessorHelper.fqn(this, packages.get(0)).replace(".", File.separator) + File.separator)
      } else {
        baseLocationForUtilitiesGeneration = checkBaseLocation(packages.get(0))
      }
    }
  }

  private def checkBaseLocation(rootElement: EPackage): File = {
    import scala.collection.JavaConversions._
    val packageList = new util.LinkedList[EPackage]()
    packageList.addLast(rootElement)
    var f: File = null

    while (f == null && packageList.size() > 0) {
      val currentPackage = packageList.pollFirst()
      currentPackage.getESubpackages.forall {
        subPack =>
          if (subPack.getEClassifiers.size() > 0) {
            basePackageForUtilitiesGeneration = currentPackage
            f = new File(getRootGenerationDirectory.getAbsolutePath + File.separator + ProcessorHelper.fqn(this, currentPackage).replace(".", File.separator) + File.separator)
          }
          f == null
      }
      if (f == null) {
        packageList.appendAll(currentPackage.getESubpackages)
      }
    }
    f
  }

}
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
import org.eclipse.emf.ecore.resource.Resource
import org.eclipse.emf.ecore.util.EcoreUtil
import org.eclipse.emf.ecore.xmi.XMIResource
import org.eclipse.emf.common.util.{URI => EmfUri}

import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl
import org.eclipse.emf.ecore._
import java.util
import scala.Some

/**
 * Created by IntelliJ IDEA.
 * User: gregory.nain
 * Date: 21/03/12
 * Time: 13:43
 * To change this template use File | Settings | File Templates.
 */

class GenerationContext {

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
   *  example: "${project.build.directory}/generated-sources/kmf"
   */
  private var rootGenerationDirectory: File = null

  def setRootGenerationDirectory(dir: File) {
    rootGenerationDirectory = dir
  }

  def getRootGenerationDirectory = rootGenerationDirectory


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


  def getEcoreModel(ecorefile: File): XMIResource = {

    System.out.println("[INFO] Loading model file " + ecorefile.getAbsolutePath)
    val fileUri = EmfUri.createFileURI(ecorefile.getAbsolutePath)
    val rs = new ResourceSetImpl()
    Resource.Factory.Registry.INSTANCE.getExtensionToFactoryMap.put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl())
    val resource = rs.createResource(fileUri).asInstanceOf[XMIResource]
    resource.load(null)
    EcoreUtil.resolveAll(resource)

    resource
  }


  private var rootContainers: Map[EPackage, EClass] = Map.empty[EPackage, EClass]

  def getRootContainerInPackage(pack: EPackage): Option[EClass] = {
    rootContainers.get(pack) match {
      case Some(cls) => Some(cls)
      case None => {
        ProcessorHelper.lookForRootElement(pack, rootXmiContainerClassName) match {
          case Some(cls) => {
            rootContainers = rootContainers + ((pack, cls))
            Some(cls)
          }
          case None => None
        }
      }
    }
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

  def getJS() : Boolean = {
    js
  }

  def setJS(isJS: Boolean) {
    js = isJS
  }


  var basePackageForUtilitiesGeneration : EPackage = null
  def getBasePackageForUtilitiesGeneration = basePackageForUtilitiesGeneration

  var baseLocationForUtilitiesGeneration : File = null
  def getBaseLocationForUtilitiesGeneration = baseLocationForUtilitiesGeneration

  def setBaseLocationForUtilitiesGeneration(metamodelFile : File) {
      val metamodel = getEcoreModel(metamodelFile)
      if(metamodel.getContents.size() > 1) { // Many packages at the root.
        basePackageForUtilitiesGeneration = EcoreFactory.eINSTANCE.createEPackage()
        basePackageForUtilitiesGeneration.setName("")
        if(getPackagePrefix.isDefined) {
          baseLocationForUtilitiesGeneration = new File(getRootGenerationDirectory.getAbsolutePath + File.separator + getPackagePrefix.get.replace(".", File.separator))
        } else {
          baseLocationForUtilitiesGeneration = getRootGenerationDirectory
        }

      } else if(metamodel.getContents.size()==1) { // One package at the root.
        if(metamodel.getContents.get(0).asInstanceOf[EPackage].getEClassifiers.size() > 0) { // Classifiers in this root package
          basePackageForUtilitiesGeneration = metamodel.getContents.get(0).asInstanceOf[EPackage]
          baseLocationForUtilitiesGeneration = new File(getRootGenerationDirectory.getAbsolutePath + File.separator + ProcessorHelper.fqn(this, metamodel.getContents.get(0).asInstanceOf[EPackage]).replace(".",File.separator) + File.separator)
        } else {
          baseLocationForUtilitiesGeneration = checkBaseLocation(metamodel.getContents.get(0).asInstanceOf[EPackage])
        }
      }
  }

  private def checkBaseLocation(rootElement : EPackage) : File = {
    import scala.collection.JavaConversions._
    val packageList = new util.LinkedList[EPackage]()
    packageList.addLast(rootElement)
    var f : File = null

    while(f == null && packageList.size() > 0) {
      val currentPackage = packageList.pollFirst()
      currentPackage.getESubpackages.forall{ subPack =>
        if(subPack.getEClassifiers.size() > 0) {
          basePackageForUtilitiesGeneration = currentPackage
          f =  new File(getRootGenerationDirectory.getAbsolutePath + File.separator + ProcessorHelper.fqn(this, currentPackage).replace(".",File.separator) + File.separator)
        }
        f == null
      }
      if(f == null) {
        packageList.appendAll(currentPackage.getESubpackages)
      }
    }
    f
  }

}
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


package org.kevoree.tools.ecore.gencode

import cloner.ClonerGenerator
import java.io.File
import loader.LoaderGenerator
import org.eclipse.emf.ecore.xmi.impl.XMIResourceImpl
import org.eclipse.emf.common.util.URI
import org.eclipse.emf.ecore.EPackage
import scala.collection.JavaConversions._

import model.Processor
import serializer.SerializerGenerator

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 21/09/11
 * Time: 23:05
 */

/**
 * Generator class. Proposes several methods for generation of Model, Loader, Serializer from a EMF-<i>ecore</i> model.
 * @param rootGenerationDirectory is the directory where the sources will be generated.
 * @param packagePrefix can be used to specify an additional package prefix.
 */
class Generator(rootGenerationDirectory: File, packagePrefix: Option[String], rootXmiContainerClassName : Option[String]) {

  /**
   * Triggers the generation of the given <i>ecore</i> file implementation.
   * @param ecoreFile the ecore model that implementation will be generated
   * @param modelVersion the version of the model (will be included in headers of generated files).
   */
  def generateModel(ecoreFile: File, modelVersion : String) {
    val resource = new XMIResourceImpl(URI.createFileURI(ecoreFile.getAbsolutePath));
    resource.load(null);

    var modelGenBaseDir = rootGenerationDirectory.getAbsolutePath + "/"
    packagePrefix.map(prefix => modelGenBaseDir += prefix.replace(".", "/"))

    ProcessorHelper.checkOrCreateFolder(modelGenBaseDir)
    System.out.println("Launching model generation in:" + modelGenBaseDir)
    resource.getContents.foreach {
      elem =>
        elem match {
          case pack: EPackage => Processor.process(modelGenBaseDir, pack, packagePrefix, modelVersion, true, rootXmiContainerClassName)
          case _ => println("No model generator for root element of class: " + elem.getClass)
        }
    }
    System.out.println("Done with model generation")
  }

  def generateLoader(ecoreFile: File) {
    val resource = new XMIResourceImpl(URI.createFileURI(ecoreFile.getAbsolutePath));
    resource.load(null);

    var loaderGenBaseDir = rootGenerationDirectory.getAbsolutePath + "/"
    packagePrefix.map(prefix => loaderGenBaseDir += prefix.replace(".", "/"))

    ProcessorHelper.checkOrCreateFolder(loaderGenBaseDir)
    System.out.println("Launching loader generation in:" + loaderGenBaseDir)
    resource.getContents.foreach {
      elem => elem match {
        case pack: EPackage => {
          val loaderGenerator = new LoaderGenerator(loaderGenBaseDir, packagePrefix, pack, rootXmiContainerClassName)
          loaderGenerator.generateLoader()
        }
        case _ => println("No loader generator for root element of class: " + elem.getClass)
      }
    }
    System.out.println("Done with loader generation")
  }

  def generateSerializer(ecoreFile: File) {
    val resource = new XMIResourceImpl(URI.createFileURI(ecoreFile.getAbsolutePath));
    resource.load(null);

    var serializerGenBaseDir = rootGenerationDirectory.getAbsolutePath + "/"
    packagePrefix.map(prefix => serializerGenBaseDir += prefix.replace(".", "/"))

    ProcessorHelper.checkOrCreateFolder(serializerGenBaseDir)
    System.out.println("Launching serializer generation in:" + serializerGenBaseDir)
    resource.getContents.foreach {
      elem => elem match {
        case pack: EPackage => {
          val serializerGenerator = new SerializerGenerator(serializerGenBaseDir, packagePrefix, pack, rootXmiContainerClassName)
          serializerGenerator.generateSerializer()
        }
        case _ => println("No serializer generator for root element of class: " + elem.getClass)
      }
    }
    System.out.println("Done with serializer generation")
  }
/*
  def generateCloner(ecoreFile: File) {
    val resource = new XMIResourceImpl(URI.createFileURI(ecoreFile.getAbsolutePath));
    resource.load(null);
    val baseDir = rootGenerationDirectory.getAbsolutePath + "/" + packagePrefix.replace(".", "/")
    ProcessorHelper.checkOrCreateFolder(baseDir)
    System.out.println("Launching serializer generation in:" + baseDir)
    resource.getContents.foreach {
      elem => elem match {
        case pack: EPackage => {
          val clonerGenerator = new ClonerGenerator(baseDir, packagePrefix, pack)
          clonerGenerator.generateCloner()
        }
        case _ => println("No serializer generator for root element of class: " + elem.getClass)
      }
    }
  }*/


}
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

class Generator(rootDir: File, rootPackage: String) {
  //, log : Log) {

  def generateModel(ecoreFile: File, modelVersion : String) {
    val resource = new XMIResourceImpl(URI.createFileURI(ecoreFile.getAbsolutePath));
    resource.load(null);
    val location = rootDir.getAbsolutePath + "/" + rootPackage.replace(".", "/")
    ProcessorHelper.checkOrCreateFolder(location)
    System.out.println("Launching model generation in:" + location)
    resource.getContents.foreach {
      elem =>
        elem match {
          case pack: EPackage => Processor.process(location, pack, Some(rootPackage),modelVersion,true)
          case _ => println("No model generator for root element of class: " + elem.getClass)
        }
    }
  }

  def generateLoader(ecoreFile: File) {
    val resource = new XMIResourceImpl(URI.createFileURI(ecoreFile.getAbsolutePath));
    resource.load(null);
    val location = rootDir.getAbsolutePath + "/" + rootPackage.replace(".", "/")
    ProcessorHelper.checkOrCreateFolder(location)
    System.out.println("Launching loader generation in:" + location)
    resource.getContents.foreach {
      elem => elem match {
        case pack: EPackage => {
          val loaderGenerator = new LoaderGenerator(location, rootPackage, pack)
          loaderGenerator.generateLoader()
        }
        case _ => println("No loader generator for root element of class: " + elem.getClass)
      }
    }
  }

  def generateSerializer(ecoreFile: File) {
    val resource = new XMIResourceImpl(URI.createFileURI(ecoreFile.getAbsolutePath));
    resource.load(null);
    val location = rootDir.getAbsolutePath + "/" + rootPackage.replace(".", "/")
    ProcessorHelper.checkOrCreateFolder(location)
    System.out.println("Launching serializer generation in:" + location)
    resource.getContents.foreach {
      elem => elem match {
        case pack: EPackage => {
          val serializerGenerator = new SerializerGenerator(location, rootPackage, pack)
          serializerGenerator.generateSerializer()
        }
        case _ => println("No serializer generator for root element of class: " + elem.getClass)
      }
    }
  }
/*
  def generateCloner(ecoreFile: File) {
    val resource = new XMIResourceImpl(URI.createFileURI(ecoreFile.getAbsolutePath));
    resource.load(null);
    val location = rootDir.getAbsolutePath + "/" + rootPackage.replace(".", "/")
    ProcessorHelper.checkOrCreateFolder(location)
    System.out.println("Launching serializer generation in:" + location)
    resource.getContents.foreach {
      elem => elem match {
        case pack: EPackage => {
          val clonerGenerator = new ClonerGenerator(location, rootPackage, pack)
          clonerGenerator.generateCloner()
        }
        case _ => println("No serializer generator for root element of class: " + elem.getClass)
      }
    }
  }*/


}
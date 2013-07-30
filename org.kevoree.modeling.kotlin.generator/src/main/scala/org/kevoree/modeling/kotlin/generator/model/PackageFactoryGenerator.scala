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


package org.kevoree.modeling.kotlin.generator.model

import java.io.{File, PrintWriter}
import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import scala.collection.JavaConversions._
import org.eclipse.emf.ecore.{EClassifier, EClass, EPackage}
import org.kevoree.modeling.kotlin.generator.{ProcessorHelperClass, GenerationContext, ProcessorHelper}
import java.util

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 23/09/11
 * Time: 13:35
 */

trait PackageFactoryGenerator {

  def generatePackageFactory(ctx:GenerationContext, packageGenDir: String, packElement: EPackage , modelVersion : String) {
    var formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase
    formatedFactoryName += packElement.getName.substring(1)
    formatedFactoryName += "Factory"
    val localFile = new File(packageGenDir + "/" + formatedFactoryName + ".kt")
    val pr = new PrintWriter(localFile,"utf-8")
    val packageName = ProcessorHelper.fqn(ctx, packElement)
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate( "FactoryAPI.vm" );
    val ctxV = new VelocityContext()
    ctxV.put("packageName",packageName)
    ctxV.put("helper", new ProcessorHelperClass())
    ctxV.put("ctx",ctx)
    import scala.collection.JavaConversions._
    ctxV.put("formatedFactoryName",formatedFactoryName)
    val classes : java.util.List[EClassifier] = packElement.getEClassifiers.filter(cls=>cls.isInstanceOf[EClass]).toList
    ctxV.put("classes",classes)
    template.merge(ctxV,pr)
    pr.flush()
    pr.close()

  }

  def generateFlyweightFactory(ctx:GenerationContext, packageGenDir: String, packElement: EPackage , modelVersion : String) {
    var formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase
    formatedFactoryName += packElement.getName.substring(1)
    formatedFactoryName += "Factory"
    val localFile = new File(packageGenDir + "/impl/Flyweight" + formatedFactoryName + ".kt")
    val pr = new PrintWriter(localFile,"utf-8")
    val packageName = ProcessorHelper.fqn(ctx, packElement)
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate( "templates/FlyWeightFactory.vm" );
    val ctxV = new VelocityContext()
    ctxV.put("packageName",packageName)
    import scala.collection.JavaConversions._
    ctxV.put("formatedFactoryName",formatedFactoryName)

    val clzz : java.util.ArrayList[EClass] = new util.ArrayList[EClass]()
    packElement.getEClassifiers.filter(cls=>cls.isInstanceOf[EClass]).foreach{ec => clzz.add(ec.asInstanceOf[EClass]) }
    ctxV.put("classes",clzz)
    ctxV.put("modelVersion",modelVersion)
    template.merge(ctxV,pr)
    pr.flush()
    pr.close()
  }

  def generatePackageFactoryDefaultImpl(ctx:GenerationContext, packageGenDir: String, packElement: EPackage , modelVersion : String) {
    var formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase
    formatedFactoryName += packElement.getName.substring(1)
    formatedFactoryName += "Factory"
    val localFile = new File(packageGenDir + "/impl/Default" + formatedFactoryName + ".kt")
    val pr = new PrintWriter(localFile,"utf-8")
    val packageName = ProcessorHelper.fqn(ctx, packElement)
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate( "DefaultFactory.vm" );
    val ctxV = new VelocityContext()
    ctxV.put("packageName",packageName)
    import scala.collection.JavaConversions._
    ctxV.put("formatedFactoryName",formatedFactoryName)
    ctxV.put("js",ctx.js)
    ctxV.put("ctx",ctx)

    val classes : java.util.List[EClassifier] = packElement.getEClassifiers.filter(cls=>cls.isInstanceOf[EClass]).toList
    ctxV.put("classes",classes)
    ctxV.put("modelVersion",modelVersion)
    template.merge(ctxV,pr)
    pr.flush()
    pr.close()
  }




}
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


package org.kevoree.modeling.kotlin.generator.loader.xml

import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore.xmi.XMIResource
import org.eclipse.emf.ecore.{EEnum,EClass}
import scala.collection.JavaConversions._
import java.io._
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}
import javax.xml.stream.{XMLInputFactory, XMLStreamConstants}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 25/09/11
 * Time: 14:20
 */


class RootLoader(ctx : GenerationContext) {

  def generateLoader(model : XMIResource) {

    ProcessorHelper.checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "loader")
    val localFile = new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "loader" + File.separator + "XMIModelLoader.kt")
    ctx.loaderPrintWriter = new PrintWriter(localFile,"utf-8")
    val pr = ctx.loaderPrintWriter

    generateContext()
    val genPackage =  ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".loader"

    pr.println("package " + genPackage + ";")
    pr.println()
    pr.println("import java.io.File")
    pr.println("import java.io.FileInputStream")
    pr.println("import java.io.StringReader")
    pr.println("import java.io.InputStreamReader")
    pr.println("import java.io.InputStream")
    //pr.println("import " + genPackage + ".sub.*")
    pr.println("import javax.xml.stream.XMLStreamConstants")
    pr.println("import javax.xml.stream.XMLStreamReader")
    pr.println("import javax.xml.stream.XMLInputFactory")
    pr.println()

    pr.print("class XMIModelLoader : org.kevoree.modeling.api.ModelLoader" )

    // if (subLoaders.size > 0) {
    //   var stringListSubLoaders = List[String]()
    //   subLoaders.foreach(sub => stringListSubLoaders = stringListSubLoaders ++ List(sub.getName + "Loader"))
    //   pr.println(stringListSubLoaders.mkString(": ", ", ", " {"))
    // } else {
    pr.println("{")
    // }

    pr.println("")
    //TODO: REMOVE NEXT LiNE AFTER DEBUG
    //pr.println("var debug : Boolean = false")
    pr.println("")
    pr.println("")
    pr.println("")
    //val rootContainerName = elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1)


    generateFactorySetter(pr)
    pr.println("")
    generateUnescapeXmlMathod(pr)
    generateLoadMethod(pr)
    pr.println("")
    generateDeserialize(pr, model)
    pr.println("")
    //generateLoadElementsMethod(pr, rootContainerName, elementType)

    ProcessorHelper.collectAllClassifiersInModel(model).filter(proot => !proot.isInstanceOf[EEnum]).foreach { cls =>
      if(cls.isInstanceOf[EClass]) {
        if (!cls.asInstanceOf[EClass].isInterface && !cls.asInstanceOf[EClass].isAbstract) {
          val el = new BasicElementLoader(ctx, cls.asInstanceOf[EClass])
          el.generateLoader()
        } else {
          val el = new InterfaceElementLoader(ctx, cls.asInstanceOf[EClass])
          el.generateLoader()
        }
      }
    }

    pr.println("")
    pr.println("}")

    pr.flush()
    pr.close()

  }

  private def generateContext() {
    val el = new ContextGenerator(ctx)
    el.generateContext()
  }

  def generateXMIResolveCommand() {
    val genOutputStreamFile = new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "loader" + File.separator + "XMIResolveCommand.kt")
    val outputStream = new PrintWriter(genOutputStreamFile, "utf-8")
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()

    val template1 = ve.getTemplate("templates/commands/XMIResolveCommand.vm")
    val ctxV = new VelocityContext()
    ctxV.put("helper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    ctxV.put("ctx", ctx)

    template1.merge(ctxV, outputStream)
    outputStream.flush()
    outputStream.close()
  }


  private def generateUnescapeXmlMathod(pr : PrintWriter) {
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("templates/LoaderUnescapeXML.vm")
    val ctxV = new VelocityContext()
    template.merge(ctxV,pr)
  }




  private def generateFactorySetter(pr: PrintWriter) {
    pr.println("private var mainFactory : " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".factory.MainFactory = "+ ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".factory.MainFactory()")
    ctx.packageFactoryMap.values().foreach{factoryFqn =>
    //val factoryPackage = factoryFqn.substring(0, factoryFqn.lastIndexOf("."))
      val factoryName = factoryFqn.substring(factoryFqn.lastIndexOf(".") + 1)
      pr.println("fun set"+factoryName+"(fct : " + factoryFqn + ") { mainFactory.set"+factoryName+ "(fct)}")
      //pr.println("fun get"+factoryName+"() : "+factoryFqn+" { return mainFactory.get"+factoryName+ "()}")
    }

  }

  private def generateLoadMethod(pr: PrintWriter) {

    pr.println("override fun loadModelFromString(str: String) : List<Any>? {")
    pr.println("val stringReader = StringReader(str)")
    pr.println("val factory = XMLInputFactory.newInstance()")
    pr.println("val reader = factory?.createXMLStreamReader(stringReader)")
    pr.println("factory?.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false)")
    pr.println("factory?.setProperty(XMLInputFactory.IS_VALIDATING, false)")
    pr.println("if(reader != null && reader.hasNext()) {")
    pr.println("return deserialize(reader)")
    pr.println("} else {")
    pr.println("System.out.println(\"Loader::Noting in the String !\")")
    pr.println("return null")
    pr.println("}")
    pr.println("}")

    pr.println("override fun loadModelFromStream(inputStream: InputStream) : List<Any>? {")
    pr.println("val isReader = java.io.BufferedReader(InputStreamReader(inputStream))")
    pr.println("val factory = XMLInputFactory.newInstance()")
    pr.println("val reader = factory?.createXMLStreamReader(isReader)")
    pr.println("factory?.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false)")
    pr.println("factory?.setProperty(XMLInputFactory.IS_VALIDATING, false)")
    pr.println("if(reader != null && reader.hasNext()) {")
    pr.println("return deserialize(reader)")
    pr.println("} else {")
    pr.println("System.out.println(\"Loader::Noting in the file !\")")
    pr.println("return null")
    pr.println("}")
    pr.println("}")


  }


  private def generateDeserialize(pr: PrintWriter, model : XMIResource) {

    pr.println("private fun deserialize(reader : XMLStreamReader): List<Any> {")

    pr.println("val context = LoadingContext()")
    pr.println("context.xmiReader = reader")
    //pr.println("context.factory = this.factory")
    pr.println("while(reader.hasNext()) {")
    pr.println("val nextTag = reader.next()")
    pr.println("when(nextTag) {")
    pr.println("XMLStreamConstants.START_ELEMENT -> {")
    pr.println("val localName = reader.getLocalName()")
    pr.println("if(localName != null) {")
    pr.println("val loadedRootsSize = context.loadedRoots.size()")

    pr.println("when {")
    val classes = ProcessorHelper.collectAllClassifiersInModel(model)
    classes.foreach{classifier=>
      if(classifier.isInstanceOf[EClass]) {
        pr.println("localName.contains("+ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.CN_"+classifier.asInstanceOf[EClass].getName+") -> {")
        pr.println("context.loadedRoots.add(load"+ classifier.asInstanceOf[EClass].getName +"Element(\"/\" + loadedRootsSize, context))")
        pr.println("}")
      }
    }

    pr.println(" else -> {/*System.out.println(\"Element \" + localName + \" has been found at the root of the model, but no loader is mapped for this element.\")*/}")
    pr.println("}")
    pr.println("} else {")
    pr.println("System.out.println(\"Tried to read a tag with null tag_name.\")")
    pr.println("}")


    pr.println("}") // START_ELEMENT
    pr.println("XMLStreamConstants.END_ELEMENT -> {break}")
    pr.println("XMLStreamConstants.END_DOCUMENT -> {break}")
    pr.println("else ->{ /*println(\"Default case :\" + nextTag.toString())*/ }")

    pr.println("}")//When
    pr.println("}")//while

    //pr.println("for(res in context.resolvers) {res()}")

    pr.println("for(res in context.resolvers) {")
    pr.println("  res.run()")
    pr.println("}")

    pr.println("return context.loadedRoots")

    pr.println("}")
  }

}
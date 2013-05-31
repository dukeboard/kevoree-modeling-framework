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

import org.eclipse.emf.ecore.EClass
import java.io.PrintWriter
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 29/09/11
 * Time: 17:53
 */

class InterfaceElementLoader(ctx : GenerationContext, elementType: EClass) {


  def generateLoader() {

    if (!ctx.generatedLoaderFiles.contains(ProcessorHelper.fqn(ctx,elementType))) {
      ctx.generatedLoaderFiles.add(ProcessorHelper.fqn(ctx,elementType))
      //System.out.println("Generation of loader for " + elementType.getName)
      generateSubs()
      generateLoadingMethod(ctx.loaderPrintWriter)
    }
  }


  private def generateSubs(): List[EClass] = {

    var listContainedElementsTypes = List[EClass]()
    val it = ProcessorHelper.getAllConcreteSubTypes(elementType).iterator()
    while(it.hasNext) {
      val concreteType = it.next()
        if (!concreteType.isInterface && !concreteType.isAbstract) {
          val el = new BasicElementLoader(ctx, concreteType)
          el.generateLoader()
        } else {

          val el = new InterfaceElementLoader(ctx, concreteType)
          el.generateLoader()
        }
        if (!listContainedElementsTypes.contains(concreteType)) {
          listContainedElementsTypes = listContainedElementsTypes ++ List(concreteType)
        }
    }
    listContainedElementsTypes
  }

  private def generateLoadingMethod(pr: PrintWriter) {
    pr.println("private fun load" + elementType.getName + "Element(currentElementId : String, context : LoadingContext) : " + ProcessorHelper.fqn(ctx,elementType) + " {")

    pr.println("for(i in 0.rangeTo(context.xmiReader!!.getAttributeCount()-1)){")
    pr.println("val localName = context.xmiReader!!.getAttributeLocalName(i)")
    pr.println("val xsi = context.xmiReader!!.getAttributePrefix(i)")
    pr.println("if (localName == \"type\" && xsi==\"xsi\"){")
    pr.println("val xsiTypeValue = context.xmiReader!!.getAttributeValue(i)")
    pr.println("val loadedElement = when {")


    //val fqnPack = ProcessorHelper.fqn(elementType.getEPackage).replace(".","_")

    val it = ProcessorHelper.getAllConcreteSubTypes(elementType).iterator()
    while(it.hasNext) {
      val concreteType = it.next()
        pr.println("xsiTypeValue.equals(\"" + ProcessorHelper.fqn(ctx, concreteType.getEPackage) + ":" + concreteType.getName + "\") || xsiTypeValue!!.endsWith(\""+concreteType.getEPackage.getName.toLowerCase+":"+concreteType.getName+"\") -> {")
        pr.println("load" + concreteType.getName + "Element(currentElementId,context)")
        pr.println("}") // END WHEN CASE
    }
    pr.println("else -> {throw UnsupportedOperationException(\"Processor for "+elementType.getName+" has no mapping for type:\" + localName+\"/raw=\"+context.xmiReader!!.getAttributeValue(i)  + \" elementId:\" + currentElementId);}")
    pr.println("}") // END WHEN
    pr.println("return loadedElement as " + ProcessorHelper.fqn(ctx,elementType))
    pr.println("}") //END IF
    pr.println("}") // END FOR

    pr.println("throw UnsupportedOperationException(\"Processor for "+elementType.getName+" has no mapping for type: id\" + currentElementId);")

    pr.println("}") // END METHOD
  }

}
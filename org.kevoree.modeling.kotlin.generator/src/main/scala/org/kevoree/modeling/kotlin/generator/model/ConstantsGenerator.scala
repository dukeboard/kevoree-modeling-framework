package org.kevoree.modeling.kotlin.generator.model

import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore.resource.ResourceSet
import org.eclipse.emf.ecore.{EClass, EClassifier}
import org.eclipse.emf.ecore.xmi.XMIResource
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}
import java.io.{PrintWriter, File}
import java.util
import scala.collection.JavaConversions._

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 30/07/13
*/
trait ConstantsGenerator {


  def generateConstants(ctx : GenerationContext, model : ResourceSet) {

    val names = new util.HashMap[String, String]()

    model.getAllContents.foreach{ elm =>
      elm match {
        case cls : EClassifier => {
          if(!names.contains(cls.getName)) {
            names.put("CN_"+cls.getName, cls.getName)
          }
          names.put(ProcessorHelper.fqn(ctx, cls), ProcessorHelper.fqn(ctx, cls))
          if(cls.isInstanceOf[EClass]) {
            cls.asInstanceOf[EClass].getEAttributes.foreach{att=> if(!names.contains(att.getName)){names.put("Att_"+att.getName, att.getName)}}
            cls.asInstanceOf[EClass].getEReferences.foreach{ref=> if(!names.contains(ref.getName)){names.put("Ref_"+ref.getName, ref.getName)}}
          }
        }
        case _ =>
      }
    }
    ProcessorHelper.checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + "/util/")
    val localFile = new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + "/util/Constants.kt")
    val pr = new PrintWriter(localFile, "utf-8")
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("/templates/util/ConstGenerator.vm")
    val ctxV = new VelocityContext()
    ctxV.put("ctx", ctx)
    ctxV.put("FQNHelper",new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    ctxV.put("names", names)
    template.merge(ctxV, pr)
    pr.flush()
    pr.close()


  }


}

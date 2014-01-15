package org.kevoree.modeling.kotlin.generator.model

import java.io.PrintWriter
import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore.EClass
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 14:17
 */
trait ContainedElementsGenerator {

  def generateContainedElementsMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext) {

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("templates/VisitMethods.vm")
    val ctxV = new VelocityContext()
    ctxV.put("ctx", ctx)
    ctxV.put("currentClass", cls)
    ctxV.put("FQNHelper", ProcessorHelper.getInstance())
    ctxV.put("packElem",ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util")

    template.merge(ctxV, pr)
  }

}


package org.kevoree.modeling.kotlin.generator.events

import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}
import java.io.{PrintWriter, File}

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 05/07/13
*/

class EventsGenerator(ctx: GenerationContext) {

  def generateEvents() {
    generateElementListener()
    generateTreeListener()
    generateModelEventClass()
  }

  private def generateElementListener() {
    val extension = if(ctx.getJS()){"kt"}else{"java"}

    ProcessorHelper.checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "events")
    val localFile = new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "events" + File.separator + "ModelElementListener."+extension)
    val pr = new PrintWriter(localFile, "utf-8")

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = if(ctx.getJS()){ve.getTemplate("templates/events/JSModelElementListener.vm")}else{ve.getTemplate("templates/events/ModelElementListener.vm")}
    val ctxV = new VelocityContext()
    ctxV.put("ctx",ctx)
    ctxV.put("FQNHelper",new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    template.merge(ctxV,pr)
    pr.flush()
    pr.close()
  }

  private def generateTreeListener() {
    val extension = if(ctx.getJS()){"kt"}else{"java"}

    ProcessorHelper.checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "events")
    val localFile = new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "events" + File.separator + "ModelTreeListener."+extension)
    val pr = new PrintWriter(localFile, "utf-8")

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()

    val template = if(ctx.getJS()){ve.getTemplate("templates/events/JSModelTreeListener.vm")}else{ve.getTemplate("templates/events/ModelTreeListener.vm")}
    val ctxV = new VelocityContext()
    ctxV.put("ctx",ctx)
    ctxV.put("FQNHelper",new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    template.merge(ctxV,pr)
    pr.flush()
    pr.close()
  }

  private def generateModelEventClass() {
    ProcessorHelper.checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "events")

    val extension = if(ctx.getJS()){"kt"}else{"java"}

    val localFile = new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "events" + File.separator + "ModelEvent."+extension)
    val pr = new PrintWriter(localFile, "utf-8")

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()

    val template = if(ctx.getJS()){ve.getTemplate("templates/events/JSModelEvent.vm")}else{ve.getTemplate("templates/events/ModelEvent.vm")}
    val ctxV = new VelocityContext()
    ctxV.put("ctx",ctx)
    ctxV.put("FQNHelper",new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    template.merge(ctxV,pr)
    pr.flush()
    pr.close()

  }

}

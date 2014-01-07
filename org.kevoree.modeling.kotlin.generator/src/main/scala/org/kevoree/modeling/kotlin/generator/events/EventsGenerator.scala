package org.kevoree.modeling.kotlin.generator.events

import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}
import java.io.{PrintWriter, File}

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 05/07/13
*/

class EventsGenerator(ctx: GenerationContext) {

  def generateEvents() {

    if (ctx.microframework) {
    } else {
      generateElementListener()
      generateModelEventClass()
    }
  }

  private def generateElementListener() {
    if (!ctx.microframework) {
      ProcessorHelper.copyFromStream("org/kevoree/modeling/api/events/ModelElementListener.kt", ctx.getRootGenerationDirectory.getAbsolutePath)
    }
  }

  private def generateModelEventClass() {
    if (!ctx.microframework) {
      ProcessorHelper.copyFromStream("org/kevoree/modeling/api/events/ModelEvent.kt", ctx.getRootGenerationDirectory.getAbsolutePath)
    }
  }


}

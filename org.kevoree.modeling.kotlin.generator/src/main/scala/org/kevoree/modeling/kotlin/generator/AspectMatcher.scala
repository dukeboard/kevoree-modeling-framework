package org.kevoree.modeling.kotlin.generator

import org.eclipse.emf.ecore.EClass
import org.kevoree.modeling.aspect.AspectClass

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 19:01
 */
object AspectMatcher {

  import scala.collection.JavaConversions._

  def aspectMatcher(ctx: GenerationContext,aspect : AspectClass, eClass : EClass) : Boolean = {
    val localMatch = aspect.aspectedClass == eClass.getName || ProcessorHelper.fqn(ctx, eClass) == aspect.aspectedClass
    localMatch || eClass.getESuperTypes.exists(superEClass => aspectMatcher(ctx,aspect,superEClass) )
  }

}

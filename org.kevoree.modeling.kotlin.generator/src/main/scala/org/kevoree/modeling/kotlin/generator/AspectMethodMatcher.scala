package org.kevoree.modeling.kotlin.generator

import org.eclipse.emf.ecore.{EDataType, EOperation}
import org.kevoree.modeling.aspect.AspectMethod
import scala.collection.JavaConversions._

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/10/13
 * Time: 16:59
 */
object AspectMethodMatcher {

  def isMethodEquel(eop: EOperation, aop: AspectMethod, ctx: GenerationContext): Boolean = {
    if (eop.getName != aop.name) {
      return false
    }
    var methodReturnTypeTxt = ""
    if (eop.getEType != null) {
      if (eop.getEType.isInstanceOf[EDataType]) {
        methodReturnTypeTxt = ProcessorHelper.convertType(eop.getEType.getName)
      } else {
        methodReturnTypeTxt = ProcessorHelper.fqn(ctx, eop.getEType)
      }
    }
    var returnTypeCheck = false
    val equivalentMap = new java.util.HashMap[String, String]
    equivalentMap.put("List<*>", "MutableList");
    equivalentMap.put("List<Any?>", "MutableList");
    equivalentMap.put("List<Any?>", "MutableList<Any?>");
    equivalentMap.put("MutableIterator<*>", "MutableIterator");
    equivalentMap.put("MutableIterator<Any?>", "MutableIterator");
    equivalentMap.put("Class<out jet.Any?>", "Class");
    if (
      equivalentMap.get(methodReturnTypeTxt) == aop.returnType
        || (eop.getEType != null && eop.getEType.getName == aop.returnType)
        || (eop.getEType != null && eop.getLowerBound == 0 && (eop.getEType.getName+"?") == aop.returnType)
        || (eop.getEType != null && ProcessorHelper.fqn(ctx,eop.getEType) == aop.returnType)
        || (eop.getEType != null && eop.getLowerBound == 0 && (ProcessorHelper.fqn(ctx,eop.getEType)+"?") == aop.returnType)
    ) {
      returnTypeCheck = true
    } else {
      if (methodReturnTypeTxt == aop.returnType) {
        returnTypeCheck = true
      }
    }
    if (!returnTypeCheck) {
      System.err.println(methodReturnTypeTxt + "<->" + aop.returnType+"-"+(eop.getLowerBound == 0)+"-"+(eop.getEType != null && eop.getLowerBound == 0 && (ProcessorHelper.fqn(ctx,eop.getEType)+"?") == aop.returnType)+"-"+(ProcessorHelper.fqn(ctx,eop.getEType)+"?"));
      return false
    }
    if (eop.getEParameters.size() != aop.params.size()) {
      //System.out.println(aop.name+"-"+eop.getEParameters.size()+"<?>"+aop.params.size());
      return false
    } else {
      var i = 0;
      eop.getEParameters.foreach {
        eparam =>
          i = i + 1
          val methodReturnTypeTxt = if (eparam.getEType.isInstanceOf[EDataType]) {
            ProcessorHelper.convertType(eparam.getEType.getName)
          } else {
            ProcessorHelper.fqn(ctx, eparam.getEType)
          }
          var returnTypeCheck = false
          if (equivalentMap.get(methodReturnTypeTxt) == aop.params.get(i - 1).`type` || (eparam.getEType != null && eparam.getEType.getName == aop.params.get(i - 1).`type`)) {
            returnTypeCheck = true
          } else {
            if (methodReturnTypeTxt == aop.params.get(i - 1).`type`) {
              returnTypeCheck = true
            }
          }

          if (!returnTypeCheck) {
            System.err.println(methodReturnTypeTxt + "<=>" + aop.params.get(i - 1).`type` + "/" + returnTypeCheck)
            return false
          }
      }
    }
    return true
  }

}

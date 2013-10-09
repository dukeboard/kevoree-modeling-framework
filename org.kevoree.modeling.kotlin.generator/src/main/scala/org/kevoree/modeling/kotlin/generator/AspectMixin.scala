package org.kevoree.modeling.kotlin.generator

import org.eclipse.emf.ecore.resource.ResourceSet
import org.eclipse.emf.ecore.{EcoreFactory, EOperation, EClass}
import java.util
import scala.collection.JavaConversions._

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/10/13
 * Time: 16:56
 */
trait AspectMixin {

  def mixin(model: ResourceSet, ctx: GenerationContext) {

    model.getAllContents.foreach {
      content =>
        content match {
          case eclass: EClass => {
            //Should have aspect covered all method
            val operationList = new util.HashSet[EOperation]()
            operationList.addAll(eclass.getEAllOperations.filter(op => op.getName != "eContainer"))
            ctx.aspects.values().foreach {
              aspect =>
                if (AspectMatcher.aspectMatcher(ctx, aspect, eclass)) {
                  //aspect match
                  aspect.methods.foreach {
                    method =>
                      operationList.find(op => AspectMethodMatcher.isMethodEquel(op, method, ctx) && !method.privateMethod) match {
                        case Some(foundOp) => {
                          operationList.toList.foreach {
                            opLoop =>
                              if (AspectMethodMatcher.isMethodEquel(opLoop, method, ctx)) {
                                operationList.remove(opLoop)
                              }
                          }
                          operationList.remove(foundOp)
                        }
                        case None => {
                          //is it a new method
                          if (!eclass.getEAllOperations.exists(op => AspectMethodMatcher.isMethodEquel(op, method, ctx))) {

                            System.err.println("Add aspect Method to Ecore " + method.name + ":" + method.returnType + "/" + aspect.aspectedClass);

                            val newEOperation = EcoreFactory.eINSTANCE.createEOperation();
                            newEOperation.setName(method.name)

                            model.getAllContents.foreach {
                              c =>
                                if (c.isInstanceOf[EClass]) {
                                  val cc = c.asInstanceOf[EClass]
                                  if (cc.getName == method.returnType || (method.returnType != null && cc.getName == method.returnType.replace("?", ""))) {
                                    //TODO add FQN of class aspect
                                    newEOperation.setEType(cc)
                                    if (method.returnType.trim.endsWith("?")) {
                                      newEOperation.setLowerBound(0)
                                    } else {
                                      newEOperation.setLowerBound(1)
                                    }
                                  }
                                }
                            }
                            if (newEOperation.getEType == null) {
                              val dataType = EcoreFactory.eINSTANCE.createEDataType();
                              dataType.setName(method.returnType)
                              newEOperation.setEType(dataType)
                              if (method.returnType!=null && method.returnType.trim.endsWith("?")) {
                                newEOperation.setLowerBound(0)
                              } else {
                                newEOperation.setLowerBound(1)
                              }
                            }

                            method.params.foreach {
                              p =>
                                val newEParam = EcoreFactory.eINSTANCE.createEParameter();
                                newEParam.setName(p.name)
                                model.getAllContents.foreach {
                                  c =>
                                    if (c.isInstanceOf[EClass]) {
                                      val cc = c.asInstanceOf[EClass]
                                      if (cc.getName == p.`type`) {
                                        //TODO add FQN of class aspect
                                        newEParam.setEType(cc)
                                      }
                                    }
                                }
                                if (newEParam.getEType == null) {
                                  val dataTypeParam = EcoreFactory.eINSTANCE.createEDataType();
                                  dataTypeParam.setName(p.`type`)
                                  newEParam.setEType(dataTypeParam)
                                }
                                newEOperation.getEParameters.add(newEParam)
                            }
                            eclass.getEOperations.add(newEOperation)
                          }
                        }
                      }
                  }
                }
            }
          }
          case _ =>
        }
    }

  }


}

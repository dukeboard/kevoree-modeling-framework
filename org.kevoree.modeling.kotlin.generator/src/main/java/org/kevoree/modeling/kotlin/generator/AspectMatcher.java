package org.kevoree.modeling.kotlin.generator;

import org.eclipse.emf.ecore.EClass;
import org.kevoree.modeling.aspect.AspectClass;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 19:01
 */
public class AspectMatcher {


  public static Boolean aspectMatcher(final GenerationContext ctx, final AspectClass aspect, EClass eClass) {
      boolean localMatch = aspect.aspectedClass.equals(eClass.getName());
      if(!localMatch) {
          localMatch = ProcessorHelper.fqn(ctx, eClass).equals(aspect.aspectedClass);
      }
      if (!localMatch) {
          for(EClass superEClass : eClass.getEAllSuperTypes()) {
              if(aspectMatcher(ctx,aspect,superEClass)) {
                  localMatch = true;
                  break;
              }
          }
      }
      return localMatch;
  }

}

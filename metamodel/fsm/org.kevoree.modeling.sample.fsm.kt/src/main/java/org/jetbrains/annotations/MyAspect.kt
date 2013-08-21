package org.jetbrains.annotations;

import org.kevoree.modeling.api.aspect
import org.fsmsample.Action

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 21/08/13
 * Time: 10:03
 */

public aspect trait MyAspect : Action {

    override fun run(p : Boolean): String {
        return "";
    }

}


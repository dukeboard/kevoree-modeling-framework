package org.kevoree.modeling.api.util

import org.kevoree.modeling.api.KMFContainer

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 27/08/13
 * Time: 14:51
 */
public trait ModelAttributeVisitor {

    public fun visit(value: Any?, name: String, parent: KMFContainer)

}
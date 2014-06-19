package org.kevoree.modeling.api.util

/**
 * Created by duke on 6/12/14.
 */

trait InboundRefAware {

    var internal_inboundReferences : java.util.HashMap<org.kevoree.modeling.api.KMFContainer,  MutableSet<String>>

}
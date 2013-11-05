package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.persistent.PersistenceKMFFactory

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:28
 */

public trait KMFContainerProxy {

    var isResolved: Boolean

    var originFactory: PersistenceKMFFactory

    fun setOriginPath(path: String)

}
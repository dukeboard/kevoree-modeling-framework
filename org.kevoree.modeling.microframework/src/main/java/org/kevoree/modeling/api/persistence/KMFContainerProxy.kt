package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.KMFContainer

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:28
 */

public trait KMFContainerProxy : KMFContainer {

    var isResolved: Boolean
    var inResolution: Boolean

    var originFactory: PersistenceKMFFactory?

    fun setOriginPath(path: String)

}
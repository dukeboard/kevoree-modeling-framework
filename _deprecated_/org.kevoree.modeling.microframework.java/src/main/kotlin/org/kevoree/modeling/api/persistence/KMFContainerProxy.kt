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

    fun relativeLookupFrom(base: KMFContainer, relationInParent: String, key: String): KMFContainer? {
        val currentPath = base.path()
        return originFactory?.lookupFrom("$currentPath/$relationInParent[$key]", base)
    }

}
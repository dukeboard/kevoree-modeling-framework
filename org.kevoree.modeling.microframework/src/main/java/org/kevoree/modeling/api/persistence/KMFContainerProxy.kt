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
    var isDirty : Boolean
    var originFactory: PersistenceKMFFactory?

    fun setOriginPath(path: String)

    fun relativeLookupFrom(base: KMFContainer, relationInParent: String, key: String): KMFContainer? {
        val currentPath = base.path()
        if(currentPath == "/"){
            return originFactory?.lookup("/$relationInParent[$key]")
        } else {
            return originFactory?.lookup("$currentPath/$relationInParent[$key]")
        }
    }

}
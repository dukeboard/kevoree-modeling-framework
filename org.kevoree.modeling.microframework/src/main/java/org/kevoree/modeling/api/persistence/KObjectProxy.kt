package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.KObject

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:28
 */

public trait KObjectProxy : KObject {

    /*
    var isResolved: Boolean
    var inResolution: Boolean
    var isDirty : Boolean
    var originFactory: PersistenceKFactory?
    */
      /*
    fun setOriginPath(path: String)

    fun relativeLookupFrom(base: KObject, relationInParent: String, key: String): KObject? {
        val currentPath = base.path()
        if(currentPath == "/"){
            return originFactory?.lookup("/$relationInParent[$key]")
        } else {
            return originFactory?.lookup("$currentPath/$relationInParent[$key]")
        }
    }   */

}
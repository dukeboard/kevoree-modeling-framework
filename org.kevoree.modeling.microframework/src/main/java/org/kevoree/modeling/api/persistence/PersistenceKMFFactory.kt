package org.kevoree.modeling.api.persistent

import org.kevoree.modeling.api.KMFFactory
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.persistence.DataStore

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:05
 */

trait PersistenceKMFFactory : KMFFactory {

    var datastore: DataStore

    fun lookup(path: String): KMFContainer?



}

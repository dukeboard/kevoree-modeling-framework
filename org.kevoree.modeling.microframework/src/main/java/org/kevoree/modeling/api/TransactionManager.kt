package org.kevoree.modeling.api

import org.kevoree.modeling.api.persistence.DataStore
import org.kevoree.modeling.api.time.TimeView

/**
 * Created by duke on 7/29/14.
 */

trait TransactionManager {
    fun createTransaction(): Transaction
    fun close()
}
trait Transaction {
    fun commit()
    fun close()
}
trait TimeTransaction : Transaction {
    fun time(timepoint: String): TimeView<*>
}

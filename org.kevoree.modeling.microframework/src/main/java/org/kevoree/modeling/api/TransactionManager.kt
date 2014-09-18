package org.kevoree.modeling.api

import org.kevoree.modeling.api.time.TimeView
import org.kevoree.modeling.api.time.TimeTree
import org.kevoree.modeling.api.events.ModelElementListener

/**
 * Created by duke on 7/29/14.
 */

trait TransactionManager {
    fun createTransaction(): Transaction
    fun close()

    fun listen(listener: ModelElementListener, from: Long?, to: Long?, path: String)

    fun disable(listener: ModelElementListener)

}
trait Transaction {
    fun key(): String
    fun parent(): Transaction?
    fun children(): Set<Transaction>
    fun fork(): Transaction
    fun commit()
    fun close()
}
trait TimeTransaction : Transaction {

    fun time(timepoint: Long): TimeView

    fun globalTimeTree(): TimeTree

    fun timeTree(path: String): TimeTree

}

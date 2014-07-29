package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.persistence.DataStore

/**
 * Created by duke on 7/29/14.
 */

/*
object TimeManagerBuilder {

    public val INSTANCE: TimeManagerFactory = object : TimeManagerFactory {

    }

}

trait TimeManagerFactory {

    fun create()

    fun create(dataStore: DataStore)

}

trait TimeManager {

    fun time(timepoint: String): TimeView<*>

    fun createContext(): TimeContext

    fun close()

}

trait TimeContext {

    fun time(timepoint: String): TimeView<*>

    fun commit()

    fun close()

}

private class DefaultTimeContext() : TimeContext {


    override fun time(timepoint: String): TimeView<*> {
        throw UnsupportedOperationException()
    }
    override fun commit() {
        throw UnsupportedOperationException()
    }
    override fun close() {
        throw UnsupportedOperationException()
    }


}
*/

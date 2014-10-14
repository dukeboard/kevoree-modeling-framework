package org.kevoree.modeling.datastores.http

import org.kevoree.modeling.api.persistence.DataStore
import org.kevoree.modeling.api.persistence.EventDispatcher
import org.kevoree.modeling.api.events.ModelElementListener
import org.kevoree.modeling.api.events.ModelEvent

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 12/11/2013
 * Time: 17:06
 */

fun main(args: Array<String>) {
    println("Hello, world!")
    val server = DataStoreHttpWrapper(StubDataStore(), 8080)
    server.startServer()
    val client = DataStoreHttpClient("localhost", 8080)
    println(client.get("types", "/"))
    println(client.put("types", "/", "yop"))
    println(client.remove("types", "/"))
    println(client.sync())
    println(client.get("types", "nodes[n0]"))
}

class StubDataStore : DataStore {

    private val selector = EventDispatcher()

    override fun register(listener: ModelElementListener, from: Long?, to: Long?, path: String) {
        selector.register(listener, from, to, path)
    }

    override fun unregister(listener: ModelElementListener) {
        selector.unregister(listener)
    }

    override fun notify(event: ModelEvent) {
        selector.dispatch(event)
    }

    override fun getSegmentKeys(segment: String): Set<String> {
        throw UnsupportedOperationException()
    }
    override fun getSegments(): Set<String> {
        throw UnsupportedOperationException()
    }
    override fun get(segment: String, key: String): String? {
        println("get -> $segment,$key")
        return ""
    }
    override fun put(segment: String, key: String, value: String) {
        println("put -> $segment,$key | $value")
    }
    override fun remove(segment: String, key: String) {
        println("remove -> $segment,$key")
    }
    override fun sync() {
        println("sync")
    }
}
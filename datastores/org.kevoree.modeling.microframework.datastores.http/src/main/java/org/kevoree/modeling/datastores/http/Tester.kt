package org.kevoree.modeling.datastores.http

import org.kevoree.modeling.api.persistence.DataStore

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
    val client = DataStoreHttpClient("localhost",8080)
    println(client.get("types","/"))
    println(client.put("types","/","yop"))
    println(client.remove("types","/"))
    println(client.sync())
}

class StubDataStore : DataStore {
    override fun get(segment: String, key: String): String? {
        println("get -> $segment/$key")
        return "askGet"
    }
    override fun put(segment: String, key: String, value: String) {
        println("put -> $segment/$key | $value")
    }
    override fun remove(segment: String, key: String) {
        println("remove -> $segment/$key")
    }
    override fun sync() {
        println("sync")
    }
}
package org.kevoree.modeling.datastores.http

import org.kevoree.modeling.api.persistence.DataStore
import org.eclipse.jetty.client.HttpClient
import org.eclipse.jetty.http.HttpMethod

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 12/11/2013
 * Time: 16:10
 */

public class DataStoreHttpClient(val ip: String, val port: Int) : DataStore {

    var client: HttpClient

    {
        client = HttpClient()
        client.start()
    }

    override fun get(segment: String, key: String): String? {
        return client.GET("http://$ip:$port/$segment/$key")!!.getContentAsString()
    }
    override fun remove(segment: String, key: String) {
        client.newRequest("http://$ip:$port/$segment/$key")!!.method(HttpMethod.DELETE)!!.send()
    }
    override fun sync() {
        client.newRequest("http://$ip:$port")!!.method(HttpMethod.POST)!!.send()
    }
    override fun put(segment: String, key: String, value: String) {
        client.newRequest("http://$ip:$port")!!.method(HttpMethod.PUT)!!.send()
    }

}
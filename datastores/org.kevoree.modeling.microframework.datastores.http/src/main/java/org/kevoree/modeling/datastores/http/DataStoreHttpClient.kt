package org.kevoree.modeling.datastores.http

import org.kevoree.modeling.api.persistence.DataStore
import org.eclipse.jetty.client.HttpClient
import org.eclipse.jetty.http.HttpMethod
import org.eclipse.jetty.client.util.StringContentProvider

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 12/11/2013
 * Time: 16:10
 */

public class DataStoreHttpClient(val ip: String, val port: Int) : DataStore {

    override fun getSegmentKeys(segment: String): Set<String> {
        throw UnsupportedOperationException()
    }
    override fun getSegments(): Set<String> {
        throw UnsupportedOperationException()
    }

    var client: HttpClient

    {
        client = HttpClient()
        client.start()
    }

    override fun get(segment: String, key: String): String? {
        val request = client.newRequest("http://$ip:$port")!!
        request.getHeaders()?.put("elemPath", key)
        request.getHeaders()?.put("segmentName", segment)
        return request.send()!!.getContentAsString()
    }
    override fun remove(segment: String, key: String) {
        val request = client.newRequest("http://$ip:$port")!!
        request.method(HttpMethod.DELETE)!!
        request.getHeaders()?.put("elemPath", key)
        request.getHeaders()?.put("segmentName", segment)
        request.send()!!
    }
    override fun sync() {
        val request = client.newRequest("http://$ip:$port")!!
        request.method(HttpMethod.POST)!!
        request.send()!!
    }
    override fun put(segment: String, key: String, value: String) {
        val request = client.newRequest("http://$ip:$port")!!
        request.method(HttpMethod.PUT)!!
        request.getHeaders()?.put("elemPath", key)
        request.getHeaders()?.put("segmentName", segment)
        request.content(StringContentProvider(value))!!.send()
    }

}
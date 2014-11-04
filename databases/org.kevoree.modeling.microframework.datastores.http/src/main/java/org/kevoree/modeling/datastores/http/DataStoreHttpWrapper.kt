package org.kevoree.modeling.datastores.http

import org.kevoree.modeling.api.persistence.DataStore
import org.eclipse.jetty.server.handler.AbstractHandler
import org.eclipse.jetty.server.Request
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import org.eclipse.jetty.http.HttpMethod
import org.eclipse.jetty.server.Server
import org.kevoree.modeling.api.persistence.EventDispatcher
import org.kevoree.modeling.api.events.ModelElementListener
import org.kevoree.modeling.api.events.ModelEvent

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 12/11/2013
 * Time: 15:06
 */

public class DataStoreHttpWrapper(val wrapped: DataStore, val port: Int) : AbstractHandler(), DataStore {
    override fun commit() {
    }

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
        return wrapped.getSegmentKeys(segment)
    }

    override fun getSegments(): Set<String> {
        return wrapped.getSegments();
    }

    override fun handle(target: String?, baseRequest: Request?, request: HttpServletRequest?, response: HttpServletResponse?) {
        response!!.setContentType("text/plain;charset=utf-8")
        response.setStatus(HttpServletResponse.SC_OK);
        baseRequest!!.setHandled(true)
        val elemPath = baseRequest.getHeader("elemPath")
        val segmentName = baseRequest.getHeader("segmentName")
        if (HttpMethod.GET.`is`(request?.getMethod())) {
            val result = get(segmentName!!, elemPath!!)
            if (result != null) {
                response.getWriter()!!.write(result)
            }
        } else {
            if (HttpMethod.PUT.`is`(request?.getMethod())) {
                put(segmentName!!, elemPath!!, baseRequest.getReader()!!.readLine()!!)
            } else {
                if (HttpMethod.DELETE.`is`(request?.getMethod())) {
                    remove(segmentName!!, elemPath!!)
                } else {
                    if (HttpMethod.POST.`is`(request?.getMethod())) {
                        wrapped.close()
                    } else {
                        response.sendError(404, "Not a standard ")
                    }
                }
            }
        }

    }

    var _server: Server? = null

    fun startServer() {
        _server = Server(8080)
        _server!!.setHandler(this)
        _server!!.start()
    }

    fun stopServer() {
        _server?.stop()
        _server = null
    }

    override fun get(segment: String, key: String): String? {
        return wrapped.get(segment, key)
    }
    override fun put(segment: String, key: String, value: String) {
        wrapped.put(segment, key, value)
    }
    override fun close() {
        wrapped.close()
    }
    override fun remove(segment: String, key: String) {
        wrapped.remove(segment, key)
    }


}

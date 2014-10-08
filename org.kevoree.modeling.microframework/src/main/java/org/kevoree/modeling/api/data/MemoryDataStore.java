package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.events.ModelEvent;

public class MemoryDataStore implements DataStore {

    @Override
    public void put(String key, String value, Callback<String> callback, Callback<Exception> error) {

    }

    @Override
    public void get(String key, Callback<String> callback, Callback<Exception> error) {

    }

    @Override
    public void remove(String key, Callback<String> callback, Callback<Exception> error) {

    }

    @Override
    public void commit(Callback<String> callback, Callback<Exception> error) {

    }

    @Override
    public void close(Callback<String> callback, Callback<Exception> error) {

    }

    @Override
    public void notify(ModelEvent event) {

    }

    @Override
    public void register(ModelElementListener listener, long from, long to, String path) {

    }

    @Override
    public void unregister(ModelElementListener listener) {

    }


    /*

    override fun commit() {
        //nothing todo
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
        if (maps.containsKey(segment)) {
            maps.get(segment)!!.keySet()
        }
        return HashSet<String>()
    }

    override fun getSegments(): Set<String> {
        return maps.keySet()
    }

    override fun close() {
        selector.clear()
        maps.clear()
        //nothing to close in pure memory, wait for GC
    }

    var maps = HashMap<String, HashMap<String, String>>()

    private fun getOrCreateSegment(segment: String): HashMap<String, String> {
        if (!maps.containsKey(segment)) {
            maps.put(segment, HashMap<String, String>())
        }
        return maps.get(segment)!!
    }

    override fun put(segment: String, key: String, value: String) {
        getOrCreateSegment(segment).put(key, value)
    }

    override fun get(segment: String, key: String): String? {
        return getOrCreateSegment(segment).get(key)
    }

    override fun remove(segment: String, key: String) {
        getOrCreateSegment(segment).remove(key)
    }

    fun dump() {
        for (k in maps) {
            println("Map ${k.key}")
            for (t in k.value) {
                println("${t.key}->${t.value}")
            }
        }
    }


    */


}
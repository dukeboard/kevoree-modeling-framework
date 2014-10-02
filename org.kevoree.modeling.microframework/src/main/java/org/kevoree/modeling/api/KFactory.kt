package org.kevoree.modeling.api

import org.kevoree.modeling.api.json.JSONModelSerializer
import org.kevoree.modeling.api.json.JSONModelLoader
import org.kevoree.modeling.api.xmi.XMIModelLoader
import org.kevoree.modeling.api.xmi.XMIModelSerializer
import org.kevoree.modeling.api.compare.DefaultModelCompare

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 21:00
 */

public trait KFactory {

    fun create(metaClassName: String, callback: Callback<org.kevoree.modeling.api.KObject<*>?>)

    fun root(elem: KObject<*>, callback: Callback<Boolean>)

    fun createJSONSerializer(): JSONModelSerializer

    fun createJSONLoader(): JSONModelLoader

    fun createXMISerializer(): XMIModelSerializer

    fun createXMILoader(): XMIModelLoader

    fun createModelCompare(): ModelCompare

    fun createModelCloner(): ModelCloner

    fun createModelSlicer(): ModelSlicer

    fun select(query: String, callback: Callback<List<KObject<*>>>)

    fun lookup(path: String, callback: Callback<KObject<*>>)

    fun stream(query: String, callback: Callback<KObject<*>>)

}

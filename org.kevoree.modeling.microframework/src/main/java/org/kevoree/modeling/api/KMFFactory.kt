package org.kevoree.modeling.api

import org.kevoree.modeling.api.json.JSONModelSerializer
import org.kevoree.modeling.api.json.JSONModelLoader
import org.kevoree.modeling.api.xmi.XMIModelLoader
import org.kevoree.modeling.api.xmi.XMIModelSerializer
import org.kevoree.modeling.api.compare.ModelCompare

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 21:00
 */

trait KMFFactory {

    fun create(metaClassName: String): org.kevoree.modeling.api.KMFContainer?

    fun root(elem: KMFContainer)

    fun createJSONSerializer(): JSONModelSerializer

    fun createJSONLoader(): JSONModelLoader

    fun createXMISerializer(): XMIModelSerializer

    fun createXMILoader(): XMIModelLoader

    fun createModelCompare(): ModelCompare

    fun createModelCloner(): ModelCloner

    fun createModelPruner(): ModelPruner

    fun select(query: String): List<KMFContainer>

    fun lookup(path: String) : KMFContainer?

}

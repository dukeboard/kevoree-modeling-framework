package kevoree

import kotlin.browser.document
import org.kevoree.impl.DefaultKevoreeFactory
import java.io.OutputStream
import org.kevoree.serializer.JSONModelSerializer
import org.kevoree.loader.JSONModelLoader
import org.kevoree.ContainerRoot
import java.io.ByteArrayInputStream

/**
* Created with IntelliJ IDEA.
* User: duke
* Date: 02/04/13
* Time: 15:07
*/
fun myApp() : ContainerRoot? {
    val element = document.getElementById("foo")
    if (element != null) {
        val factory = DefaultKevoreeFactory()
        val root = factory.createContainerRoot()
        val node0 = factory.createContainerNode()
        node0.setName("node0")
        root.addNodes(node0)

        var lookupNode = root.findNodesByID("node0")
        element.appendChild(document.createElement("br")!!)
        element.appendChild(document.createTextNode("lookupNode")!!)
        element.appendChild(document.createTextNode(lookupNode!!.getName())!!)
        element.appendChild(document.createElement("br")!!)

        val oo = OutputStream()
        val saver = JSONModelSerializer()
        saver.serialize(root,oo)
        element.appendChild(document.createTextNode("Direct Creation Saved")!!)
        element.appendChild(document.createElement("br")!!)
        element.appendChild(document.createTextNode(oo.result)!!)
        element.appendChild(document.createElement("br")!!)

        val loader = JSONModelLoader()
        val modelLoaded = loader.loadModelFromString(oo.result)!!.get(0) as ContainerRoot
        element.appendChild(document.createTextNode("Node Size")!!)
        element.appendChild(document.createElement("br")!!)
        element.appendChild(document.createTextNode(",size="+modelLoaded.getNodes().size)!!)
        element.appendChild(document.createElement("br")!!)

        val oo2 = OutputStream()
        saver.serialize(modelLoaded,oo2)
        element.appendChild(document.createTextNode("After reload in browser")!!)
        element.appendChild(document.createElement("br")!!)
        element.appendChild(document.createTextNode(oo2.result)!!)
        element.appendChild(document.createElement("br")!!)

        return root;

    }
    return null;
}

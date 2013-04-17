package kmfjs

import kotlin.browser.document
import org.kevoree.impl.DefaultKevoreeFactory

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 02/04/13
 * Time: 15:07
 */

fun myApp() {
    val element = document.getElementById("foo")
    if (element != null) {
        val factory = DefaultKevoreeFactory()
        val root = factory.createContainerRoot()
        val node0 = factory.createContainerNode()
        node0.setName("node0")
        root.addNodes(node0)
        element.appendChild(document.createTextNode("Some Dynamically Created Content!!! nodeName"+node0.getName()+"/")!!)


        element.appendChild(document.createTextNode("getNode="+root.findNodesByID("node0"))!!)


    }
}
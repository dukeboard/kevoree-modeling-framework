package kevoree

//import kotlin.browser.document
import org.kevoree.impl.DefaultKevoreeFactory
import java.io.OutputStream
import org.kevoree.serializer.JSONModelSerializer

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 02/04/13
 * Time: 15:07
 */

//fun myApp() {
//    val element = document.getElementById("foo")
//    if (element != null) {
//        val factory = DefaultKevoreeFactory()
//        val root = factory.createContainerRoot()
//        val node0 = factory.createContainerNode()
//        node0.setName("node0")
//        root.addNodes(node0)
//
//     //   element.appendChild(document.createTextNode("Some Dynamically Created Content!!! nodeName"+node0.getName()+"/")!!)
//     //   element.appendChild(document.createTextNode("getNode="+root.findNodesByID("node0"))!!)
//     //   element.appendChild(document.createTextNode("size="+root.getNodes().size)!!)
//
//        val oo = OutputStream()
//        val saver = JSONModelSerializer()
//        saver.serialize(root,oo)
//
//        element.appendChild(document.createTextNode(oo.result)!!)
//
//    }
//}

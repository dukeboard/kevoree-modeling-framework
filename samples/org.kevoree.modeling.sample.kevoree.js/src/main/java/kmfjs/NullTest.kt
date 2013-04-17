package kmfjs

import kotlin.browser.document

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 17/04/13
 * Time: 17:31
 * To change this template use File | Settings | File Templates.
 */

trait MyIt {
}
class MyClazz : MyIt {
    val nullableL : List<String>? = null
}
fun main(){
    val res = MyClazz()
    when(res){
        is MyIt -> {
            val element = document.getElementById("foo")
            if(element != null){
                element.appendChild(document.createTextNode("Hello")!!)
            }
        }
        else -> {}
    }
}

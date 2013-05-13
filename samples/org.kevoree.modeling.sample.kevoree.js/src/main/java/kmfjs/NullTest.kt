package kmfjs

import kotlin.browser.document

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 17/04/13
 * Time: 17:31
 */

trait MyIt {
}
class MyClazz : MyIt {
    val nullableL : List<String>? = null
}
fun main(){
    val element = document.getElementById("foo")

    val myString = "Hello"
    var i = 0
    while(i < myString.size){
        myString.get(i)
        i = i + 1
    }

    val res = MyClazz()
    //if(res.nullableL != null){
    //}

    when(res){
        is MyClazz, is MyIt -> {
            if(element != null){
                element.appendChild(document.createTextNode("Hello2")!!)
            }
        }
        else -> {}
    }
}

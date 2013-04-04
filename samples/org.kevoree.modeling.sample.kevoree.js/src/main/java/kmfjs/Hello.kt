package kmfjs

import kotlin.browser.document
/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 02/04/13
 * Time: 15:07
 */

fun myApp() {
    val element = document.getElementById("foo")
    if (element != null) {
        element.appendChild(document.createTextNode("Some Dynamically Created Content!!!")!!)
    }
}
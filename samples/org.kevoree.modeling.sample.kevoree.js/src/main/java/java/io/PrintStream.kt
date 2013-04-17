package java.io;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 17/04/13
 * Time: 17:02
 */
class PrintStream(val oo : OutputStream) {

    var result: String = ""

    fun println() {
        result = result + "\n"
    }

    fun print(s: String) {
        result = result + s
    }

    fun println(s: String) {
        print(s)
        println()
    }

    fun print(s: Char) {
        result = result + s
    }

    fun print(s: Int) {
        result = result + s
    }

    fun print(s: Boolean) {
        if(s){
            result = result + "true"
        } else {
            result = result + "false"
        }
    }

    fun println(s : Char){
        print(s)
        println()
    }

    fun flush(){
        oo.result = result
    }

    fun close(){}

}

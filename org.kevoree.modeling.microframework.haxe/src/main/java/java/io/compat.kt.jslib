package java.io

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 29/08/13
 * Time: 21:12
 */




trait InputStream {
    fun readBytes() : ByteArray
}
public trait OutputStream {}
public class BufferedOutputStream(val oo : OutputStream) : OutputStream{
    fun write(s : String) {
        (oo as ByteArrayOutputStream).result = s;
    }
}
public class ByteArrayInputStream(val inputBytes : ByteArray) : InputStream {
    override fun readBytes() : ByteArray {
        return inputBytes;
    }
}
public class ByteArrayOutputStream : OutputStream {
    fun flush(){}
    fun close(){}
    public fun toString() : String {
        return result
    }
    var result : String = ""
}
class PrintStream(val oo : OutputStream, autoflush : Boolean) {
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
    fun print(s: Long) {
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
    fun flush(){(oo as BufferedOutputStream).write(result)}
    fun close(){}
}

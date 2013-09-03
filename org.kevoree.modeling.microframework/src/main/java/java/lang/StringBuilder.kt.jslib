package java.lang

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 29/08/13
 * Time: 20:56
 */

 public class StringBuilder {

     var content = ""

     fun append(sub : String){
         content = content + sub
     }

     fun append(sub : Char){
         content = content + sub
     }

     public fun toString():String{
         return content
     }

 }

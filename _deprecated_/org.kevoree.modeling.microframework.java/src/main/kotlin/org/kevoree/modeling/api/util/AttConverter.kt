package org.kevoree.modeling.api.util

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 24/10/2013
 * Time: 16:51
 */

object AttConverter {

    public fun convFlatAtt(value: Any?) : String? {
        if(value == null){return null}
        if(value is java.util.ArrayList<*>){
            var isF = true
            var buffer = StringBuilder()
            for(v in value){
                if(!isF){
                    buffer.append("$")
                }
                buffer.append(v.toString())
                isF = false
            }
            return buffer.toString()
        } else {
            return value.toString()
        }
    }

    public fun convAttFlat(value : String) : Array<String> {
        return value.toString().split("$")
    }


}
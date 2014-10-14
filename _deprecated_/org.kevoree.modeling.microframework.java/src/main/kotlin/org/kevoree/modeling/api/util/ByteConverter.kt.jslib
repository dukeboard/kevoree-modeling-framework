package org.kevoree.modeling.api.util

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 04/09/13
*/

object ByteConverter {
    public fun toChar(b : Byte) : Char{
        return (b as Char)
    }

    public fun fromChar(b : Char) : Byte{
        return (b as Byte)
    }

    public fun byteArrayInputStreamFromString(str : String) : java.io.ByteArrayInputStream {
        val bytes = ByteArray(str.length)
        var i = 0
        while(i < str.length){
            bytes.set(i,str.get(i) as Byte)
            i = i +1
        }
        return java.io.ByteArrayInputStream(bytes)
    }
}


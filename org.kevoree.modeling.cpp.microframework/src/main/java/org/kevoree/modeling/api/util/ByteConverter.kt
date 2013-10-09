package org.kevoree.modeling.api.util

import java.io.ByteArrayInputStream

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 04/09/13
*/

object ByteConverter {
    public fun toChar(b : Byte) : Char{
        return b.toChar()
    }

    public fun fromChar(b : Char) : Byte{
        return b.toByte()
    }

    public fun byteArrayInputStreamFromString(s : String) : ByteArrayInputStream {
        return ByteArrayInputStream(s.getBytes());
    }

}


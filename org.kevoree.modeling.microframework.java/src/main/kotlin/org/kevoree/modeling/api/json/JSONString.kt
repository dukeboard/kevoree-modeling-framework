package org.kevoree.modeling.api.json

/**
 * Created by duke on 3/6/14.
 */

object JSONString {

    private val escapeChar = '\\'

    public fun encodeBuffer(buffer: StringBuilder, chain: String?) {
        if (chain == null) {
            return;
        }
        var i = 0
        while (i < chain.length) {
            val ch = chain.get(i)
            if ( ch == '"' ) {
                buffer.append(escapeChar)
                buffer.append('"')
            } else if ( ch == escapeChar ) {
                buffer.append(escapeChar)
                buffer.append(escapeChar)
            } else if ( ch == '\n' ) {
                buffer.append(escapeChar)
                buffer.append('n')
            } else if ( ch == '\r' ) {
                buffer.append(escapeChar)
                buffer.append('r')
            } else if ( ch == '\t' ) {
                buffer.append(escapeChar)
                buffer.append('t')
            } else if ( ch == '\u2028' ) {
                buffer.append(escapeChar)
                buffer.append('u')
                buffer.append('2')
                buffer.append('0')
                buffer.append('2')
                buffer.append('8')
            } else if ( ch == '\u2029' ) {
                buffer.append(escapeChar)
                buffer.append('u')
                buffer.append('2')
                buffer.append('0')
                buffer.append('2')
                buffer.append('9')
            } else {
                buffer.append(ch)
            }
            i = i + 1
        }
    }

    public fun encode(ostream: java.io.PrintStream, chain: String?) {
        if (chain == null) {
            return;
        }
        var i = 0
        while (i < chain.length) {
            val ch = chain.get(i)
            if ( ch == '"' ) {
                ostream.print(escapeChar)
                ostream.print('"')
            } else if ( ch == escapeChar ) {
                ostream.print(escapeChar)
                ostream.print(escapeChar)
            } else if ( ch == '\n' ) {
                ostream.print(escapeChar)
                ostream.print('n')
            } else if ( ch == '\r' ) {
                ostream.print(escapeChar)
                ostream.print('r')
            } else if ( ch == '\t' ) {
                ostream.print(escapeChar)
                ostream.print('t')
            } else if ( ch == '\u2028' ) {
                ostream.print(escapeChar)
                ostream.print('u')
                ostream.print('2')
                ostream.print('0')
                ostream.print('2')
                ostream.print('8')
            } else if ( ch == '\u2029' ) {
                ostream.print(escapeChar)
                ostream.print('u')
                ostream.print('2')
                ostream.print('0')
                ostream.print('2')
                ostream.print('9')
            } else {
                ostream.print(ch)
            }
            i = i + 1
        }
    }

    public fun unescape(src: String?): String? {
        if(src==null){
            return null
        }
        if (src.length == 0) {
            return src
        }
        var builder: StringBuilder? = null
        var i: Int = 0
        while (i < src.length) {
            val current = src[i]
            if ( current == escapeChar ) {
                if (builder == null) {
                    builder = StringBuilder()
                    builder?.append(src.substring(0, i))
                }
                i++
                val current2 = src[i]
                when(current2) {
                    '"' -> {
                        builder?.append('\"')
                    }
                    '\\' -> {
                        builder?.append(current2)
                    }
                    '/' -> {
                        builder?.append(current2)
                    }
                    'b' -> {
                        builder?.append('\b')
                    }
                    'f' -> {
                        builder?.append(12.toChar())
                    }
                    'n' -> {
                        builder?.append('\n')
                    }
                    'r' -> {
                        builder?.append('\r')
                    }
                    't' -> {
                        builder?.append('\t')
                    }
                    'u' -> {
                        throw Exception("Bad char to escape ")
                    }
                }
            } else {
                if (builder != null) {
                    builder = builder?.append(current)
                }
            }
            i++
        }
        if (builder != null) {
            return builder!!.toString()
        } else {
            return src
        }
    }

}
package org.kevoree.modeling.api.util

import java.util.HashMap

/**
 * Created by duke on 8/25/14.
 */

public object KevURLEncoder {

    private val nonEscaped = HashMap<Char, Boolean>();
    private val escaped = HashMap<Char, String>();
    private val rescaped = HashMap<String, Char>();


    {
        var i = 'a'
        while (i < 'z') {
            nonEscaped.put(i, true)
            i++
        }
        i = 'A'
        while (i < 'Z') {
            nonEscaped.put(i, true)
            i++
        }
        i = '0'
        while (i < '9') {
            nonEscaped.put(i, true)
            i++
        }
        //escaped.put(' ', "%20");
        escaped.put('!', "%21");
        escaped.put('"', "%22");
        escaped.put('#', "%23");
        escaped.put('$', "%24");
        escaped.put('%', "%25");
        escaped.put('&', "%26");
        //escaped.put('\'', "%27");
        //escaped.put('(', "%28");
        //escaped.put(')', "%29");
        escaped.put('*', "%2A");
        //escaped.put('+', "%2B");
        escaped.put(',', "%2C");
        //escaped.put('-', "%2D");
        //escaped.put('.', "%2E");
        escaped.put('/', "%2F");
        escaped.put(']', "%5B");
        escaped.put('\\', "%5c");
        escaped.put('[', "%5D");

        for (c in escaped.keySet()) {
            rescaped.put(escaped.get(c)!!, c)
        }

    }

    public fun encode(chain: String?): String? {
        if (chain == null) {
            return null;
        }
        var buffer: StringBuilder? = null
        var i = 0
        while (i < chain.length) {
            val ch = chain.get(i)
            if (nonEscaped.contains(ch)) {
                if (buffer != null) {
                    buffer!!.append(ch)
                }
            } else {
                val resolved = escaped.get(ch)
                if (resolved != null) {
                    if (buffer == null) {
                        buffer = StringBuilder()
                        buffer!!.append(chain.substring(0, i))
                    }
                    buffer!!.append(resolved)
                }
            }
            i = i + 1
        }
        if (buffer != null) {
            return buffer.toString()
        } else {
            return chain
        }
    }

    public fun decode(src: String?): String? {
        if (src == null) {
            return null
        }
        if (src.length == 0) {
            return src
        }
        var builder: StringBuilder? = null
        var i: Int = 0
        while (i < src.length) {
            val current = src[i]
            if ( current == '%') {
                if (builder == null) {
                    builder = StringBuilder()
                    builder?.append(src.substring(0, i))
                }
                val key = current.toString() + src[i + 1] + src[i + 2]
                val resolved = rescaped.get(key)
                if (resolved == null) {
                    builder = builder?.append(key)
                } else {
                    builder = builder?.append(resolved)
                }
                i = i + 2
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

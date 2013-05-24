package com.google.gson.stream

import com.beust.klaxon.Lexer
import java.io.InputStream
import com.beust.klaxon.Token
import com.beust.klaxon.Type

/**
 * Created with IntelliJ IDEA.
 * User: leiko
 * Date: 5/23/13
 * Time: 10:43 AM
 * To change this template use File | Settings | File Templates.
 */
class JsonReader(ins: InputStream) {

    var lexer : Lexer = Lexer(ins)
    var token : Any? = null

    fun hasNext() : Boolean {
        if (token == null) {
            doPeek()
        }
        val t = token as Token
        return t.tokenType != Type.RIGHT_BRACE && t.tokenType != Type.RIGHT_BRACKET
    }

    private fun doPeek() : Any? {
        token = lexer.nextToken()
        val t = token as Token

        when (t.tokenType) {
            Type.COLON, Type.COMMA -> doPeek()
            else -> {/* do not peek another token */}
        }
        return token
    }

    fun peek() : Int {
        if (token == null) doPeek()
        val t = token as Token

        when (t.tokenType) {
            Type.LEFT_BRACE     -> return JsonToken.BEGIN_OBJECT
            Type.RIGHT_BRACE    -> return JsonToken.END_OBJECT
            Type.LEFT_BRACKET   -> return JsonToken.BEGIN_ARRAY
            Type.RIGHT_BRACKET  -> return JsonToken.END_ARRAY
            Type.VALUE          -> return JsonToken.NAME
            Type.EOF            -> return JsonToken.END_DOCUMENT
            else                -> return JsonToken.NULL // we don't care actually cause only END_DOCUMENT is used
        }
    }

    fun beginObject() {
        if (token == null) {
            doPeek()
        }
        val t = token as Token
        if (t.tokenType == Type.LEFT_BRACE) {
            token = null
        } else {
            throw IllegalStateException("Expected LEFT_BRACE but was " + peek());
        }
    }

    fun endObject() {
        if (token == null) doPeek()
        val t = token as Token
        if (t.tokenType == Type.RIGHT_BRACE) {
            token = null
        } else {
            throw IllegalStateException("Expected RIGHT_BRACE but was " + peek());
        }
    }

    fun beginArray() {
        if (token == null) doPeek()
        val t = token as Token
        if (t.tokenType == Type.LEFT_BRACKET) {
            token = null
        } else {
            throw IllegalStateException("Expected LEFT_BRACKET but was " + peek());
        }
    }

    fun endArray() {
        if (token == null) doPeek()
        val t = token as Token
        if (t.tokenType == Type.RIGHT_BRACKET) {
            token = null
        } else {
            throw IllegalStateException("Expected RIGHT_BRACKET but was " + peek());
        }
    }

    fun nextBoolean() : Boolean {
        if (token == null) doPeek()
        val t = token as Token
        var ret : Boolean = false

        if (t.tokenType == Type.VALUE) {
            ret = t.value as Boolean
            token = null
        } else {
            throw IllegalStateException("Expected VALUE(Boolean) but was " + peek());
        }
        return ret
    }

    fun nextString() : String {
        if (token == null) {
            doPeek()
        }
        val t = token as Token
        var ret : String = ""

        if (t.tokenType == Type.VALUE) {
            ret = t.value as String
            token = null
        } else {
            throw IllegalStateException("Expected VALUE(String) but was " + peek());
        }

        return ret
    }

    fun nextInt() : Int {
        if (token == null) doPeek()
        val t = token as Token
        var ret : Int = 42

        if (t.tokenType == Type.VALUE) {
            ret = Integer.parseInt(t.value as String)
            token = null
        } else {
            throw IllegalStateException("Expected VALUE(Int) but was " + peek());
        }

        return ret
    }

    fun nextName() : String {
        if (token == null) {
            doPeek()
        }
        val t = token as Token
        var ret : String = ""

        if (t.tokenType == Type.VALUE) {
            ret = t.value as String
            token = null
        } else {
            throw IllegalStateException("Expected VALUE(Name) but was " + peek());
        }

        return ret
    }
}
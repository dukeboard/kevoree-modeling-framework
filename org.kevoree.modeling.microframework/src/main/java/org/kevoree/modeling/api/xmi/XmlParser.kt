package org.kevoree.modeling.api.xmi

import org.kevoree.modeling.api.util.ByteConverter

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 04/09/13
*/

public object Token {
    public val XML_HEADER : Int = 0
    public val END_DOCUMENT : Int = 1
    public val START_TAG : Int = 2
    public val END_TAG : Int = 3
    public val COMMENT : Int = 4
    public val SINGLETON_TAG : Int = 5
}


public class XmlParser(val inputStream : java.io.InputStream) {

    private val bytes = inputStream.readBytes()
    private var index = -1

    private var currentChar : Char? = null

    private var xmlVersion : String? = null
    private var xmlCharset : String? = null

    private var tagName : String = ""
    private var tagPrefix : String? = null

    private var attributesNames : java.util.ArrayList<String> = java.util.ArrayList<String>()
    private var attributesPrefixes : java.util.ArrayList<String?> = java.util.ArrayList<String?>()
    private var attributesValues : java.util.ArrayList<String> = java.util.ArrayList<String>()

    private var attributeName = StringBuilder()
    private var attributePrefix : String? = null
    private var attributeValue = StringBuilder()

    private var readSingleton = false

    public fun hasNext() : Boolean {
        return bytes.size - index > 2
    }

    public fun getLocalName() : String {
        return tagName
    }

    public fun getAttributeCount() : Int {
        return attributesNames.size()
    }

    public fun getAttributeLocalName(i:Int) : String {
        return attributesNames.get(i)
    }

    public fun getAttributePrefix(i:Int) : String? {
        return attributesPrefixes.get(i)
    }

    public fun getAttributeValue(i:Int) : String {
        return attributesValues.get(i)
    }

    private fun readChar() : Char {
        return ByteConverter.toChar(bytes[++index])
    }

    public fun next() : Int {

        if(readSingleton) {
            readSingleton = false;
            return Token.END_TAG
        }

        if(!hasNext()){return Token.END_DOCUMENT}

        attributesNames.clear()
        attributesPrefixes.clear()
        attributesValues.clear()

        read_lessThan() // trim to the begin of a tag
        currentChar = readChar()//inputStream.read().toChar()

        if(currentChar == '?') { // XML header <?xml version="1.0" encoding="UTF-8"?>
            currentChar = readChar()
            read_xmlHeader()
            return Token.XML_HEADER

        } else if(currentChar == '!') { // XML comment <!-- xml version="1.0" encoding="UTF-8" -->
            do{
                currentChar = readChar()
            }while(currentChar != '>')
            return Token.COMMENT

        } else  if(currentChar == '/') { // XML closing tag </tagname>
            currentChar = readChar()
            read_closingTag()
            return Token.END_TAG
        } else {
            read_openTag()
            if(currentChar == '/') {
                read_upperThan()
                readSingleton = true;
            }
            return Token.START_TAG
        }
    }

    private fun read_lessThan() {
        do{ currentChar = readChar() }while(currentChar!= '<')
    }

    private fun read_upperThan() {
        while(currentChar!= '>') { currentChar = readChar() }
    }

    /**
     * Reads XML header <?xml version="1.0" encoding="UTF-8"?>
     */
    private fun read_xmlHeader() {
        read_tagName()
        read_attributes()
        read_upperThan()
    }


    private fun read_closingTag() {
        read_tagName()
        read_upperThan()
    }

    private fun read_openTag() {
        read_tagName()
        if(currentChar != '>') {
            read_attributes()
        }
    }

    private fun read_tagName() {
        tagName = "" + currentChar
        tagPrefix = null
        currentChar = readChar()
        while(currentChar != ' ' && currentChar != '>') {
            if(currentChar == ':') {
                tagPrefix = tagName
                tagName = ""
            } else {
                tagName += currentChar
            }
            currentChar = readChar()
        }
    }

    private fun read_attributes() {

        var end_of_tag = false

        while(currentChar == ' ') {
            currentChar = readChar()
        }
        while(!end_of_tag) {
            while(currentChar != '=') { // read attributeName and/or prefix
                if(currentChar == ':') {
                    attributePrefix = attributeName.toString()
                    attributeName.delete(0, attributeName.length())
                } else {
                    attributeName.append(currentChar!!)
                }
                currentChar = readChar()
            }
            do{
                currentChar = readChar()
            }while(currentChar != '"')
            currentChar = readChar()
            while(currentChar != '"') { // reading value
                attributeValue.append(currentChar!!)
                currentChar = readChar()
            }

            attributesNames.add(attributeName.toString())
            attributesPrefixes.add(attributePrefix)
            attributesValues.add(attributeValue.toString())
            attributeName.delete(0, attributeName.length())
            attributePrefix = null
            attributeValue.delete(0, attributeValue.length())

            do{//Trim to next attribute
                currentChar = readChar()
                if(currentChar== '?' || currentChar == '/' || currentChar == '-' || currentChar == '>') {
                    end_of_tag = true
                }
            } while(!end_of_tag && currentChar == ' ')



        }

    }

}







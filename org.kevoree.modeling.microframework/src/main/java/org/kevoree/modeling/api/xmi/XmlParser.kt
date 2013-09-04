package org.kevoree.modeling.api.xmi

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



    private var currentChar : Char? = null

    private var xmlVersion : String? = null
    private var xmlCharset : String? = null

    private var tagName : String = ""
    private var tagPrefix : String? = null

    private var attributesNames : java.util.ArrayList<String> = java.util.ArrayList<String>()
    private var attributesPrefixes : java.util.ArrayList<String?> = java.util.ArrayList<String?>()
    private var attributesValues : java.util.ArrayList<String> = java.util.ArrayList<String>()

    public fun hasNext() : Boolean {
        return inputStream.available() > 2
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

    public fun next() : Int {
        if(!hasNext()){return Token.END_DOCUMENT}
        read_lessThan() // trim to the begin of a tag
        currentChar = inputStream.read().toChar()

        if(currentChar == '?') { // XML header <?xml version="1.0" encoding="UTF-8"?>
            currentChar = inputStream.read().toChar()
            read_xmlHeader()
            return Token.XML_HEADER

        } else if(currentChar == '!') { // XML comment <!-- xml version="1.0" encoding="UTF-8" -->
            do{
                currentChar = inputStream.read().toChar()
            }while(currentChar != '>')
            return Token.COMMENT

        } else  if(currentChar == '/') { // XML closing tag </tagname>
            currentChar = inputStream.read().toChar()
            read_closingTag()
            return Token.END_TAG
        } else {
            read_openTag()
            if(currentChar == '/') {
                read_upperThan()
                return Token.SINGLETON_TAG
            }
            return Token.START_TAG
        }
    }

    private fun read_lessThan() {
        do{ currentChar = inputStream.read().toChar() }while(currentChar!= '<')
    }

    private fun read_upperThan() {
        while(currentChar!= '>') { currentChar = inputStream.read().toChar() }
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
        currentChar = inputStream.read().toChar()
        while(currentChar != ' ' && currentChar != '>') {
            if(currentChar == ':') {
                tagPrefix = tagName
                tagName = ""
            } else {
                tagName += currentChar
            }
            currentChar = inputStream.read().toChar()
        }
    }

    private fun read_attributes() {
        var attributeName : String = ""
        var attributePrefix : String? = null
        var attributeValue : String = ""
        var end_of_tag = false
        attributesNames.clear()
        attributesPrefixes.clear()
        attributesValues.clear()


        while(currentChar == ' ') {
            currentChar = inputStream.read().toChar()
        }
        while(!end_of_tag) {
            while(currentChar != '=') { // read attributeName and/or prefix
                if(currentChar == ':') {
                    attributePrefix = attributeName
                    attributeName = ""
                } else {
                    attributeName += currentChar
                }
                currentChar = inputStream.read().toChar()
            }
            do{
                currentChar = inputStream.read().toChar()
            }while(currentChar != '"')
            currentChar = inputStream.read().toChar()
            while(currentChar != '"') { // reading value
                attributeValue += currentChar
                currentChar = inputStream.read().toChar()
            }

            attributesNames.add(attributeName)
            attributesPrefixes.add(attributePrefix)
            attributesValues.add(attributeValue)
            attributeName = ""
            attributePrefix = null
            attributeValue = ""

            do{//Trim to next attribute
                currentChar = inputStream.read().toChar()
                if(currentChar== '?' || currentChar == '/' || currentChar == '-' || currentChar == '>') {
                    end_of_tag = true
                }
            } while(!end_of_tag && currentChar == ' ')



        }

    }

}







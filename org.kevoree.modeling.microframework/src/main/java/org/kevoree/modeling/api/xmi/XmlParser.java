package org.kevoree.modeling.api.xmi;

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 04/09/13
*/

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

public class XmlParser {

    public static enum Token {XML_HEADER, END_DOCUMENT, START_TAG, END_TAG, COMMENT, SINGLETON_TAG}

    private InputStream inputStream;
    private char currentChar;
    private int index;
    private String xmlVersion, xmlCharset, tagName, tagPrefix, attributePrefix;
    private boolean readSingleton = false;

    private ArrayList<String> attributesNames = new ArrayList<String>();
    private ArrayList<String> attributesPrefixes = new ArrayList<String>();
    private ArrayList<String> attributesValues = new ArrayList<String>();

    private StringBuilder attributeName = new StringBuilder();
    private StringBuilder attributeValue = new StringBuilder();


    public XmlParser(InputStream inputStream) {
        this.inputStream = inputStream;
        currentChar = readChar();
    }

    //private val bytes = inputStream.readBytes()


    public String getTagPrefix() {
        return tagPrefix;
    }

    public Boolean hasNext() {
        try {
            read_lessThan();
            return inputStream.available() > 0;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
        //return bytes.size - index > 2;
    }

    public String getLocalName() {
        return tagName;
    }

    public int getAttributeCount() {
        return attributesNames.size();
    }

    public String getAttributeLocalName(int i) {
        return attributesNames.get(i);
    }

    public String getAttributePrefix(int i) {
        return attributesPrefixes.get(i);
    }

    public String getAttributeValue(int i) {
        return attributesValues.get(i);
    }

    private char readChar() {
        try {
            if(inputStream.available() > 0) {
                return (char) inputStream.read();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return '\0';
        //return ByteConverter.toChar(bytes[++index]);
    }

    public Token next() {

        if(readSingleton) {
            readSingleton = false;
            return Token.END_TAG;
        }

        if(!hasNext()){return Token.END_DOCUMENT;}

        attributesNames.clear();
        attributesPrefixes.clear();
        attributesValues.clear();

        read_lessThan(); // trim to the begin of a tag
        currentChar = readChar(); //inputStream.read().toChar()

        if(currentChar == '?') { // XML header <?xml version="1.0" encoding="UTF-8"?>
            currentChar = readChar();
            read_xmlHeader();
            return Token.XML_HEADER;

        } else if(currentChar == '!') { // XML comment <!-- xml version="1.0" encoding="UTF-8" -->
            do{
                currentChar = readChar();
            }while(currentChar != '>');
            return Token.COMMENT;

        } else  if(currentChar == '/') { // XML closing tag </tagname>
            currentChar = readChar();
            read_closingTag();
            return Token.END_TAG;
        } else {
            read_openTag();
            if(currentChar == '/') {
                read_upperThan();
                readSingleton = true;
            }
            return Token.START_TAG;
        }
    }

    private void read_lessThan() {
        while(currentChar != '<' && currentChar != '\0'){ currentChar = readChar(); }
    }

    private void read_upperThan() {
        while(currentChar!= '>') { currentChar = readChar(); }
    }

    /**
     * Reads XML header <?xml version="1.0" encoding="UTF-8"?>
     */
    private void read_xmlHeader() {
        read_tagName();
        read_attributes();
        read_upperThan();
    }


    private void read_closingTag() {
        read_tagName();
        read_upperThan();
    }

    private void read_openTag() {
        read_tagName();
        if(currentChar != '>' && currentChar != '/') {
            read_attributes();
        }
    }

    private void read_tagName() {
        tagName = "" + currentChar;
        tagPrefix = null;
        currentChar = readChar();
        while(currentChar != ' ' && currentChar != '>' && currentChar != '/') {
            if(currentChar == ':') {
                tagPrefix = tagName;
                tagName = "";
            } else {
                tagName += currentChar;
            }
            currentChar = readChar();
        }
    }

    private void read_attributes() {

        boolean end_of_tag = false;

        while(currentChar == ' ') {
            currentChar = readChar();
        }
        while(!end_of_tag) {
            while(currentChar != '=') { // read attributeName and/or prefix
                if(currentChar == ':') {
                    attributePrefix = attributeName.toString();
                    attributeName = new StringBuilder();
                   // attributeName.delete(0, attributeName.length())
                } else {
                    attributeName.append(currentChar);
                }
                currentChar = readChar();
            }
            do{
                currentChar = readChar();
            }while(currentChar != '"');
            currentChar = readChar();
            while(currentChar != '"') { // reading value
                attributeValue.append(currentChar);
                currentChar = readChar();
            }

            attributesNames.add(attributeName.toString());
            attributesPrefixes.add(attributePrefix);
            attributesValues.add(attributeValue.toString());
            attributeName = new StringBuilder();
            //attributeName.delete(0, attributeName.length())
            attributePrefix = null;
            //attributeValue.delete(0, attributeValue.length())
            attributeValue = new StringBuilder();

            do{//Trim to next attribute
                currentChar = readChar();
                if(currentChar== '?' || currentChar == '/' || currentChar == '-' || currentChar == '>') {
                    end_of_tag = true;
                }
            } while(!end_of_tag && currentChar == ' ');

        }

    }

}







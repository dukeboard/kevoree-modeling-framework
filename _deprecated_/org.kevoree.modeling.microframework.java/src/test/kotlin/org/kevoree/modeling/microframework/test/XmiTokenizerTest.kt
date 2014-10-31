/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 04/09/13
*/
package org.kevoree.modeling.microframework.test

import org.junit.Test
import org.kevoree.modeling.api.xmi.XmlParser
import org.kevoree.modeling.api.xmi.XMIModelLoader

public class XmiTokenizerTest {


    Test fun tokenizerTest() {

        val inputStream = this.javaClass.getClassLoader()?.getResourceAsStream("unomas.kev")

        val xmiTokeniser : XmlParser = XmlParser(inputStream!!)

        while(xmiTokeniser.hasNext()) {
            val kind = xmiTokeniser.next()
            println(xmiTokeniser.getLocalName() + "("+kind+") attributeCount:" + xmiTokeniser.getAttributeCount())
        }

    }

    Test fun eofTest() {

        val inputStream = this.javaClass.getClassLoader()?.getResourceAsStream("tiny.kev")

        val xmiTokeniser : XmlParser = XmlParser(inputStream!!)

        while(xmiTokeniser.hasNext()) {
            val kind = xmiTokeniser.next()
            println(xmiTokeniser.getLocalName() + "("+kind+") attributeCount:" + xmiTokeniser.getAttributeCount())
        }

    }

}
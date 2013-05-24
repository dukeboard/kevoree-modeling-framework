package org.kevoree.loader

import java.io.InputStream
import java.io.File

public trait ModelLoader {

    fun loadModelFromString(str: String) : List<Any>?

    fun loadModelFromPath(file: File) : List<Any>?

    fun loadModelFromStream(inputStream: InputStream) : List<Any>?

}
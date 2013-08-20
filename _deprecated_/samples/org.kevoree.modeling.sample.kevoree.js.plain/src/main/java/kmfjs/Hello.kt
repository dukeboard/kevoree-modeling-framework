package kmfjs

import java.io.File
import org.kevoree.ContainerRoot
import org.kevoree.loader.JSONModelLoader
import org.kevoree.loader.ModelLoader
import org.kevoree.serializer.ModelSerializer
import org.kevoree.serializer.JSONModelSerializer

fun main(args: Array<String>) {
    var loader : ModelLoader = JSONModelLoader()
    val root : ContainerRoot = loader.loadModelFromPath(File("/home/leiko/modelAll.json"))?.get(0) as ContainerRoot
    for (item in root.getTypeDefinitions()) {
        println("tdef "+item.getName())
    }

//    var serializer : ModelSerializer = JSONModelSerializer()
//    var file : File = File("/home/leiko/forkedModelAll.json")
//    var fos : FileOutputStream = FileOutputStream(file)
//    serializer.serialize(root, fos)
}
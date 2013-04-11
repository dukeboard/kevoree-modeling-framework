package org.kevoree.factory
class MainFactory {

private var factories : Array<Any> = Array<Any>(1, {i -> Any()});

{
factories.set(Package.ORG_KEVOREE, org.kevoree.impl.DefaultKevoreeFactory())
}
fun getFactoryForPackage( pack : Int) : Any? {
return factories.get(pack)
}
fun getKevoreeFactory() : org.kevoree.KevoreeFactory {
return factories.get(Package.ORG_KEVOREE) as org.kevoree.KevoreeFactory
}

fun setKevoreeFactory( fct : org.kevoree.KevoreeFactory) {
factories.set(Package.ORG_KEVOREE,fct)
}


}

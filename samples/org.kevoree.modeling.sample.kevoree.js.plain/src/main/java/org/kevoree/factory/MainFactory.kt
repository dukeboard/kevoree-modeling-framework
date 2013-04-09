package org.kevoree.factory
class MainFactory {

private var factories : Array<Any> = Array<Any>(Package.values().size, {i -> Any()});

{
factories.set(Package.ORG_KEVOREE.ordinal(), org.kevoree.impl.DefaultKevoreeFactory())
}
fun getFactoryForPackage( pack : Package) : Any? {
return factories.get(pack.ordinal())
}
fun getKevoreeFactory() : org.kevoree.KevoreeFactory {
return factories.get(Package.ORG_KEVOREE.ordinal()) as org.kevoree.KevoreeFactory
}

fun setKevoreeFactory( fct : org.kevoree.KevoreeFactory) {
factories.set(Package.ORG_KEVOREE.ordinal(),fct)
}


}

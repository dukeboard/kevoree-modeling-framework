








package org.kevoree.cloner

class ModelCloner {

    fun clone<A>(o : A) : A? {
        return clone(o,false)
    }

    fun clone<A>(o : A,readOnly : Boolean) : A? {
        return clone(o,readOnly,false)
    }

    fun cloneMutableOnly<A>(o : A,readOnly : Boolean) : A? {
        return clone(o,readOnly,true)
    }

    private fun clone<A>(o : A,readOnly : Boolean,mutableOnly : Boolean) : A? {
        if(o is org.kevoree.ContainerRoot) {
                          val context = java.util.HashMap<Any,Any>()
                         (o as org.kevoree.container.KMFContainer).getClonelazy(context, mainFactory,mutableOnly)
            return (o as org.kevoree.container.KMFContainer).resolve(context,readOnly,mutableOnly) as A
        } else {
            return null
        }
    }
         var mainFactory : org.kevoree.factory.MainFactory = org.kevoree.factory.MainFactory()
              fun setKevoreeFactory(fct : org.kevoree.KevoreeFactory) { mainFactory.setKevoreeFactory(fct)}
         
          
}

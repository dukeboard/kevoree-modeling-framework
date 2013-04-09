


package org.kevoree.container

trait KMFContainerImpl {

    internal open var internal_eContainer : org.kevoree.container.KMFContainer?
    internal open var internal_unsetCmd : (()->Unit)?

    fun eContainer() : org.kevoree.container.KMFContainer? { return internal_eContainer }

    internal open var internal_containmentRefName : String?
    fun setContainmentRefName(name : String?){ internal_containmentRefName = name }

    internal open var internal_readOnlyElem : Boolean

    internal open var internal_recursive_readOnlyElem : Boolean

    open fun setRecursiveReadOnly()

    fun setInternalReadOnly(){
        internal_readOnlyElem = true
    }

    fun isReadOnly() : Boolean {
        return internal_readOnlyElem
    }

    fun isRecursiveReadOnly() : Boolean {
        return internal_recursive_readOnlyElem
    }

    fun setEContainer( container : org.kevoree.container.KMFContainer?, unsetCmd : (()->Unit)? ) {

        if(internal_readOnlyElem){return}

        val tempUnsetCmd = internal_unsetCmd
        internal_unsetCmd = null
        if(tempUnsetCmd != null){
            tempUnsetCmd()
        }
        internal_eContainer = container
        internal_unsetCmd = unsetCmd
    }

}
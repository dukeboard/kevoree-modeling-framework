package org.kevoree.modeling.api.time.blob

/**
 * Created by duke on 6/4/14.
 */

/*
 *  key : path
  * */

class TimeMeta() {

    var versionTree: RBTree = RBTree()

    override fun toString(): String {
        return versionTree.serialize()
    }

    fun load(payload: String) {
        versionTree.unserialize(payload)
    }

}

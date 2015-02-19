package org.kevoree.modeling.api.time;

import org.kevoree.modeling.api.time.rbtree.TreeNode;

/**
 * Created by duke on 6/4/14.
 */

/*
 *  domainKey : path
  * */
/*
public class DefaultTimeTree implements TimeTree {




    @Override
    public Long first() {
        TreeNode firstNode = versionTree.first();
        if (firstNode != null) {
            return firstNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public Long last() {
        TreeNode lastNode = versionTree.last();
        if (lastNode != null) {
            return lastNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public Long next(long from) {
        TreeNode nextNode = versionTree.next(from);
        if (nextNode != null) {
            return nextNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public Long previous(long from) {
        TreeNode previousNode = versionTree.previous(from);
        if (previousNode != null) {
            return previousNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public Long resolve(long time) {
        TreeNode previousNode = versionTree.previousOrEqual(time);
        if (previousNode != null) {
            return previousNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public int size() {
        return versionTree.size();
    }

    @Override
    public String toString() {
        return versionTree.serialize();
    }

    public void load(String payload) throws Exception {
        versionTree.unserialize(payload);
        dirty = false;
    }

}*/

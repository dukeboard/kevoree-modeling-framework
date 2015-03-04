package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.rbtree.IndexRBTree;
import org.kevoree.modeling.api.rbtree.LongRBTree;
import org.kevoree.modeling.api.rbtree.LongTreeNode;

import java.util.ArrayList;

/**
 * Created by duke on 03/03/15.
 */
public class ResolutionHelper {

    public static long resolve_universe(LongRBTree globalTree, LongRBTree objUniverseTree, long timeToResolve, long universeId) {
        if (globalTree == null) {
            return universeId;
        }
        LongTreeNode currentUniverseNode = globalTree.lookup(universeId);
        if (currentUniverseNode == null) {
            return universeId;
        }
        LongTreeNode resolved = objUniverseTree.lookup(universeId);
        while (resolved == null && currentUniverseNode.key != currentUniverseNode.value) {
            currentUniverseNode = globalTree.lookup(currentUniverseNode.value);
            resolved = objUniverseTree.lookup(currentUniverseNode.key);
        }
        if (resolved == null) {
            return universeId;
        }
        while (resolved != null && resolved.value > timeToResolve && resolved.key != resolved.value) {
            LongTreeNode resolvedCurrent = globalTree.lookup(resolved.key);
            resolved = objUniverseTree.lookup(resolvedCurrent.value);
            while (resolved == null && resolvedCurrent != null && resolvedCurrent.key != resolvedCurrent.value) {
                resolved = objUniverseTree.lookup(resolvedCurrent.value);
                resolvedCurrent = globalTree.lookup(resolvedCurrent.value);
            }
            if(resolvedCurrent.key == resolvedCurrent.value) {
                break;
            }
        }
        if (resolved != null) {
            return resolved.key;
        } else {
            return universeId;
        }
    }

    /*
    public static IndexRBTree[] resolve_times(LongRBTree globalTree, LongRBTree objUniverseTree, long timeStart, long timeEnd, long currentUniverse) {
        if (globalTree == null) {
            return new IndexRBTree[0];
        }
        LongTreeNode currentUniverseNode = globalTree.lookup(currentUniverse);
        if (currentUniverseNode == null) {
            return new IndexRBTree[0];
        }
        LongTreeNode resolved = objUniverseTree.lookup(currentUniverse);
        ArrayList<LongTreeNode> collectedUniverse = new ArrayList<LongTreeNode>();
        if (resolved != null) {
            collectedUniverse.add(resolved);
        }
        while (currentUniverseNode.key != currentUniverseNode.value) {
            currentUniverseNode = globalTree.lookup(currentUniverseNode.value);
            resolved = objUniverseTree.lookup(currentUniverseNode.key);
        }

        LongTreeNode resolved = objUniverseTree.lookup(currentUniverse);
        while (resolved == null && currentUniverseNode.key != currentUniverseNode.value) {
            currentUniverseNode = globalTree.lookup(currentUniverseNode.value);
            resolved = objUniverseTree.lookup(currentUniverseNode.key);
        }

        //
        return null;
    }*/

}

package org.kevoree.modeling.memory.manager.impl;

import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.memory.cache.KCache;
import org.kevoree.modeling.memory.struct.map.KLongLongHashMap;
import org.kevoree.modeling.memory.struct.segment.impl.HeapMemorySegment;
import org.kevoree.modeling.memory.struct.map.impl.ArrayLongLongHashMap;
import org.kevoree.modeling.memory.struct.tree.KLongTree;

public class ResolutionHelper {

    public static MemorySegmentResolutionTrace resolve_trees(long universe, long time, long uuid, KCache cache) {
        MemorySegmentResolutionTrace result = new MemorySegmentResolutionTrace();
        KLongLongHashMap objectUniverseTree = (KLongLongHashMap) cache.get(KConfig.NULL_LONG, KConfig.NULL_LONG, uuid);
        KLongLongHashMap globalUniverseOrder = (KLongLongHashMap) cache.get(KConfig.NULL_LONG, KConfig.NULL_LONG, KConfig.NULL_LONG);
        result.setUniverseTree(objectUniverseTree);
        long resolvedUniverse = resolve_universe(globalUniverseOrder, objectUniverseTree, time, universe);
        result.setUniverse(resolvedUniverse);
        KLongTree timeTree = (KLongTree) cache.get(resolvedUniverse, KConfig.NULL_LONG, uuid);
        if (timeTree != null) {
            result.setTimeTree(timeTree);
            long resolvedTime = timeTree.previousOrEqual(time);
            result.setTime(resolvedTime);
            result.setSegment((HeapMemorySegment) cache.get(resolvedUniverse, resolvedTime, uuid));
        }
        return result;
    }

    public static long resolve_universe(KLongLongHashMap globalTree, KLongLongHashMap objUniverseTree, long timeToResolve, long originUniverseId) {
        if (globalTree == null || objUniverseTree == null) {
            return originUniverseId;
        }
        long currentUniverse = originUniverseId;
        long previousUniverse = KConfig.NULL_LONG;
        long divergenceTime = objUniverseTree.get(currentUniverse);
        while (currentUniverse != previousUniverse) {
            //check range
            if (divergenceTime != KConfig.NULL_LONG && divergenceTime <= timeToResolve) {
                return currentUniverse;
            }
            //next round
            previousUniverse = currentUniverse;
            currentUniverse = globalTree.get(currentUniverse);
            divergenceTime = objUniverseTree.get(currentUniverse);
        }
        return originUniverseId;
    }

    public static long[] universeSelectByRange(KLongLongHashMap globalTree, KLongLongHashMap objUniverseTree, long rangeMin, long rangeMax, long originUniverseId) {
        ArrayLongLongHashMap collected = new ArrayLongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        long currentUniverse = originUniverseId;
        long previousUniverse = KConfig.NULL_LONG;
        long divergenceTime = objUniverseTree.get(currentUniverse);
        while (currentUniverse != previousUniverse) {
            //check range
            if (divergenceTime != KConfig.NULL_LONG) {
                if (divergenceTime <= rangeMin) {
                    collected.put(collected.size(), currentUniverse);
                    break;
                } else if (divergenceTime <= rangeMax) {
                    collected.put(collected.size(), currentUniverse);
                }
            }
            //next round
            previousUniverse = currentUniverse;
            currentUniverse = globalTree.get(currentUniverse);
            divergenceTime = objUniverseTree.get(currentUniverse);
        }
        long[] trimmed = new long[collected.size()];
        for (long i = 0; i < collected.size(); i++) {
            trimmed[(int) i] = collected.get(i);
        }
        return trimmed;
    }

}

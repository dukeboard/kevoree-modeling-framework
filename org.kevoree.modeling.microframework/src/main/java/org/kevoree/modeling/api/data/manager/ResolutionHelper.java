package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.data.KCache;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.rbtree.KLongTree;

public class ResolutionHelper {

    public static ResolutionResult resolve_trees(long universe, long time, long uuid, KCache cache) {
        ResolutionResult result = new ResolutionResult();
        LongLongHashMap objectUniverseTree = (LongLongHashMap) cache.get(KConfig.NULL_LONG, KConfig.NULL_LONG, uuid);
        LongLongHashMap globalUniverseOrder = (LongLongHashMap) cache.get(KConfig.NULL_LONG, KConfig.NULL_LONG, KConfig.NULL_LONG);
        result.universeTree = objectUniverseTree;
        long resolvedUniverse = resolve_universe(globalUniverseOrder, objectUniverseTree, time, universe);
        result.universe = resolvedUniverse;
        KLongTree timeTree = (KLongTree) cache.get(resolvedUniverse, KConfig.NULL_LONG, uuid);
        if (timeTree != null) {
            result.timeTree = timeTree;
            long resolvedTime = timeTree.previousOrEqual(time);
            result.time = resolvedTime;
            result.entry = (KCacheEntry) cache.get(resolvedUniverse, resolvedTime, uuid);
        }
        result.uuid = uuid;
        return result;
    }

    public static long resolve_universe(LongLongHashMap globalTree, LongLongHashMap objUniverseTree, long timeToResolve, long originUniverseId) {
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

    public static long[] universeSelectByRange(LongLongHashMap globalTree, LongLongHashMap objUniverseTree, long rangeMin, long rangeMax, long originUniverseId) {
        LongLongHashMap collected = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
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

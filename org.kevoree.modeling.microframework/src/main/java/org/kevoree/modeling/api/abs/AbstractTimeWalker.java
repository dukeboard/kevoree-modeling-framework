package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KTimeWalker;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.manager.DefaultKDataManager;
import org.kevoree.modeling.api.data.manager.ResolutionHelper;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.rbtree.IndexRBTree;
import org.kevoree.modeling.api.rbtree.TreeNode;

public class AbstractTimeWalker implements KTimeWalker {

    public AbstractTimeWalker(KObject p_origin) {
        this._origin = p_origin;
    }

    private KObject _origin = null;

    private KDefer<long[]> internal_times(final long start, final long end) {
        final AbstractKDeferWrapper<long[]> wrapper = new AbstractKDeferWrapper<long[]>();
        KContentKey[] keys = new KContentKey[2];
        keys[0] = KContentKey.createGlobalUniverseTree();
        keys[1] = KContentKey.createUniverseTree(_origin.uuid());
        final DefaultKDataManager manager = (DefaultKDataManager) _origin.view().universe().model().manager();
        manager.bumpKeysToCache(keys, new Callback<KCacheObject[]>() {
            @Override
            public void on(KCacheObject[] kCacheObjects) {
                final LongLongHashMap objUniverse = (LongLongHashMap) kCacheObjects[1];
                if (kCacheObjects[0] == null || kCacheObjects[1] == null) {
                    wrapper.initCallback().on(null);
                } else {
                    final long[] collectedUniverse = ResolutionHelper.universeSelectByRange((LongLongHashMap) kCacheObjects[0], (LongLongHashMap) kCacheObjects[1], start, end, _origin.universe().key());
                    KContentKey[] timeTreeToLoad = new KContentKey[collectedUniverse.length];
                    for (int i = 0; i < collectedUniverse.length; i++) {
                        timeTreeToLoad[i] = KContentKey.createTimeTree(collectedUniverse[i], _origin.uuid());
                    }
                    manager.bumpKeysToCache(timeTreeToLoad, new Callback<KCacheObject[]>() {
                        @Override
                        public void on(KCacheObject[] timeTrees) {
                            LongLongHashMap collector = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
                            long previousDivergenceTime = end;
                            for (int i = 0; i < collectedUniverse.length; i++) {
                                IndexRBTree timeTree = (IndexRBTree) timeTrees[i];
                                if (timeTree != null) {
                                    long currentDivergenceTime = objUniverse.get(collectedUniverse[i]);
                                    TreeNode initNode;
                                    if (i == 0) { //first iteration, right side inclusive
                                        initNode = timeTree.previousOrEqual(previousDivergenceTime);
                                    } else {
                                        initNode = timeTree.previous(previousDivergenceTime);
                                    }
                                    while (initNode != null && initNode.getKey() >= currentDivergenceTime) {
                                        collector.put(collector.size(), initNode.getKey());
                                        initNode = initNode.previous();
                                    }
                                    previousDivergenceTime = currentDivergenceTime;
                                }
                            }
                            long[] orderedTime = new long[collector.size()];
                            for (int i = 0; i < collector.size(); i++) {
                                orderedTime[i] = collector.get(i);
                            }
                            wrapper.initCallback().on(orderedTime);
                        }
                    });
                }
            }
        });
        return wrapper;
    }

    @Override
    public KDefer<long[]> allTimes() {
        return internal_times(KConfig.BEGINNING_OF_TIME, KConfig.END_OF_TIME);
    }

    @Override
    public KDefer<long[]> timesBefore(long endOfSearch) {
        return internal_times(KConfig.BEGINNING_OF_TIME, endOfSearch);
    }

    @Override
    public KDefer<long[]> timesAfter(long beginningOfSearch) {
        return internal_times(beginningOfSearch, KConfig.END_OF_TIME);
    }

    @Override
    public KDefer<long[]> timesBetween(long beginningOfSearch, long endOfSearch) {
        return internal_times(beginningOfSearch, endOfSearch);
    }

}
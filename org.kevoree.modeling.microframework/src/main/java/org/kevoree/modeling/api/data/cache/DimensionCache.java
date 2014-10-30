package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.time.DefaultTimeTree;
import org.kevoree.modeling.api.time.TimeTree;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by duke on 10/30/14.
 */
public class DimensionCache {
    public Map<Long, TimeTree> timeTreeCache = new HashMap<Long, TimeTree>();
    public Map<Long, TimeCache> timesCaches = new HashMap<Long, TimeCache>();
    public KDimension dimension;
    public TimeTree rootTimeTree = new DefaultTimeTree();
    public List<ModelListener> listeners = new ArrayList<ModelListener>();

    public DimensionCache(KDimension dimension) {
        this.dimension = dimension;
    }
}

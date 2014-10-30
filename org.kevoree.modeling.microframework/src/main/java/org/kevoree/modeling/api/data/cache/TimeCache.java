package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by duke on 10/30/14.
 */
public class TimeCache {
    public Map<Long, KObject> obj_cache = new HashMap<Long, KObject>();
    public Map<Long, Object[]> payload_cache = new HashMap<Long, Object[]>();
    public KObject root = null;
    public boolean rootDirty = false;
    public List<ModelListener> listeners = new ArrayList<ModelListener>();
    public Map<Long, List<ModelListener>> obj_listeners = new HashMap<Long, List<ModelListener>>();
}

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
    public Map<Long, Object[]> payload_cache = new HashMap<Long, Object[]>();
    public KObject root = null;
    public boolean rootDirty = false;
}

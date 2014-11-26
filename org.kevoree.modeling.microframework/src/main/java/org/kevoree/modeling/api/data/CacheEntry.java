package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.time.TimeTree;

/**
 * Created by duke on 26/11/14.
 */
public class CacheEntry {

    public TimeTree timeTree;

    public MetaClass metaClass;

    public Object[] raw;

}

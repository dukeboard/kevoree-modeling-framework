package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KModelAttributeVisitor;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.map.StringHashMap;

import java.util.ArrayList;

class SerializationContext {
    public boolean ignoreGeneratedID = false;
    public KObject model;
    public Callback<String> finishCallback;
    public StringBuilder printer;
    public KModelAttributeVisitor attributesVisitor;

    // KPath -> XMIPath
    LongHashMap<String> addressTable = new LongHashMap<String>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
    // KPath -> Count
    StringHashMap<Integer> elementsCount = new StringHashMap<Integer>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);

    ArrayList<String> packageList = new ArrayList<String>();

}
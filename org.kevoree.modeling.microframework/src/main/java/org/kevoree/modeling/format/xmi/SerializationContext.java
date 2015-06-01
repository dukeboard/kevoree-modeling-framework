package org.kevoree.modeling.format.xmi;

import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.KModelAttributeVisitor;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.memory.struct.map.LongHashMap;
import org.kevoree.modeling.memory.struct.map.StringHashMap;

import java.util.ArrayList;

public class SerializationContext {
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
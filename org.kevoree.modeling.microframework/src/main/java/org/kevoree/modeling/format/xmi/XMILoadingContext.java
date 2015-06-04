package org.kevoree.modeling.format.xmi;

import org.kevoree.modeling.KCallback;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.memory.struct.map.impl.ArrayStringHashMap;

import java.util.ArrayList;

/**
 * Created by duke on 10/27/14.
 */
public class XMILoadingContext {

    public XmlParser xmiReader;

    public KObject loadedRoots = null;

    public ArrayList<XMIResolveCommand> resolvers = new ArrayList<XMIResolveCommand>();

    public ArrayStringHashMap<KObject> map = new ArrayStringHashMap<KObject>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);

    public ArrayStringHashMap<Integer> elementsCount = new ArrayStringHashMap<Integer>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);

    public KCallback<Throwable> successCallback;

}

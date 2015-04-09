package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.map.StringHashMap;

import java.util.ArrayList;

/**
 * Created by duke on 10/27/14.
 */
public class XMILoadingContext {

    public XmlParser xmiReader;

    public KObject loadedRoots = null;

    public ArrayList<XMIResolveCommand> resolvers = new ArrayList<XMIResolveCommand>();

    public StringHashMap<KObject> map = new StringHashMap<KObject>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);

    public StringHashMap<Integer> elementsCount = new StringHashMap<Integer>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);

    public Callback<Throwable> successCallback;

}

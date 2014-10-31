package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by duke on 10/27/14.
 */
public class XMILoadingContext {

    public XmlParser xmiReader;

    public KObject loadedRoots = null;
    public ArrayList<XMIResolveCommand> resolvers = new ArrayList<XMIResolveCommand>();

    public HashMap<String, KObject> map = new HashMap<String, KObject>();

    public HashMap<String, Integer> elementsCount = new HashMap<String, Integer>();
    public HashMap<String, Integer> stats = new HashMap<String, Integer>();
    public HashMap<String, Boolean> oppositesAlreadySet = new HashMap<String, Boolean>();

    public Callback<Throwable> successCallback;

    public Boolean isOppositeAlreadySet(String localRef, String oppositeRef) {
        return (oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null));
    }

    public void storeOppositeRelation(String localRef, String oppositeRef) {
        oppositesAlreadySet.put(localRef + "_" + oppositeRef, true);
    }

}

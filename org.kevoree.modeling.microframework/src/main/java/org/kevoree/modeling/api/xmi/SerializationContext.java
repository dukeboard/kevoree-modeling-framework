package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;

import java.io.PrintStream;
import java.util.ArrayList;
import java.util.HashMap;

class SerializationContext {
    public boolean ignoreGeneratedID = false;
    public KObject model;
    public Callback<Throwable> finishCallback;
    public PrintStream printStream;
    public AttributesVisitor attributesVisitor;

    // KPath -> XMIPath
    HashMap<Long, String> addressTable = new HashMap<Long, String>();
    // KPath -> Count
    HashMap<String, Integer> elementsCount = new HashMap<String, Integer>();
    ArrayList<String> packageList = new ArrayList<String>();
}
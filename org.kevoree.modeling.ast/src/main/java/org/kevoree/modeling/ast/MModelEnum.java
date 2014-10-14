package org.kevoree.modeling.ast;

import java.util.*;

/**
 * Created by gregory.nain on 14/10/2014.
 */
public class MModelEnum  extends MModelClassifier{

    private String name;
    private String pack = null;
    private SortedSet<String> litterals = new TreeSet<>();

    public MModelEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getPack() {
        return pack;
    }

    public void setPack(String pack) {
        this.pack = pack;
    }

    public String getFqn() {
        return (pack != null ? pack+"."+name:name);
    }

    public void addLitteral(String lit) {
        litterals.add(lit);
    }

    public SortedSet<String> getLitterals() {
        return litterals;
    }



}

package org.kevoree.modeling.ast;

import java.util.*;

/**
 * Created by gregory.nain on 14/10/2014.
 */
public class MModelClass extends MModelClassifier{

    private String name;
    private String pack = null;

    private ArrayList<MModelAttribute> attributes = new ArrayList<>();
    private ArrayList<MModelReference> references = new ArrayList<>();
    private List<MModelClass> parents = new ArrayList<>();

    public MModelClass(String name) {
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

    public void addAttribute(MModelAttribute att) {
        attributes.add(att);
    }

    public ArrayList<MModelAttribute> getAttributes() {
        return attributes;
    }
    public void sortAttributes() {
        attributes.sort((o1,o2)->o1.getName().compareTo(o2.getName()));
    }

    public void addReference(MModelReference ref) {
        references.add(ref);
    }

    public ArrayList<MModelReference> getReferences() {
        return references;
    }
    public void sortReferences() {
        references.sort((o1,o2)->o1.getName().compareTo(o2.getName()));
    }


    public void addParent(MModelClass cls) {
        parents.add(cls);
    }

    public List<MModelClass> getParents() {
        return parents;
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof MModelClass && this.getFqn().equals(((MModelClass)obj).getFqn());
    }
}

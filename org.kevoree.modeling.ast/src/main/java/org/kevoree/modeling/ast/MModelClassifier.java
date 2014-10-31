package org.kevoree.modeling.ast;

/**
 * Created by gregory.nain on 14/10/2014.
 */
public abstract class MModelClassifier {

    protected String name;
    protected String pack = null;

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

    @Override
    public boolean equals(Object obj) {
        return this.getClass().isAssignableFrom(obj.getClass()) && this.getFqn().equals(((MModelClassifier)obj).getFqn());
    }

}

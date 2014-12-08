package org.kevoree.modeling.ast;

/**
 * Created by gregory.nain on 14/10/2014.
 */
public class MModelReference {

    private String name;
    private MModelClass type;
    private MModelReference opposite = null;

    private Integer index = -1;

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    private boolean contained = false;

    private boolean single = false;

    public MModelReference(String name, MModelClass type) {
        this.name = name;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public MModelClass getType() {
        return type;
    }

    public boolean isContained() {
        return contained;
    }

    public void setContained(boolean contained) {
        this.contained = contained;
    }

    public boolean isSingle() {
        return single;
    }

    public void setSingle(boolean single) {
        this.single = single;
    }

    public MModelReference getOpposite() {
        return opposite;
    }

    public void setOpposite(MModelReference opposite) {
        this.opposite = opposite;
    }


    @Override
    public boolean equals(Object o) {
        return o instanceof MModelReference && name.equals(((MModelReference) o).name);
    }

}

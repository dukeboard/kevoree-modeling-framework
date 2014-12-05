package org.kevoree.modeling.ast;

import java.util.*;

/**
 * Created by gregory.nain on 14/10/2014.
 */
public class MModelClass extends MModelClassifier{

    private ArrayList<MModelAttribute> attributes = new ArrayList<>();
    private ArrayList<MModelReference> references = new ArrayList<>();
    private ArrayList<MModelClass> parents = new ArrayList<>();
    private ArrayList<MModelOperation> operations = new ArrayList<>();

    public MModelClass(String name) {
        this.name = name;
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

    public ArrayList<MModelOperation> getOperations() {
        return operations;
    }

    public void addOperation(MModelOperation operation) {
        this.operations.add(operation);
    }
    public void sortOperations() {
        operations.sort((o1,o2)->o1.getName().compareTo(o2.getName()));
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Class[name:");
        sb.append(getName());
        sb.append(", package:");
        sb.append(getPack());
        sb.append(", parent:");
        sb.append(getParents());
        sb.append(", attributes[");
        for(MModelAttribute att : attributes) {
            sb.append(att.getName());
            sb.append(":");
            sb.append(att.getType());
            sb.append(", ");
        }
        sb.append("]");
        sb.append(", references:[");
        for(MModelReference att : references) {
            sb.append(att.getName());
            sb.append(":");
            sb.append(att.getType().getName());
            if(att.getOpposite() != null) {
                sb.append("->");
                sb.append(att.getOpposite().getName());
                sb.append(":");
                sb.append(att.getOpposite().getType().getFqn());
            }
            sb.append(", ");
        }
        sb.append("]]");
        return sb.toString();
    }
}

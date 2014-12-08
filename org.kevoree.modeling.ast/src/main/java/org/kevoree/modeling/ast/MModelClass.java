package org.kevoree.modeling.ast;

import java.util.*;

/**
 * Created by gregory.nain on 14/10/2014.
 */
public class MModelClass extends MModelClassifier {

    private Map<String, MModelAttribute> attributes = new HashMap<String, MModelAttribute>();
    private Map<String, MModelReference> references = new HashMap<String, MModelReference>();
    private Map<String, MModelClass> parents = new HashMap<String, MModelClass>();
    private Map<String, MModelOperation> operations = new HashMap<String, MModelOperation>();

    public MModelClass(String name) {
        this.name = name;
    }

    public void addAttribute(MModelAttribute att) {
        attributes.put(att.getName(), att);
    }

    public Collection<MModelAttribute> getAttributes() {
        HashMap<String, MModelAttribute> collected = new HashMap<String, MModelAttribute>();


        return attributes.values();
    }

    public void addReference(MModelReference ref) {
        references.put(ref.getName(), ref);
    }

    public Collection<MModelReference> getReferences() {
        return references.values();
    }

    public void addParent(MModelClass cls) {
        parents.put(cls.getName(), cls);
    }

    public Collection<MModelClass> getParents() {
        return parents.values();
    }

    public Collection<MModelOperation> getOperations() {
        return operations.values();
    }

    public void addOperation(MModelOperation operation) {
        this.operations.put(operation.getName(), operation);
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
        for (MModelAttribute att : attributes.values()) {
            sb.append(att.getName());
            sb.append(":");
            sb.append(att.getType());
            sb.append(", ");
        }
        sb.append("]");
        sb.append(", references:[");
        for (MModelReference att : references.values()) {
            sb.append(att.getName());
            sb.append(":");
            sb.append(att.getType().getName());
            if (att.getOpposite() != null) {
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

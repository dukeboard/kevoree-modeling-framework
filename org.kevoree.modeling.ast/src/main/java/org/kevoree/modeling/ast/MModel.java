package org.kevoree.modeling.ast;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

/**
 * Created by duke on 11/21/14.
 */
public class MModel {

    private HashMap<String, MModelClassifier> classifiers = new HashMap<>();

    public Collection<MModelClassifier> getClassifiers() {
        return classifiers.values();
    }

    public MModelClassifier get(String fqn) {
        return classifiers.get(fqn);
    }

    public void addClassifier(MModelClassifier classifier) {
        classifier.setIndex(classifiers.size());
        classifiers.put(classifier.getFqn(), classifier);
    }

    public Collection<MModelClass> getClasses() {
        ArrayList<MModelClass> classes = new ArrayList<MModelClass>();
        for(MModelClassifier cls : classifiers.values()) {
            if(cls instanceof MModelClass) {
                classes.add((MModelClass)cls);
            }
        }
        return classes;

    }
}

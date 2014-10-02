package org.kevoree.modeling.api;

import java.util.HashMap;

public abstract class ModelVisitor {

    boolean visitStopped = false;

    public void stopVisit() {
        visitStopped = true;
    }

    boolean visitChildren = true;

    boolean visitReferences = true;

    public void noChildrenVisit() {
        visitChildren = false;
    }

    public void noReferencesVisit() {
        visitReferences = false;
    }

    public abstract void visit(KObject elem, String refNameInParent, KObject parent);

    protected HashMap<String, KObject> alreadyVisited = null;

    public void beginVisitElem(KObject elem) {

    }

    public void endVisitElem(KObject elem) {

    }

    public boolean beginVisitRef(String refName, String refType) {
        return true;
    }

    public void endVisitRef(String refName) {

    }

}
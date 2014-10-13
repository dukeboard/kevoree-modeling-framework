package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaReference;

public abstract class ModelVisitor {

    public abstract void visit(KObject elem, MetaReference currentReference, KObject parent, Callback<Boolean> continueVisit) throws Throwable;

    public void beginVisitElem(KObject elem, Callback<Boolean> continueVisit, Callback<Boolean> skipElem) {
        continueVisit.on(true);
    }

    public void endVisitElem(KObject elem, Callback<Boolean> continueVisit) {
        continueVisit.on(true);
    }

    public boolean beginVisitRef(MetaReference currentreference, Callback<Boolean> continueVisit, Callback<Boolean> skipElem) {
        return true;
    }

    public void endVisitRef(String refName, Callback<Boolean> continueVisit) {

    }

}
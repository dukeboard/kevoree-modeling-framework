package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaReference;

public abstract class ModelVisitor {

    public abstract void visit(KObject elem, MetaReference currentReference, KObject parent, Callback<Throwable> continueVisit);

    public void beginVisitElem(KObject elem, Callback<Throwable> continueVisit, Callback<Boolean> skipElem) {
        continueVisit.on(null);
    }

    public void endVisitElem(KObject elem, Callback<Throwable> continueVisit) {
        continueVisit.on(null);
    }

    public void beginVisitRef(MetaReference currentreference, Callback<Throwable> continueVisit, Callback<Boolean> skipElem) {
        continueVisit.on(null);
    }

    public void endVisitRef(String refName, Callback<Throwable> continueVisit) {
        continueVisit.on(null);
    }

}
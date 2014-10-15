package org.kevoree.modeling.api;

import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.trace.ModelTrace;

import java.util.List;

/**
 * Created by thomas on 10/2/14.
 */
public interface KObject<A extends KObject, B extends KView> {

    public boolean isDeleted();

    public boolean isRoot();

    public String path();

    public KDimension dimension();

    public B factory();

    public void delete(Callback<Boolean> callback);

    public void parent(Callback<KObject> callback);

    public String parentPath();

    public boolean modelEquals(A similarObj);

    public void deepModelEquals(A similarObj, Callback<Boolean> callback);

    public void findByID(String relationName, String idP, Callback<KObject> callback);

    public void select(String query, Callback<List<KObject>> callback);

    public void stream(String query, Callback<KObject> callback);

    /* Listener management */
    public void addModelElementListener(ModelElementListener lst);

    public void removeModelElementListener(ModelElementListener lst);

    public void removeAllModelElementListeners();

    public void addModelTreeListener(ModelElementListener lst);

    public void removeModelTreeListener(ModelElementListener lst);

    public void removeAllModelTreeListeners();
    /* End Listener management */

    /* Visit API */
    public void visitNotContained(ModelVisitor visitor, Callback<Throwable> end);

    public void visitContained(ModelVisitor visitor, Callback<Throwable> end);

    public void visitAll(ModelVisitor visitor, Callback<Throwable> end);

    public void deepVisitNotContained(ModelVisitor visitor, Callback<Throwable> end);

    public void deepVisitContained(ModelVisitor visitor, Callback<Throwable> end);

    public void deepVisitAll(ModelVisitor visitor, Callback<Throwable> end);

    public void visitAttributes(ModelAttributeVisitor visitor);
    /* End Visit API */

    /* Time navigation */
    public long now();

    public void jump(Long time, Callback<A> callback);

    public TimeTree timeTree();

    /* Reflexive API */
    public MetaReference referenceInParent();

    public String key();

    public MetaClass metaClass();

    public MetaAttribute[] metaAttributes();

    public MetaReference[] metaReferences();

    public void mutate(KActionType actionType, MetaReference metaReference, KObject param, boolean setOpposite, boolean fireEvent, Callback<Boolean> callback);

    public <C extends KObject> void each(MetaReference metaReference, Callback<C> callback, Callback<Throwable> end);

    /* End Reflexive API */

    /* Powerful Trace API, maybe consider to hide TODO */
    public List<ModelTrace> createTraces(A similarObj, boolean isInter, boolean isMerge, boolean onlyReferences, boolean onlyAttributes);

    public List<ModelTrace> toTraces(boolean attributes, boolean references);
    /* end to clean zone TODO */

    public Object get(MetaAttribute attribute);

}

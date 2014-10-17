package org.kevoree.modeling.api;

import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.trace.ModelTrace;

import java.util.List;
import java.util.Set;

/**
 * Created by thomas on 10/2/14.
 */
public interface KObject<A extends KObject, B extends KView> {

    public KDimension dimension();

    public boolean isDeleted();

    public boolean isRoot();

    public long kid();

    public String path();

    public B factory();

    public void delete(Callback<Boolean> callback);

    public void parent(Callback<KObject> callback);

    public Long parentKID();

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
    public void visitAttributes(ModelAttributeVisitor visitor);

    public void visit(ModelVisitor visitor, Callback<Throwable> end);

    public void graphVisit(ModelVisitor visitor, Callback<Throwable> end);

    public void treeVisit(ModelVisitor visitor, Callback<Throwable> end);
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

    public MetaAttribute metaAttribute(String name);

    public MetaReference metaReference(String name);

    public void mutate(KActionType actionType, MetaReference metaReference, KObject param, boolean setOpposite, boolean fireEvent);

    public <C extends KObject> void each(MetaReference metaReference, Callback<C> callback, Callback<Throwable> end);

    public void inbounds(Callback<InboundReference> callback, Callback<Throwable> end);

    /* End Reflexive API */
    public enum TraceRequest {
        ATTRIBUTES_ONLY, REFERENCES_ONLY, ATTRIBUTES_REFERENCES
    }

    public List<ModelTrace> traces(TraceRequest request);

    public Object get(MetaAttribute attribute);

    public void set(MetaAttribute attribute, Object payload, boolean fireEvents);

    public String toJSON();

}

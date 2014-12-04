package org.kevoree.modeling.api;

import org.kevoree.modeling.api.event.ListenerScope;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;

/**
 * Created by thomas on 10/2/14.
 */
public interface KObject<A extends KObject, B extends KView> {

    public KDimension dimension();

    public boolean isRoot();

    public long uuid();

    public void path(Callback<String> callback);

    public B view();

    public void delete(Callback<Throwable> callback);

    public void parent(Callback<KObject> callback);

    public Long parentUuid();

    public void select(String query, Callback<KObject[]> callback);

    public void stream(String query, Callback<KObject> callback);

    public void listen(ModelListener listener, ListenerScope scope);

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

    public String domainKey();

    public MetaClass metaClass();

    public MetaAttribute[] metaAttributes();

    public MetaReference[] metaReferences();

    public MetaOperation[] metaOperations();

    public MetaAttribute metaAttribute(String name);

    public MetaReference metaReference(String name);

    public MetaOperation metaOperation(String name);

    //TODO drop setOpposite
    public void mutate(KActionType actionType, MetaReference metaReference, KObject param, boolean setOpposite);

    public <C extends KObject> void each(MetaReference metaReference, Callback<C> callback, Callback<Throwable> end);

    //TODO refactor
    public void inbounds(Callback<InboundReference> callback, Callback<Throwable> end);

    /* End Reflexive API */

    public ModelTrace[] traces(TraceRequest request);

    public Object get(MetaAttribute attribute);

    public void set(MetaAttribute attribute, Object payload);

    public String toJSON();

    public boolean equals(Object other);

    /* Model operations */
    public void diff(KObject target, Callback<TraceSequence> callback);

    public void merge(KObject target, Callback<TraceSequence> callback);

    public void intersection(KObject target, Callback<TraceSequence> callback);

    public void clone(Callback<A> callback);

}

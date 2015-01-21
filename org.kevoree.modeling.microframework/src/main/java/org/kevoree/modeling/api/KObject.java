package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversal;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;

/**
 * Created by thomas on 10/2/14.
 */
public interface KObject {

    public KUniverse universe();

    public boolean isRoot();

    public long uuid();

    public void path(Callback<String> callback);

    public KView view();

    public void delete(Callback<Throwable> callback);

    public void parent(Callback<KObject> callback);

    public Long parentUuid();

    public void select(String query, Callback<KObject[]> callback);

    public void listen(ModelListener listener);

    /* Visit API */
    public void visitAttributes(ModelAttributeVisitor visitor);

    public void visit(ModelVisitor visitor, Callback<Throwable> end, VisitRequest request);

    /* End Visit API */

    /* Time navigation */
    public long now();

    public TimeTree timeTree();

    /* Reflexive API */
    public MetaReference referenceInParent();

    public String domainKey();

    public MetaClass metaClass();

    public void mutate(KActionType actionType, MetaReference metaReference, KObject param);

    public void all(MetaReference metaReference, Callback<KObject[]> callback);

    public KTraversal traverse(MetaReference metaReference);

    public void inbounds(Callback<KObject[]> callback);

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

    public void slice(Callback<TraceSequence> callback);

    public <U extends KObject> void jump(long time, final Callback<U> callback);

    public MetaReference[] referencesWith(KObject o);

    public KTask<String> taskPath();

    public KTask<Throwable> taskDelete();

    public KTask<KObject> taskParent();

    public KTask<KObject[]> taskSelect(String query);

    public KTask<KObject[]> taskAll(MetaReference metaReference);

    public KTask<KObject[]> taskInbounds();

    public KTask<TraceSequence> taskDiff(KObject target);

    public KTask<TraceSequence> taskMerge(KObject target);

    public KTask<TraceSequence> taskIntersection(KObject target);

    public KTask<TraceSequence> taskSlice();

    public <U extends KObject> KTask<U> taskJump(long time);

    public KTask<Throwable> taskVisit(ModelVisitor visitor, VisitRequest request);

}

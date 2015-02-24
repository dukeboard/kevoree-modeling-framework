package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.TimeWalker;
import org.kevoree.modeling.api.rbtree.LongRBTree;
import org.kevoree.modeling.api.traversal.KTraversal;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;

/**
 * Created by thomas on 10/2/14.
 */
public interface KObject {

    public KUniverse universe();

    public long uuid();

    public KDefer<String> path();

    public KView view();

    public KDefer<Throwable> delete();

    public KDefer<KObject> parent();

    public Long parentUuid();

    public KDefer<KObject[]> select(String query);

    public void listen(KEventListener listener);

    public void visitAttributes(ModelAttributeVisitor visitor);

    public KDefer<Throwable> visit(ModelVisitor visitor, VisitRequest request);

    /* Time navigation */
    public long now();

    public LongRBTree universeTree();

    public TimeWalker timeWalker();

    /* Reflexive API */
    public MetaReference referenceInParent();

    public String domainKey();

    public MetaClass metaClass();

    public void mutate(KActionType actionType, MetaReference metaReference, KObject param);

    public KDefer<KObject[]> ref(MetaReference metaReference);

    public KDefer<KObject[]> inferRef(MetaReference metaReference);

    public KTraversal traverse(MetaReference metaReference);

    public KTraversal traverseQuery(String metaReferenceQuery);

    public KTraversal traverseInbounds(String metaReferenceQuery);

    public KTraversal traverseParent();

    public KDefer<KObject[]> inbounds();

    /* End Reflexive API */

    public ModelTrace[] traces(TraceRequest request);

    public Object get(MetaAttribute attribute);

    public void set(MetaAttribute attribute, Object payload);

    public String toJSON();

    public boolean equals(Object other);

    /* Model operations */
    public KDefer<TraceSequence> diff(KObject target);

    public KDefer<TraceSequence> merge(KObject target);

    public KDefer<TraceSequence> intersection(KObject target);

    public <U extends KObject> KDefer<U> jump(long time);

    public MetaReference[] referencesWith(KObject o);

    /* Inference Objects Manegement */
    public KDefer<KInfer[]> inferObjects();

    public Object inferAttribute(MetaAttribute attribute);

    public KDefer<Object> call(MetaOperation operation, Object[] params);

    public KDefer<Object> inferCall(MetaOperation operation, Object[] params);

}

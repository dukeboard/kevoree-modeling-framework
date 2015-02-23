package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;
import org.kevoree.modeling.api.traversal.KTraversal;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;

/**
 * Created by thomas on 10/2/14.
 */
public interface KObject {

    public KUniverse universe();

    public long uuid();

    public KTask<String> path();

    public KView view();

    public KTask<Throwable> delete();

    public KTask<KObject> parent();

    public Long parentUuid();

    public KTask<KObject[]> select(String query);

    public void listen(KEventListener listener);

    public void visitAttributes(ModelAttributeVisitor visitor);

    public KTask<Throwable> visit(ModelVisitor visitor, VisitRequest request);

    /* Time navigation */
    public long now();

    public LongRBTree universeTree();

    /* Reflexive API */
    public MetaReference referenceInParent();

    public String domainKey();

    public MetaClass metaClass();

    public void mutate(KActionType actionType, MetaReference metaReference, KObject param);

    public KTask<KObject[]> ref(MetaReference metaReference);

    public KTask<KObject[]> inferRef(MetaReference metaReference);

    public KTraversal traverse(MetaReference metaReference);

    public KTraversal traverseQuery(String metaReferenceQuery);

    public KTraversal traverseInbounds(String metaReferenceQuery);

    public KTraversal traverseParent();

    public KTask<KObject[]> inbounds();

    /* End Reflexive API */

    public ModelTrace[] traces(TraceRequest request);

    public Object get(MetaAttribute attribute);

    public void set(MetaAttribute attribute, Object payload);

    public String toJSON();

    public boolean equals(Object other);

    /* Model operations */
    public KTask<TraceSequence> diff(KObject target);

    public KTask<TraceSequence> merge(KObject target);

    public KTask<TraceSequence> intersection(KObject target);

    public <U extends KObject> KTask<U> jump(long time);

    public MetaReference[] referencesWith(KObject o);

    /* Inference Objects Manegement */
    public KTask<KInfer[]> inferObjects();

    public Object inferAttribute(MetaAttribute attribute);

    public KTask<Object> call(MetaOperation operation, Object[] params);

    public KTask<Object> inferCall(MetaOperation operation, Object[] params);

}

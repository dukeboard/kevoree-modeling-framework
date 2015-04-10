package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversal;

/**
 * Created by thomas on 10/2/14.
 */
public interface KObject {

    KUniverse universe();

    long uuid();

    KView view();

    KDefer<Throwable> delete();

    KDefer<KObject> parent();

    long parentUuid();

    KDefer<KObject[]> select(String query);

    void listen(long groupId, KEventListener listener);

    void visitAttributes(ModelAttributeVisitor visitor);

    KDefer<Throwable> visit(VisitRequest request,ModelVisitor visitor);

    /* Time navigation */
    long now();

    KTimeWalker timeWalker();

    /* Reflexive API */
    MetaReference referenceInParent();

    String domainKey();

    MetaClass metaClass();

    void mutate(KActionType actionType, MetaReference metaReference, KObject param);

    KDefer<KObject[]> ref(MetaReference metaReference);

    KDefer<KObject[]> inferRef(MetaReference metaReference);

    KTraversal traversal();

    KDefer<KObject[]> inbounds();

    /* End Reflexive API */

    Object get(MetaAttribute attribute);

    void set(MetaAttribute attribute, Object payload);

    String toJSON();

    boolean equals(Object other);

    <U extends KObject> KDefer<U> jump(long time);

    MetaReference[] referencesWith(KObject o);

    /* Inference Objects Management */
    KDefer<KInfer[]> inferObjects();

    Object inferAttribute(MetaAttribute attribute);

    KDefer<Object> call(MetaOperation operation, Object[] params);

    KDefer<Object> inferCall(MetaOperation operation, Object[] params);

}

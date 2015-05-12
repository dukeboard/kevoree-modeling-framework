package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversal;

public interface KObject {

    long universe();

    long now();

    long uuid();

    KDefer<Throwable> delete();

    KDefer<KObject> parent();

    long parentUuid();

    KDefer<KObject[]> select(String query);

    void listen(long groupId, KEventListener listener);

    void visitAttributes(ModelAttributeVisitor visitor);

    KDefer<Throwable> visit(VisitRequest request, ModelVisitor visitor);

    /* Time navigation */

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

    Object getByName(String atributeName);

    void set(MetaAttribute attribute, Object payload);

    void setByName(String atributeName, Object payload);

    String toJSON();

    boolean equals(Object other);

    <U extends KObject> KDefer<U> jump(long time);

    void jump2(long time, Callback<KObject> callback);

    MetaReference[] referencesWith(KObject o);

    /* Inference Objects Management */
    KDefer<KInfer[]> inferObjects();

    Object inferAttribute(MetaAttribute attribute);

    KDefer<Object> call(MetaOperation operation, Object[] params);

    KDefer<Object> inferCall(MetaOperation operation, Object[] params);

}

package org.kevoree.modeling.api.traversal;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;

public interface KTraversal {

    KTraversal traverse(MetaReference metaReference);

    KTraversal traverseQuery(String metaReferenceQuery);

    KTraversal attributeQuery(String attributeQuery);

    KTraversal withAttribute(MetaAttribute attribute, Object expectedValue);

    KTraversal withoutAttribute(MetaAttribute attribute, Object expectedValue);

    KTraversal filter(KTraversalFilter filter);

    KTraversal inbounds(MetaReference metaReference);

    KTraversal inboundsQuery(String metaReferenceQuery);

    KTraversal parents();

    KTraversal removeDuplicate();

    KDefer<KObject[]> done();

    KDefer<Object[]> map(MetaAttribute attribute);

    KTraversal deepTraverse(MetaReference metaReference, KTraversalFilter continueCondition);

    KTraversal deepCollect(MetaReference metaReference, KTraversalFilter continueCondition);

    KTraversal activateHistory();

    KTraversal reverse();

}



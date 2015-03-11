package org.kevoree.modeling.api.traversal;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;

/**
 * Created by duke on 18/12/14.
 */
public interface KTraversal {

    public KTraversal traverse(MetaReference metaReference);

    public KTraversal traverseQuery(String metaReferenceQuery);

    public KTraversal attributeQuery(String attributeQuery);

    public KTraversal withAttribute(MetaAttribute attribute, Object expectedValue);

    public KTraversal withoutAttribute(MetaAttribute attribute, Object expectedValue);

    public KTraversal filter(KTraversalFilter filter);

    public KTraversal inbounds(MetaReference metaReference);

    public KTraversal inboundsQuery(String metaReferenceQuery);

    public KTraversal parents();

    public KTraversal removeDuplicate();

    public KDefer<KObject[]> done();

    public KDefer<Object[]> map(MetaAttribute attribute);

    public KTraversal deepTraverse(MetaReference metaReference, KTraversalFilter continueCondition);

    public KTraversal deepCollect(MetaReference metaReference, KTraversalFilter continueCondition);

    public KTraversal activateHistory();

    public KTraversal reverse();
    
}



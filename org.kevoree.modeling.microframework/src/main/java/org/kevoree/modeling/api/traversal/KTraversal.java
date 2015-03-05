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

    public KTraversal reverse(MetaReference metaReference);

    public KTraversal reverseQuery(String metaReferenceQuery);

    public KTraversal parents();

    public KTraversal removeDuplicate();

    public KDefer<KObject[]> then();

    public KDefer<Object[]> map(MetaAttribute attribute);

}



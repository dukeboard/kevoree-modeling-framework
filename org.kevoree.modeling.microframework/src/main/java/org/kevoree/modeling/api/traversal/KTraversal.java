package org.kevoree.modeling.api.traversal;

import org.kevoree.modeling.api.Callback;
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

    void then(Callback<KObject[]> cb);

    void map(MetaAttribute attribute, Callback<Object[]> cb);

    KTraversal collect(MetaReference metaReference, KTraversalFilter continueCondition);

    //TODO add time traversal

}



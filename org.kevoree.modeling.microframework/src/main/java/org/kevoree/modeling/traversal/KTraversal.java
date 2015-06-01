package org.kevoree.modeling.traversal;

import org.kevoree.modeling.KObject;
import org.kevoree.modeling.Callback;
import org.kevoree.modeling.meta.MetaAttribute;
import org.kevoree.modeling.meta.MetaReference;

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



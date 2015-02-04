package org.kevoree.modeling.api.traversal;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KTask;
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

    public void then(Callback<KObject[]> callback);

    public void map(MetaAttribute attribute, Callback<Object[]> callback);

    public KTask<KObject[]> taskThen();

    public KTask<Object[]> taskMap(MetaAttribute attribute);

}



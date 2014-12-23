package org.kevoree.modeling.api.promise;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;

/**
 * Created by duke on 18/12/14.
 */
public interface KTraversalPromise {

    public KTraversalPromise traverse(MetaReference metaReference);

    public KTraversalPromise attribute(MetaAttribute attribute, Object expectedValue);

    public KTraversalPromise filter(KTraversalFilter filter);

    public void then(Callback<KObject[]> callback);

    public void map(MetaAttribute attribute, Callback<Object[]> callback);

}



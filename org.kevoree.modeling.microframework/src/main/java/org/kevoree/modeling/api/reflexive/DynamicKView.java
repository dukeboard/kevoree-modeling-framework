package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.rbtree.LongRBTree;

/**
 * Created by duke on 16/01/15.
 */
public class DynamicKView extends AbstractKView {
    protected DynamicKView(long p_now, KUniverse p_dimension) {
        super(p_now, p_dimension);
    }

    @Override
    protected KObject internalCreate(MetaClass clazz, LongRBTree p_universeTree, long key) {
        return new DynamicKObject(this, key, p_universeTree, clazz);
    }
}

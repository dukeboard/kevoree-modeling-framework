package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaAttribute;

public interface ModelAttributeVisitor {

    public void visit(MetaAttribute metaAttribute, Object value);

}
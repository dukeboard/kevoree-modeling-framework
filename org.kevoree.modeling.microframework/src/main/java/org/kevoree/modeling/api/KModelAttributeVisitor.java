package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaAttribute;

public interface KModelAttributeVisitor {

    void visit(MetaAttribute metaAttribute, Object value);

}
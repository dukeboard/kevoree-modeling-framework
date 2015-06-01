package org.kevoree.modeling;

import org.kevoree.modeling.meta.MetaAttribute;

public interface KModelAttributeVisitor {

    void visit(MetaAttribute metaAttribute, Object value);

}
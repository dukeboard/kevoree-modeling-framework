package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.ModelAttributeVisitor;
import org.kevoree.modeling.api.meta.MetaAttribute;

class AttributesVisitor implements ModelAttributeVisitor {

    private SerializationContext context;

    public AttributesVisitor(SerializationContext context) {
        this.context = context;
    }

    public void visit(MetaAttribute metaAttribute, Object value) {
        if (value != null) {
            if (context.ignoreGeneratedID && metaAttribute.metaName().equals("generated_KMF_ID")) {
                return;
            }
            context.printer.append(" " + metaAttribute.metaName() + "=\"");
            XMIModelSerializer.escapeXml(context.printer, value.toString());
            context.printer.append("\"");
        }
    }
}
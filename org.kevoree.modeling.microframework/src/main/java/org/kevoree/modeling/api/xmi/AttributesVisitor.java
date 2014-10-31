package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.ModelAttributeVisitor;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.util.Converters;

import java.util.Date;

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
            if (value instanceof String && value.equals("")) {
                return;
            }
            context.printStream.print(" " + metaAttribute.metaName() + "=\"");
            if (value instanceof java.util.Date) {
                XMIModelSerializer.escapeXml(context.printStream, "" + ((Date) value).getTime());
            } else {
                XMIModelSerializer.escapeXml(context.printStream, Converters.convFlatAtt(value));
            }
            context.printStream.print("\"");
        }
    }
}
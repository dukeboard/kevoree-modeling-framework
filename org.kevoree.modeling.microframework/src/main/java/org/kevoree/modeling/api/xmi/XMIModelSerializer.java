package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelSerializer;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.VisitResult;

/*
* Author : Gregory Nain
* Date : 02/09/13
*/

public class XMIModelSerializer implements ModelSerializer {

    @Override
    public void serialize(KObject model, final ThrowableCallback<String> callback) {
        final SerializationContext context = new SerializationContext();
        context.model = model;
        context.finishCallback = callback;
        context.attributesVisitor = new AttributesVisitor(context);
        context.printer = new StringBuilder();
        //First Pass for building address table
        context.addressTable.put(model.uuid(), "/");
        //ystem.out.println("Addresses Visit");
        model.treeVisit(new ModelVisitor() {
            @Override
            public VisitResult visit(KObject elem) {
                String parentXmiAddress = context.addressTable.get(elem.parentUuid());
                String key = parentXmiAddress + "/@" + elem.referenceInParent().metaName();
                Integer i = context.elementsCount.get(key);
                if (i == null) {
                    i = 0;
                    context.elementsCount.put(key, i);
                }
                context.addressTable.put(elem.uuid(), parentXmiAddress + "/@" + elem.referenceInParent().metaName() + "." + i);
                context.elementsCount.put(parentXmiAddress + "/@" + elem.referenceInParent().metaName(), i + 1);
                String pack = elem.metaClass().metaName().substring(0, elem.metaClass().metaName().lastIndexOf('.'));
                if (!context.packageList.contains(pack)) {
                    context.packageList.add(pack);
                }
                return VisitResult.CONTINUE;
            }
        }, new PrettyPrinter(context));
    }


    public static void escapeXml(StringBuilder ostream, String chain) {
        if (chain == null) {
            return;
        }
        int i = 0;
        int max = chain.length();
        while (i < max) {
            char c = chain.charAt(i);
            if (c == '"') {
                ostream.append("&quot;");
            } else if (c == '&') {
                ostream.append("&amp;");
            } else if (c == '\'') {
                ostream.append("&apos;");
            } else if (c == '<') {
                ostream.append("&lt;");
            } else if (c == '>') {
                ostream.append("&gt;");
            } else {
                ostream.append(c);
            }
            i = i + 1;
        }
    }

    public static String formatMetaClassName(String metaClassName) {
        int lastPoint = metaClassName.lastIndexOf('.');
        String pack = metaClassName.substring(0, lastPoint);
        String cls = metaClassName.substring(lastPoint + 1);
        return pack + ":" + cls;
    }

}
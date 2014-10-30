package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.CallBackChain;
import org.kevoree.modeling.api.util.Converters;
import org.kevoree.modeling.api.util.Helper;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import static org.kevoree.modeling.api.xmi.XMIModelSerializer.escapeXml;

/*
* Author : Gregory Nain
* Date : 02/09/13
*/

public class XMIModelSerializer implements ModelSerializer {

    @Override
    public void serialize(KObject model, final Callback<String> callback) {
        final ByteArrayOutputStream oo = new ByteArrayOutputStream();
        serializeToStream(model, oo, new Callback<Throwable>() {
            @Override
            public void on(Throwable err) {
                if (err == null) {
                    try {
                        oo.flush();
                        callback.on(oo.toString());
                    } catch (Exception e) {
                        callback.on(err.getMessage());
                    }
                } else {
                    callback.on(err.getMessage());
                }
            }
        });
    }

    @Override
    public void serializeToStream(final KObject model, final OutputStream raw, final Callback<Throwable> finishCallback) {

        final SerializationContext context = new SerializationContext();
        context.model = model;
        context.finishCallback = finishCallback;
        context.attributesVisitor = new AttributesVisitor(context);
        context.printStream = new PrintStream(new BufferedOutputStream(raw), false);

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


    public static void escapeXml(PrintStream ostream, String chain) {
        if (chain == null) {
            return;
        }
        int i = 0;
        int max = chain.length();
        while (i < max) {
            char c = chain.charAt(i);
            if (c == '"') {
                ostream.print("&quot;");
            } else if (c == '&') {
                ostream.print("&amp;");
            } else if (c == '\'') {
                ostream.print("&apos;");
            } else if (c == '<') {
                ostream.print("&lt;");
            } else if (c == '>') {
                ostream.print("&gt;");
            } else {
                ostream.print(c);
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
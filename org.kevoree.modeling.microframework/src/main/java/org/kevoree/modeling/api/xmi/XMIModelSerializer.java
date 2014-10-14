package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.Converters;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/*
* Author : Gregory Nain
* Date : 02/09/13
*/

class ReferencesVisitor extends ModelVisitor {

    private SerializationContext context;
    private String value;

    public ReferencesVisitor(SerializationContext context) {
        this.context = context;
    }

    @Override
    public void endVisitRef(String refName, Callback<Throwable> continueVisit) {
        if (value != null) {
            context.wt.print(" " + refName + "=\"" + value + "\"");
            value = null;
        }
        continueVisit.on(null);
    }

    @Override
    public void visit(KObject elem, MetaReference currentReference, KObject parent, Callback<Throwable> continueVisit) {
        String adjustedAddress = context.addressTable.get(elem);
        value = (value == null ? adjustedAddress : value + " " + adjustedAddress);
        continueVisit.on(null);
    }
}

class AttributesVisitor implements ModelAttributeVisitor {

    private SerializationContext context;

    public AttributesVisitor(SerializationContext context) {
        this.context = context;
    }

    private void escapeXml(PrintStream ostream, String chain) {
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

    @Override
    public void visit(MetaAttribute metaAttribute, Object value) {
        if (value != null) {
            if (context.ignoreGeneratedID && metaAttribute.metaName().equals("generated_KMF_ID")) {
                return;
            }
            if (value instanceof String && value.equals("")) {
                return;
            }
            context.wt.print(" " + metaAttribute.metaName() + "=\"");
            if (value instanceof java.util.Date) {
                escapeXml(context.wt, "" + ((Date) value).getTime());
            } else {
                escapeXml(context.wt, Converters.convFlatAtt(value));
            }
            context.wt.print("\"");
        }
    }
}


class ModelSerializationVisitor extends ModelVisitor {


    SerializationContext context;
    AttributesVisitor attributeVisitor;
    ReferencesVisitor referenceVisitor;

    ModelSerializationVisitor(SerializationContext context) {
        this.context = context;
        attributeVisitor = new AttributesVisitor(context);
        referenceVisitor = new ReferencesVisitor(context);
    }

    private String formatMetaClassName(String metaClassName) {
        int lastPoint = metaClassName.lastIndexOf('.');
        String pack = metaClassName.substring(0, lastPoint);
        String cls = metaClassName.substring(lastPoint + 1);
        return pack + ":" + cls;
    }

    @Override
    public void visit(KObject elem, MetaReference currentReference, KObject parent, Callback<Throwable> continueVisit) {
        context.wt.print('<');
        context.wt.print(currentReference.metaName());
        context.wt.print(" xsi:type=\"" + formatMetaClassName(elem.metaClass().metaName()) + "\"");
        elem.visitAttributes(attributeVisitor);
        elem.visitNotContained(referenceVisitor, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    continueVisit.on(throwable);
                } else {
                    context.wt.println('>');
                    elem.visitContained(referenceVisitor, new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable2) {
                            if (throwable2 != null) {
                                continueVisit.on(throwable2);
                            } else {
                                context.wt.print("</");
                                context.wt.print(currentReference.metaName());
                                context.wt.print('>');
                                context.wt.println();
                                continueVisit.on(null);
                            }
                        }
                    });
                }
            }
        });
    }
}


class ModelAddressVisitor extends ModelVisitor {

    private SerializationContext context;

    ModelAddressVisitor(SerializationContext context) {
        this.context = context;
    }

    @Override
    public void visit(KObject elem, MetaReference currentReference, KObject parent, Callback<Throwable> continueVisit) {
        String parentXmiAddress = context.addressTable.get(parent);
        int i = context.elementsCount.computeIfAbsent(parentXmiAddress + "/@" + currentReference.metaName(), (s) -> 0);
        context.addressTable.put(elem, parentXmiAddress + "/@" + currentReference.metaName() + "." + i);
        context.elementsCount.put(parentXmiAddress + "/@" + currentReference.metaName(), i + 1);
        String pack = elem.metaClass().metaName().substring(0, elem.metaClass().metaName().lastIndexOf('.'));
        if (!context.packageList.contains(pack)) {
            context.packageList.add(pack);
        }
        continueVisit.on(null);
    }
}


class SerializationContext {
    public boolean ignoreGeneratedID = false;
    public KObject model;
    public OutputStream raw;
    public Callback<Throwable> finishCallback;
    public PrintStream wt;

    HashMap<KObject, String> addressTable = new HashMap<>();
    HashMap<String, Integer> elementsCount = new HashMap<>();
    ArrayList<String> packageList = new ArrayList<>();
}

public class XMIModelSerializer implements ModelSerializer {

    ExecutorService executor = Executors.newCachedThreadPool();

    @Override
    public void serialize(KObject model, Callback<String> callback, Callback<Throwable> error) {
        ByteArrayOutputStream oo = new ByteArrayOutputStream();
        serializeToStream(model, oo, err -> {
            if (err == null) {
                try {
                    oo.flush();
                    callback.on(oo.toString());
                } catch (Exception e) {
                    error.on(e);
                }
            } else {
                error.on(err);
            }
        });
    }

    @Override
    public void serializeToStream(final KObject model, final OutputStream raw, final Callback<Throwable> finishCallback) {
        executor.submit(() -> {
            SerializationContext context = new SerializationContext();
            context.model = model;
            context.raw = raw;
            context.finishCallback = finishCallback;

            context.wt = new PrintStream(new BufferedOutputStream(raw), false);

            //First Pass for building address table
            context.addressTable.put(model, "/");
            ModelAddressVisitor addressBuilderVisitor = new ModelAddressVisitor(context);
            model.deepVisitContained(addressBuilderVisitor, new Callback<Throwable>() {
                @Override
                public void on(Throwable end) {
                    if (end != null) {
                        context.finishCallback.on(end);
                    } else {
                        ModelSerializationVisitor masterVisitor = new ModelSerializationVisitor(context);

                        context.wt.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");

                        context.wt.print("<" + formatMetaClassName(model.metaClass().metaName()).replace(".", "_"));
                        context.wt.print(" xmlns:xsi=\"http://wwww.w3.org/2001/XMLSchema-instance\"");
                        context.wt.print(" xmi:version=\"2.0\"");
                        context.wt.print(" xmlns:xmi=\"http://www.omg.org/XMI\"");

                        int index = 0;
                        while (index < context.packageList.size()) {
                            context.wt.print(" xmlns:" + context.packageList.get(index).replace(".", "_") + "=\"http://" + context.packageList.get(index) + "\"");
                            index++;
                        }

                        model.visitAttributes(new AttributesVisitor(context));
                        model.visitNotContained(new ReferencesVisitor(context), new Callback<Throwable>() {
                            @Override
                            public void on(Throwable end2) {
                                if (end2 != null) {
                                    context.finishCallback.on(end2);
                                } else {
                                    context.wt.println(">");

                                    model.visitContained(masterVisitor, new Callback<Throwable>() {
                                        @Override
                                        public void on(Throwable end3) {
                                            if (end3 != null) {
                                                context.finishCallback.on(end3);
                                            } else {
                                                context.wt.println("</" + formatMetaClassName(model.metaClass().metaName()).replace(".", "_") + ">");
                                                context.wt.flush();
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        });
    }

    private String formatMetaClassName(String metaClassName) {
        int lastPoint = metaClassName.lastIndexOf('.');
        String pack = metaClassName.substring(0, lastPoint);
        String cls = metaClassName.substring(lastPoint + 1);
        return pack + ":" + cls;
    }


}
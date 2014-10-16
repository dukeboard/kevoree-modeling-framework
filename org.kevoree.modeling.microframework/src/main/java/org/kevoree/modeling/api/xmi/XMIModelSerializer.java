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
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.kevoree.modeling.api.xmi.XMIModelSerializer.escapeXml;

/*
* Author : Gregory Nain
* Date : 02/09/13
*/

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
                escapeXml(context.printStream, "" + ((Date) value).getTime());
            } else {
                escapeXml(context.printStream, Converters.convFlatAtt(value));
            }
            context.printStream.print("\"");
        }
    }
}


class NonContainedReferencesCallbackChain implements CallBackChain<MetaReference> {

    private SerializationContext context;
    private KObject currentElement;

    NonContainedReferencesCallbackChain(SerializationContext context, KObject currentElement) {
        this.context = context;
        this.currentElement = currentElement;
    }

    @Override
    public void on(MetaReference ref, Callback<Throwable> next) {
        if(!ref.contained()) {
            final String[] value = new String[1];
            currentElement.each(ref, new Callback() {
                @Override
                public void on(Object o) {
                    String adjustedAddress = context.addressTable.get(((KObject)o).path());
                    value[0] = (value[0].equals("") ? adjustedAddress :  value[0] + " " + adjustedAddress);
                }
            }, new Callback<Throwable>() {
                @Override
                public void on(Throwable end) {

                    if (end == null) {
                        if (value[0] != null) {
                            context.printStream.print(" " + ref.metaName() + "=\"" + value[0] + "\"");
                        }
                    }
                    next.on(end);
                }
            });
        } else {
            next.on(null);
        }
    }
}


class ContainedReferencesCallbackChain implements CallBackChain<MetaReference> {

    private SerializationContext context;
    private KObject currentElement;

    ContainedReferencesCallbackChain(SerializationContext context, KObject currentElement) {
        this.context = context;
        this.currentElement = currentElement;
    }

    @Override
    public void on(MetaReference ref, Callback<Throwable> nextReference) {
        if (ref.contained()) {
            currentElement.each(ref, new Callback() {
                @Override
                public void on(Object o) {
                    KObject elem = (KObject)o;
                    context.printStream.print("<");
                    context.printStream.print(ref.metaName());
                    context.printStream.print(" xsi:type=\"" + XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
                    elem.visitAttributes(context.attributesVisitor);
                    Helper.forall(elem.metaReferences(),new NonContainedReferencesCallbackChain(context,elem), (err)->{
                        if(err == null) {
                            context.printStream.println('>');
                            Helper.forall(elem.metaReferences(),new ContainedReferencesCallbackChain(context, elem), containedRefsEnd -> {
                                if(containedRefsEnd == null) {
                                    context.printStream.print("</");
                                    context.printStream.print(ref.metaName());
                                    context.printStream.print('>');
                                    context.printStream.println();
                                }
                            });
                        } else {
                            context.finishCallback.on(err);
                        }
                    });
                }
            }, containedRefEnd -> {
                nextReference.on(null);
            });
        } else {
            nextReference.on(null);
        }
    }
}



class SerializationContext {
    public boolean ignoreGeneratedID = false;
    public KObject model;
    public Callback<Throwable> finishCallback;
    public PrintStream printStream;
    public AttributesVisitor attributesVisitor;

    // KPath -> XMIPath
    HashMap<String, String> addressTable = new HashMap<>();
    // KPath -> Count
    HashMap<String, Integer> elementsCount = new HashMap<>();
    ArrayList<String> packageList = new ArrayList<>();
}

public class XMIModelSerializer implements ModelSerializer {

    ExecutorService executor = Executors.newCachedThreadPool();

    @Override
    public void serialize(KObject model, Callback<String> callback) {
        ByteArrayOutputStream oo = new ByteArrayOutputStream();
        serializeToStream(model, oo, err -> {
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
        });
    }

    @Override
    public void serializeToStream(final KObject model, final OutputStream raw, final Callback<Throwable> finishCallback) {

        executor.submit(() -> {
            SerializationContext context = new SerializationContext();
            context.model = model;
            context.finishCallback = finishCallback;
            context.attributesVisitor = new AttributesVisitor(context);
            context.printStream = new PrintStream(new BufferedOutputStream(raw), false);

            //First Pass for building address table
            context.addressTable.put(model.path(), "/");
            model.treeVisit(new ModelVisitor() {
                @Override
                public void visit(KObject elem, Callback<Result> visitor) {
                    String parentXmiAddress = context.addressTable.get(elem.parentPath());

                    int i = context.elementsCount.computeIfAbsent(parentXmiAddress + "/@" + elem.referenceInParent(), (s) -> 0);
                    context.addressTable.put(elem.path(), parentXmiAddress + "/@" + elem.referenceInParent() + "." + i);
                    context.elementsCount.put(parentXmiAddress + "/@" + elem.referenceInParent(), i + 1);
                    String pack = elem.metaClass().metaName().substring(0, elem.metaClass().metaName().lastIndexOf('.'));
                    if (!context.packageList.contains(pack)) {
                        context.packageList.add(pack);
                    }
                    visitor.on(Result.CONTINUE);
                }
            }, new PrettyPrinter(context));
        });
    }




    private class PrettyPrinter implements Callback<Throwable> {
        private SerializationContext context;

        private PrettyPrinter(SerializationContext context) {
            this.context = context;
        }

        @Override
        public void on(Throwable throwable) {

            if(throwable != null) {
                context.finishCallback.on(throwable);
            } else {

                context.printStream.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");

                context.printStream.print("<" + formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_"));
                context.printStream.print(" xmlns:xsi=\"http://wwww.w3.org/2001/XMLSchema-instance\"");
                context.printStream.print(" xmi:version=\"2.0\"");
                context.printStream.print(" xmlns:xmi=\"http://www.omg.org/XMI\"");

                int index = 0;
                while (index < context.packageList.size()) {
                    context.printStream.print(" xmlns:" + context.packageList.get(index).replace(".", "_") + "=\"http://" + context.packageList.get(index) + "\"");
                    index++;
                }

                context.model.visitAttributes(context.attributesVisitor);

                Helper.forall(context.model.metaReferences(),new NonContainedReferencesCallbackChain(context, context.model), (err)->{
                    if(err == null) {
                        context.printStream.println('>');
                        Helper.forall(context.model.metaReferences(),new ContainedReferencesCallbackChain(context, context.model), containedRefsEnd -> {
                            if(containedRefsEnd == null) {
                                context.printStream.println("</" + formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_") + ">");
                                context.printStream.flush();
                                context.finishCallback.on(null);
                            } else {
                                context.finishCallback.on(containedRefsEnd);
                            }
                        });
                    } else {
                        context.finishCallback.on(err);
                    }
                });

            }
        }
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
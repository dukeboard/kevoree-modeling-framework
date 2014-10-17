package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


/*
* Author : Gregory Nain
* Date : 30/08/13
*/

class LoadingContext {

    public XmlParser xmiReader;

    /*
    public XmiLoaderAttributeVisitor attributeVisitor;
    public XmiLoaderReferenceVisitor referenceVisitor;
    public HashMap<String, HashMap<String, Boolean>> attributesHashmap = new HashMap<String, HashMap<String, Boolean>>();
    public HashMap<String, HashMap<String, String>> referencesHashmap = new HashMap<String, HashMap<String, String>>();
    */

    public KObject loadedRoots = null;
    public ArrayList<XMIResolveCommand> resolvers = new ArrayList<XMIResolveCommand>();

    public HashMap<String, KObject> map = new HashMap<String, KObject>();

    public HashMap<String, Integer> elementsCount = new HashMap<String, Integer>();
    public HashMap<String, Integer> stats = new HashMap<String, Integer>();
    public HashMap<String, Boolean> oppositesAlreadySet = new HashMap<String, Boolean>();

    public Callback<KObject> successCallback;

    public Boolean isOppositeAlreadySet(String localRef, String oppositeRef) {
        return (oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null));
    }

    public void storeOppositeRelation(String localRef, String oppositeRef) {
        oppositesAlreadySet.put(localRef + "_" + oppositeRef, true);
    }
}

public class XMIModelLoader implements ModelLoader {

    private KView factory;

    public static final String LOADER_XMI_LOCAL_NAME = "type";
    public static final String LOADER_XMI_XSI = "xsi";
    public static final String LOADER_XMI_NS_URI = "nsURI";


    public XMIModelLoader(KView factory) {
        this.factory = factory;
    }

    private String unescapeXml(String src) {
        StringBuilder builder = null;
        int i = 0;
        while (i < src.length()) {
            char c = src.charAt(i);
            if (c == '&') {
                if (builder == null) {
                    builder = new StringBuilder();
                    builder.append(src.substring(0, i));
                }
                if (src.charAt(i + 1) == 'a') {
                    if (src.charAt(i + 2) == 'm') {
                        builder.append("&");
                        i = i + 5;
                    } else if (src.charAt(i + 2) == 'p') {
                        builder.append("'");
                        i = i + 6;
                    } else {
                        System.err.println("Could not unescaped chain:" + src.charAt(i) + src.charAt(i + 1) + src.charAt(i + 2));
                    }
                } else if (src.charAt(i + 1) == 'q') {
                    builder.append("\"");
                    i = i + 6;
                } else if (src.charAt(i + 1) == 'l') {
                    builder.append("<");
                    i = i + 4;
                } else if (src.charAt(i + 1) == 'g') {
                    builder.append(">");
                    i = i + 4;
                } else {
                    System.err.println("Could not unescaped chain:" + src.charAt(i) + src.charAt(i + 1));
                }
            } else {
                if (builder != null) {
                    builder.append(c);
                }
                i++;
            }
        }
        if (builder != null) {
            return builder.toString();
        } else {
            return src;
        }
    }

    @Override
    public void loadModelFromString(String str, Callback<KObject> callback) {
        loadModelFromStream(new ByteArrayInputStream(str.getBytes(StandardCharsets.UTF_8)), callback);
    }

    @Override
    public void loadModelFromStream(InputStream inputStream, Callback<KObject> callback) {
        XmlParser parser = new XmlParser(inputStream);
        if (!parser.hasNext()) {
            callback.on(null);
        } else {
            LoadingContext context = new LoadingContext();
            context.successCallback = callback;
            context.xmiReader = parser;
            deserialize(context);
        }
    }


    private void deserialize(LoadingContext context) {
        try {
            String nsURI;
            XmlParser reader = context.xmiReader;
            rootwhile : while (reader.hasNext()) {
                XmlParser.Token nextTag = reader.next();
                switch (nextTag) {
                    case START_TAG: {
                        String localName = reader.getLocalName();
                        if (localName != null) {

                            HashMap<String, String> ns = new HashMap<String, String>();

                            for (int i = 0; i < reader.getAttributeCount() - 1; i++) {
                                String attrLocalName = reader.getAttributeLocalName(i);
                                String attrLocalValue = reader.getAttributeValue(i);
                                if (attrLocalName.equals(LOADER_XMI_NS_URI)) {
                                    nsURI = attrLocalValue;
                                }
                                ns.put(attrLocalName, attrLocalValue);
                            }

                            String xsiType = reader.getTagPrefix();
                            String realTypeName = ns.get(xsiType);
                            if (realTypeName == null) {
                                realTypeName = xsiType;
                            }
                            context.loadedRoots = loadObject(context, "/", xsiType + "." + localName);
                        } else {
                            System.err.println("Tried to read a tag with null tag_name.");
                        }
                    }
                    case END_TAG: {
                        break rootwhile;
                    }
                    case END_DOCUMENT: {
                        break;
                    }
                    default: {
                       // System.err.println("Default case :" + nextTag.toString());
                    }
                }
            }
            for (XMIResolveCommand res : context.resolvers) {
                res.run();
            }
            context.successCallback.on(context.loadedRoots);
        } catch (Exception e) {
            e.printStackTrace();
            context.successCallback.on(null);
        }
    }

    private KObject callFactory(LoadingContext ctx, String objectType) {
        KObject modelElem = null;
        if (objectType != null) {
            modelElem = factory.createFQN(objectType);
            if (modelElem == null) {
                String xsiType = null;
                for (int i = 0; i < (ctx.xmiReader.getAttributeCount() - 1); i++) {
                    String localName = ctx.xmiReader.getAttributeLocalName(i);
                    String xsi = ctx.xmiReader.getAttributePrefix(i);
                    if (localName.equals(LOADER_XMI_LOCAL_NAME) && xsi.equals(LOADER_XMI_XSI)) {
                        xsiType = ctx.xmiReader.getAttributeValue(i);
                        break;
                    }
                }
                if (xsiType != null) {
                    String realTypeName = xsiType.substring(0, xsiType.lastIndexOf(":"));
                    String realName = xsiType.substring(xsiType.lastIndexOf(":") + 1, xsiType.length());
                    modelElem = factory.createFQN(realTypeName + "." + realName);
                }
            }

        } else {
            modelElem = factory.createFQN(ctx.xmiReader.getLocalName());
        }
        return modelElem;
    }


    private KObject loadObject(LoadingContext ctx, String xmiAddress, String objectType) throws Exception {
        String elementTagName = ctx.xmiReader.getLocalName();
        KObject modelElem = callFactory(ctx, objectType);
        if (modelElem == null) {
            throw new Exception("Could not create an object for local name " + elementTagName);
        }
        ctx.map.put(xmiAddress, modelElem);

        /* Read attributes and References */
        for (int i = 0; i < ctx.xmiReader.getAttributeCount(); i++) {
            String prefix = ctx.xmiReader.getAttributePrefix(i);
            if (prefix == null || prefix.equals("")) {
                String attrName = ctx.xmiReader.getAttributeLocalName(i).trim();
                String valueAtt = ctx.xmiReader.getAttributeValue(i).trim();
                if (valueAtt != null) {
                    MetaAttribute kAttribute = modelElem.metaAttribute(attrName);
                    if (kAttribute != null) {
                        modelElem.set(kAttribute, unescapeXml(valueAtt), false);
                    } else {
                        MetaReference kreference = modelElem.metaReference(attrName);
                        if (kreference != null) {
                            String[] referenceArray = valueAtt.split(" ");
                            for (int j = 0; j < referenceArray.length; j++) {
                                String xmiRef = referenceArray[j];

                                String adjustedRef = (xmiRef.startsWith("#") ? xmiRef.substring(1) : xmiRef);
                                //adjustedRef = (adjustedRef.startsWith("//") ? "/0" + adjustedRef.substring(1) : adjustedRef);
                                adjustedRef = adjustedRef.replace(".0", "");
                                KObject ref = ctx.map.get(adjustedRef);
                                if (ref != null) {
                                    modelElem.mutate(KActionType.ADD, kreference, ref, true, false);
                                } else {
                                    ctx.resolvers.add(new XMIResolveCommand(ctx, modelElem, KActionType.ADD, attrName, adjustedRef));
                                }
                            }
                        } else {
                            //attribute ignored
                        }
                    }
                }
            }
        }

        boolean done = false;
        while (!done) {
            switch (ctx.xmiReader.next()) {
                case START_TAG: {
                    String subElemName = ctx.xmiReader.getLocalName();
                    int i = ctx.elementsCount.computeIfAbsent(xmiAddress + "/@" + subElemName, (s) -> 0);
                    String subElementId = xmiAddress + "/@" + subElemName + (i != 0 ? "." + i : "");
                    KObject containedElement = loadObject(ctx, subElementId, subElemName);
                    modelElem.mutate(KActionType.ADD, modelElem.metaReference(subElemName), containedElement, true, false);
                    ctx.elementsCount.put(xmiAddress + "/@" + subElemName, i + 1);
                }
                case END_TAG: {
                    if (ctx.xmiReader.getLocalName().equals(elementTagName)) {
                        done = true;
                    }
                }
                default: {
                }
            }
        }
        return modelElem;

    }
}


